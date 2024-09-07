import { useLayoutEffect, useRef, useState, type RefObject } from "react";

export interface UseListenerResizeProps {
  dom: RefObject<HTMLElement>;
  onResize?: (size: ResizeObserverEntry[]) => void;
}
export default function useListenerResize(props: UseListenerResizeProps) {
  const { dom, onResize } = props;
  const [size, setSize] = useState<DOMRectReadOnly | null>(null);

  const resizeObserver = useRef<ResizeObserver | null>(null);
  resizeObserver.current = new ResizeObserver((entries) => {
    setSize(entries[0].target.getBoundingClientRect());
    onResize?.(entries);
  });

  useLayoutEffect(() => {
    if (dom.current) {
      resizeObserver.current?.observe(dom.current);
    }
    return () => {
      resizeObserver.current?.disconnect();
    };
  }, [dom, onResize]);

  return { size };
}
