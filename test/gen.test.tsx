import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";

import userEvent from "@testing-library/user-event";

import { createSignal } from "solid-js";

export const Counter = (props: { testId?: string }) => {
  const [count, setCount] = createSignal(1);
  return (
    <button data-testid={props.testId} onClick={() => setCount(count() + 1)}>
      {count()}
    </button>
  );
};

// Generated by CodiumAI

describe("Counter", async () => {
  // add test for checking toBeInTheDocument
  it("should render a button element", () => {
    const { getByTestId } = render(() => <Counter testId="counter-button" />);
    expect(getByTestId("counter-button")).toBeInTheDocument();
  });
});
