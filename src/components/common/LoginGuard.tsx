import { useNavigate } from "@SolidJS/router";
import { Show } from "solid-js";
import { user } from "@stores/UserStore";
import type { JSX } from "solid-js";

interface Props {
  children?: JSX.Element;
}

export default function LoginGuard(props: Props) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) navigate("/", { replace: true });
  if (!user()) {
    // todo: fetch customer info
  }

  return (
    <Show when={user() !== null} fallback={<div>Loading...</div>}>
      {props.children}
    </Show>
  );
}
