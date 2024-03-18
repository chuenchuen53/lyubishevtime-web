import { SimpleFormContainer } from "@components/common/SimpleFormContainer";
import { Button } from "@components/general/Button";
import { FieldInput } from "@components/general/FieldInput";
import { createForm, pattern, required } from "@modular-forms/solid";
import { A, useNavigate } from "@solidjs/router";
import type { SubmitHandler } from "@modular-forms/solid";
import { ValidationUtil } from "@utils/ValidationUtil";
import { login } from "../api/user";
import { setCustomer } from "@stores/CustomerStore";

type LoginForm = {
  username: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const [_loginForm, { Form, Field }] = createForm<LoginForm>();

  const handleLogin: SubmitHandler<LoginForm> = async (values, _e) => {
    const data = await login(values);
    const customer = {
      username: data.username,
      nickname: data.nickname,
      photoUrl: data.photoUrl,
      token: data.token,
    };
    setCustomer({
      // todo
      id: 4,
      username: data.username,
      nickname: data.nickname,
    });

    console.log("handleLogin:SubmitHandler<LoginForm>= ~ data:", data);

    navigate("/tag");
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
          <Button type="submit">登入</Button>
        </div>
      </Form>
      <p class="text-sm font-light text-gray-500 dark:text-gray-400">
        沒有帳戶嗎？{" "}
        <A href="/register" class="font-medium text-primary-600 hover:underline dark:text-primary-500">
          在這裡註冊
        </A>
      </p>
    </SimpleFormContainer>
  );
}
