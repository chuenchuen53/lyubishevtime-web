import { createSignal } from "solid-js";

export const Counter = (props: { testId?: string }) => {
  const [count, setCount] = createSignal(1);
  return (
    <button data-testid={props.testId} onClick={() => setCount(count() + 1)}>
      {count()}
    </button>
  );
};
