import React from "react";
import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import App from "./App";
import Toggle from "./Toggle";
import { act } from "react-dom/test-utils";
import useCounter from "./useCounter";

// test("renders learn react link", () => {
//   const { container } = render(<App />);
//   const linkElement = container.querySelector(".App-link");

//   expect(linkElement?.textContent).toMatch(/learn react/i);
// });

test("toggle", async () => {
  const { container } = render(<Toggle />);

  expect(container.querySelector("p")?.textContent).toBe("close");

  act(() => {
    fireEvent.click(container.querySelector("button")!);
  });

  await waitFor(
    () => expect(container.querySelector("p")?.textContent).toBe("open"),
    {
      timeout: 2500,
    }
  );
});

test("useCounter", async () => {
  const hook = renderHook(() => useCounter(0));

  const [count, increment, decrement] = hook.result.current;

  act(() => {
    increment(2);
  });

  expect(hook.result.current[0]).toBe(2);

  act(() => {
    decrement(1);
  });

  expect(hook.result.current[0]).toBe(1);

  hook.unmount();
});
