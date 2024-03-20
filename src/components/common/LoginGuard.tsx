import { useNavigate } from "@SolidJS/router";
import { Show } from "solid-js";
import { setUserAfterLogin, user } from "@stores/UserStore";
import type { JSX } from "solid-js";
import { UserService } from "../../api-service";
import { AxiosError } from "axios";

interface Props {
  children?: JSX.Element;
}

export default function LoginGuard(props: Props) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) navigate("/", { replace: true });
  if (token && !user()) {
    UserService.currentUser()
      .then(resp => {
        setUserAfterLogin(resp.data);
      })
      .catch(e => {
        if (e instanceof AxiosError && e.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/", { replace: true });
        }
      });
    console.log("call me");
  }

  return (
    <Show when={user() !== null} fallback={<div>Loading...</div>}>
      {props.children}
    </Show>
  );
}
