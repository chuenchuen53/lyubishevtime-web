import { SimpleFormContainer } from "@components/common/SimpleFormContainer";
import { Button } from "@components/general/Button";
import { FieldInput } from "@components/common/FieldInput";
import { createForm, pattern, required } from "@modular-forms/solid";
import { useNavigate } from "@solidjs/router";
import { ValidationUtil } from "@utils/ValidationUtil";
import { setUserAfterLogin } from "@stores/UserStore";
import { Message } from "@components/general/Message";
import { createSignal } from "solid-js";
import { LinkButton } from "@components/general/Button/LinkButton";
import { ApiUtil } from "@utils/ApiUtil";
import { UserService } from "../api-service";
import type { SubmitHandler } from "@modular-forms/solid";

type LoginForm = {
  username: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const [_loginForm, { Form, Field }] = createForm<LoginForm>();
  const [loading, setLoading] = createSignal(false);

  const handleLogin: SubmitHandler<LoginForm> = async (values, _e) => {
    try {
      setLoading(true);
      const { appUser } = await UserService.login(values);
      setUserAfterLogin(appUser);
      navigate("/tag");
    } catch (e) {
      if (ApiUtil.isAxiosErrorWithStatus(e, 401)) {
        Message.createError("使用者名稱或密碼錯誤");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SimpleFormContainer formTitle="登入">
      <Form onSubmit={handleLogin}>
        <div class="space-y-6">
          <Field name="username" validate={[required("使用者名稱不能為空"), pattern(ValidationUtil.usernameRegex, "請輸入6-16位英文或數字")]}>
            {(field, props) => <FieldInput {...props} type="text" label="使用者名稱" field={field} required />}
          </Field>
          <Field name="password" validate={[required("密碼不能為空"), pattern(ValidationUtil.passwordRegex, "請輸入6-16位英文或數字")]}>
            {(field, props) => <FieldInput {...props} type="password" label="密碼" field={field} required />}
          </Field>
          <Button loading={loading()} type="submit">
            登入
          </Button>
        </div>
      </Form>
      <p class="text-sm font-light text-gray-500 dark:text-gray-400">
        沒有帳戶嗎？
        <LinkButton href="/register" variant="link">
          在這裡註冊
        </LinkButton>
      </p>
    </SimpleFormContainer>
  );
}
