import { useNavigate } from "@SolidJS/router";
import { setUserAfterLogin, user } from "@stores/UserStore";
import { ApiUtil } from "@utils/ApiUtil";
import { UserService } from "../api-service";
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
      .then(data => {
        setUserAfterLogin(data);
        navigate("/tag", { replace: true });
      })
      .catch(e => {
        if (ApiUtil.isAxiosErrorWithStatus(e, 401)) {
          localStorage.removeItem("token");
        } else {
          throw e;
        }
      });
  }

  return <>{props.children}</>;
}
