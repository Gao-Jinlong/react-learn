(function () {
  function createElement(type, props, ...children) {
    return {
      type,
      props: {
        ...props,
        children: children.map((child) => {
          const isTextNode =
            typeof child === "string" || typeof child === "number";
          return isTextNode ? createTextNode(child) : child;
        }),
      },
    };
  }

  function createTextNode(nodeValue) {
    return {
      type: "TEXT_ELEMENT",
      props: {
        nodeValue,
        children: [],
      },
    };
  }

  const MiniReact = {
    createElement,
    render,
    useState,
    useEffect,
  };

  window.MiniReact = MiniReact;

  let nextUnitOfWork = null;
  let wipRoot = null; // work in progress root
  let currentRoot = null; // 之前的根节点
  let deletions = null;

  function render(element, container) {
    wipRoot = {
      dom: container,
      props: {
        children: [element],
      },
      alternate: currentRoot,
    };

    deletions = [];

    nextUnitOfWork = wipRoot;
  }

  function workLoop(deadline) {
    let shouldYield = false;
    while (nextUnitOfWork && !shouldYield) {
      nextUnitOfWork = preformUnitOfWork(nextUnitOfWork);
      shouldYield = deadline.timeRemaining() < 1;
    }

    if (!nextUnitOfWork && wipRoot) {
      commitRoot();
    }

    requestIdleCallback(workLoop);
  }

  requestIdleCallback(workLoop);

  function preformUnitOfWork(fiber) {
    const isFunctionComponent = fiber.type instanceof Function;
    if (isFunctionComponent) {
      updateFunctionComponent(fiber);
    } else {
      updateHostComponent(fiber);
    }

    if (fiber.child) {
      return fiber.child;
    }

    let nextFiber = fiber;
    while (nextFiber) {
      if (nextFiber.sibling) {
        return nextFiber.sibling;
      }
      nextFiber = nextFiber.return;
    }
  }

  let wipFiber = null;
  let stateHookIndex = null;
  function updateFunctionComponent(fiber) {
    wipFiber = fiber;
    stateHookIndex = 0;
    wipFiber.stateHooks = [];
    wipFiber.effectHooks = [];

    const children = [fiber.type(fiber.props)];
    reconcileChildren(fiber, children);
  }

  function updateHostComponent(fiber) {
    if (!fiber.dom) {
      fiber.dom = createDom(fiber);
    }

    reconcileChildren(fiber, fiber.props.children);
  }

  function createDom(fiber) {
    const dom =
      fiber.type === "TEXT_ELEMENT"
        ? document.createTextNode("")
        : document.createElement(fiber.type);

    updateDom(dom, {}, fiber.props);

    return dom;
  }

  const isEvent = (key) => key.startsWith("on");
  const isProperty = (key) => key !== "children" && !isEvent(key);
  const isNew = (prev, next) => (key) => prev[key] !== next[key];
  const isGone = (prev, next) => (key) => !(key in next);

  function updateDom(dom, prevProps, nextProps) {
    // remove old or changed event listeners
    Object.keys(prevProps)
      .filter(isEvent)
      .filter((key) => !(key in nextProps) || isNew(prevProps, nextProps)(key))
      .forEach((name) => {
        const eventType = name.toLowerCase().substring(2);
        dom.removeEventListener(eventType, prevProps[name]);
      });

    // remove old properties
    Object.keys(prevProps)
      .filter(isProperty)
      .filter(isGone(prevProps, nextProps))
      .forEach((name) => {
        dom[name] = "";
      });

    // set new or changed properties
    Object.keys(nextProps)
      .filter(isProperty)
      .filter(isNew(prevProps, nextProps))
      .forEach((name) => {
        dom[name] = nextProps[name];
      });

    // add new event listeners
    Object.keys(nextProps)
      .filter(isEvent)
      .filter(isNew(prevProps, nextProps))
      .forEach((name) => {
        const eventType = name.toLowerCase().substring(2);
        dom.addEventListener(eventType, nextProps[name]);
      });
  }

  function reconcileChildren(wipFiber, elements) {
    let index = 0;
    let oldFiber = wipFiber.alternate?.child;
    let prevSibling = null;

    while (index < elements.length || oldFiber != null) {
      const element = elements[index];
      let newFiber = null;

      const sameType = element?.type === oldFiber?.type;

      if (sameType) {
        newFiber = {
          type: oldFiber.type,
          props: element.props,
          dom: oldFiber.dom,
          return: wipFiber,
          alternate: oldFiber,
          effectTag: "UPDATE",
        };
      }
      if (element && !sameType) {
        newFiber = {
          type: element.type,
          props: element.props,
          dom: null,
          return: wipFiber,
          alternate: null,
          effectTag: "PLACEMENT",
        };
      }
      if (oldFiber && !sameType) {
        oldFiber.effectTag = "DELETION";
        deletions.push(oldFiber);
      }

      if (oldFiber) {
        oldFiber = oldFiber.sibling;
      }

      if (index === 0) {
        wipFiber.child = newFiber;
      } else if (element) {
        prevSibling.sibling = newFiber;
      }

      prevSibling = newFiber;
      index++;
    }
  }

  function useState(initialState) {
    const currentFiber = wipFiber;
    const oldHook = wipFiber.alternate?.stateHooks[stateHookIndex];

    const stateHook = {
      state: oldHook ? oldHook.state : initialState,
      queue: oldHook ? oldHook.queue : [],
    };

    // 应用所有的 action 获取最新的 state
    stateHook.queue.forEach((action) => {
      stateHook.state = action(stateHook.state);
    });

    // 获取到最新的 state 之后清空 queue
    stateHook.queue = [];

    stateHookIndex++;
    wipFiber.stateHooks.push(stateHook);

    function setState(action) {
      const isFunction = typeof action === "function";

      // 将 action 放入 queue 中
      stateHook.queue.push(isFunction ? action : () => action);

      wipRoot = {
        ...currentFiber,
        alternate: currentFiber,
      };

      // 重新开始渲染
      nextUnitOfWork = wipRoot;
    }

    return [stateHook.state, setState];
  }

  function useEffect(callback, deps) {
    const effectHook = {
      callback,
      deps,
      cleanup: undefined,
    };

    wipFiber.effectHooks.push(effectHook);
  }

  function commitRoot() {
    deletions.forEach(commitWork);
    commitWork(wipRoot.child);
    commitEffectHooks();
    currentRoot = wipRoot;
    wipRoot = null;
  }

  function commitWork(fiber) {
    if (!fiber) {
      return;
    }

    let domParentFiber = fiber.return;
    while (!domParentFiber.dom) {
      domParentFiber = domParentFiber.return;
    }
    const domParent = domParentFiber.dom;

    if (fiber.effectTag === "PLACEMENT" && fiber.dom !== null) {
      domParent.appendChild(fiber.dom);
    } else if (fiber.effectTag === "UPDATE" && fiber.dom !== null) {
      updateDom(fiber.dom, fiber.alternate.props, fiber.props);
    } else if (fiber.effectTag === "DELETION") {
      commitDeletion(fiber, domParent);
    }

    commitWork(fiber.child);
    commitWork(fiber.sibling);
  }

  function commitDeletion(fiber, domParent) {
    if (fiber.dom) {
      domParent.removeChild(fiber.dom);
    } else {
      commitDeletion(fiber.child, domParent);
    }
  }

  function commitEffectHooks() {
    function runCleanup(fiber) {
      if (!fiber) return;

      fiber.alternate?.effectHooks?.forEach((hook, index) => {
        const deps = fiber.effectHooks[index].deps;

        if (!hook.deps || !isDepsEqual(hook.deps, deps)) {
          hook.cleanup?.();
        }
      });

      runCleanup(fiber.child);
      runCleanup(fiber.sibling);
    }
    function run(fiber) {
      if (!fiber) return;

      fiber.effectHooks?.forEach((newHook, index) => {
        if (!fiber.alternate) {
          newHook.cleanup = newHook.callback();
          return;
        }

        if (!newHook.deps) {
          newHook.cleanup = newHook.callback();
        }

        if (newHook.deps.length > 0) {
          const oldHook = fiber.alternate?.effectHooks[index];

          if (!isDepsEqual(oldHook.deps, newHook.deps)) {
            newHook.cleanup = newHook.callback();
          }
        }
      });

      run(fiber.child);
      run(fiber.sibling);
    }

    runCleanup(wipRoot);
    run(wipRoot);
  }

  function isDepsEqual(deps, newDeps) {
    if (deps.length !== newDeps.length) {
      return false;
    }

    for (let i = 0; i < deps.length; i++) {
      if (deps[i] !== newDeps[i]) {
        return false;
      }
    }

    return true;
  }
})();
