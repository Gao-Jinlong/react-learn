import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  animated,
  useChain,
  useSpring,
  useSpringRef,
  useSpringValue,
  useSprings,
  useTrail,
} from "@react-spring/web";

function App() {
  const width = useSpringValue(0, {
    config: {
      // duration: 2000,
      mass: 2,
      friction: 10,
      tension: 2000,
    },
  });

  useEffect(() => {
    width.start(300);
  }, []);

  return <animated.div className="box" style={{ width }}></animated.div>;
}

function App2() {
  const styles = useSpring({
    from: {
      width: 0,
      height: 0,
    },
    to: {
      width: 200,
      height: 200,
    },
    config: {
      duration: 2000,
    },
  });

  return <animated.div className="box" style={{ ...styles }}></animated.div>;
}

export function App3() {
  const [style, api] = useSpring(() => {
    return {
      from: {
        width: 100,
        height: 100,
      },
      config: {
        mass: 2,
        friction: 10,
        tension: 400,
      },
    };
  });

  function clickHandler() {
    api.start({
      width: 200,
      height: 200,
    });
  }

  return (
    <animated.div
      className="box"
      style={{ ...style }}
      onClick={clickHandler}
    ></animated.div>
  );
}

function App4() {
  const [springs, api] = useSprings(3, () => ({
    from: {
      width: 0,
    },

    config: {
      duration: 1000,
    },
  }));

  useEffect(() => {
    setTimeout(() => {
      api.start({ width: 300 });
    }, 1000);
  }, []);

  return (
    <div>
      {springs.map((styles) => {
        return <animated.div style={styles} className="box"></animated.div>;
      })}
    </div>
  );
}

function App5() {
  const [springs, api] = useTrail(3, () => ({
    from: { width: 0 },
    config: {
      duration: 1000,
    },
  }));

  useEffect(() => {
    api.start({ width: 300 });
  }, []);

  return (
    <div>
      {springs.map((styles) => {
        return <animated.div style={styles} className="box"></animated.div>;
      })}
    </div>
  );
}

function App6() {
  const api1 = useSpringRef();

  const [springs] = useTrail(
    3,
    () => ({
      ref: api1,
      from: { width: 0 },
      to: { width: 300 },
      config: {
        duration: 1000,
      },
    }),
    []
  );

  const api2 = useSpringRef();

  const [springs2] = useSprings(
    3,
    () => ({
      ref: api2,
      from: { height: 100 },
      to: { height: 50 },
      config: {
        duration: 1000,
      },
    }),
    []
  );

  useChain([api1, api2], [0, 1], 500);

  return (
    <div>
      {springs.map((styles1, index) => (
        <animated.div
          style={{ ...styles1, ...springs2[index] }}
          className="box"
        ></animated.div>
      ))}
    </div>
  );
}

export default App6;
