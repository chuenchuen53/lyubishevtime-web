import { useNavigate } from "@SolidJS/router";
import { Show, createEffect } from "solid-js";
import { customer } from "@stores/CustomerStore";
import type { JSX } from "solid-js";

interface Props {
  children?: JSX.Element;
}

export default function LoginGuard(props: Props) {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  createEffect(() => {
    if (!token) navigate("/", { replace: true });
  });

  return (
    <Show when={customer() !== null} fallback={<div>Loading...</div>}>
      {props.children}
    </Show>
  );
}
