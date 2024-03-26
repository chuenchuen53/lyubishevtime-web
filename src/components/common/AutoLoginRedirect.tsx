import { useNavigate } from "@SolidJS/router";
import { setUserAfterLogin, user } from "@stores/UserStore";
import { AxiosError } from "axios";
import { UserService } from "../../api-service";
import type { JSX } from "solid-js";

interface Props {
  children?: JSX.Element;
}

export default function AutoLoginRedirect(props: Props) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (token && user()) {
    navigate("/tag", { replace: true });
  }

  if (token && !user()) {
    UserService.currentUser()
      .then(resp => {
        setUserAfterLogin(resp.data);
        navigate("/tag", { replace: true });
      })
      .catch(e => {
        if (e instanceof AxiosError && e.response?.status === 401) {
          localStorage.removeItem("token");
        } else {
          throw e;
        }
      });
  }

  return <>{props.children}</>;
}
