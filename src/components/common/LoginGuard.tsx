import { useNavigate } from "@SolidJS/router";
import { Show } from "solid-js";
import { customer, useIsLogin } from "@stores/CustomerStore";
import type { JSX } from "solid-js";

interface Props {
  children?: JSX.Element;
}

export default function LoginGuard(props: Props) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isLogin = useIsLogin();

  if (!token) navigate("/", { replace: true });
  if (!isLogin) {
    // todo: fetch customer info
  }

  return (
    <Show when={customer() !== null} fallback={<div>Loading...</div>}>
      {props.children}
    </Show>
  );
}
