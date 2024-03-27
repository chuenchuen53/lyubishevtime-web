import { createSignal, onCleanup } from "solid-js";
import type { Accessor } from "solid-js";

export function useDelayedLoading(delay: number): [Accessor<boolean>, () => void, () => void] {
  let timerId: number;

  const [loading, setLoading] = createSignal(false);

  const setTrue = () => {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      setLoading(true);
    }, delay);
  };

  const setFalse = () => {
    if (timerId) clearTimeout(timerId);
    setLoading(false);
  };

  onCleanup(() => clearTimeout(timerId));

  return [loading, setTrue, setFalse];
}
