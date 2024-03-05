import {
  animated,
  useChain,
  useSpringRef,
  useSprings,
  useTrail,
} from "@react-spring/web";
import { useEffect } from "react";
import "./App.css";

const STROKE_WIDTH = 0.5;

const MAX_WIDTH = 150;
const MAX_HEIGHT = 150;

const COORDS = [
  [50, 30],
  [90, 30],
  [50, 50],
  [60, 60],
  [70, 60],
  [80, 60],
  [90, 50],
];

export default function App() {
  const gridApi = useSpringRef();

  const gridSprings = useTrail(16, {
    ref: gridApi,
    from: {
      x2: 0,
      y2: 0,
    },
    to: {
      x2: MAX_WIDTH,
      y2: MAX_HEIGHT,
    },
  });

  useEffect(() => {
    gridApi.start();
  });

  const boxApi = useSpringRef();

  const [boxSprings] = useSprings(7, (i) => ({
    ref: boxApi,
    from: {
      scale: 0,
    },
    to: {
      scale: 1,
    },
    delay: i * 100,
    config: {
      mass: 2,
      tension: 220,
    },
  }));

  useChain([gridApi, boxApi], [0, 1], 1000);

  return (
    <div className="container">
      <svg viewBox={`0 0 ${MAX_WIDTH} ${MAX_HEIGHT}`}>
        <g>
          {gridSprings.map(({ x2 }, index) => {
            return (
              <animated.line
                x1={0}
                y1={index * 10}
                x2={x2}
                y2={index * 10}
                key={index}
                strokeWidth={STROKE_WIDTH}
                stroke="currentColor"
              ></animated.line>
            );
          })}
          {gridSprings.map(({ y2 }, index) => {
            return (
              <animated.line
                x1={index * 10}
                y1={0}
                x2={index * 10}
                y2={y2}
                key={index}
                strokeWidth={STROKE_WIDTH}
                stroke="currentColor"
              ></animated.line>
            );
          })}
        </g>
        {boxSprings.map(({ scale }, index) => {
          return (
            <animated.rect
              key={index}
              width={10}
              height={10}
              fill="currentColor"
              style={{
                transform: `translate(${COORDS[index][0]}px, ${COORDS[index][1]}px)`,
                transformOrigin: `5px 5px`,
                scale,
              }}
            ></animated.rect>
          );
        })}
      </svg>
    </div>
  );
}
