import { Button } from "@components/general/Button";
import { SimpleFormContainer } from "@components/common/SimpleFormContainer";
import { createForm, custom, getValue, pattern, required } from "@modular-forms/solid";
import { FieldInput } from "@components/general/FieldInput";
import { ValidationUtil } from "@utils/ValidationUtil";
import { A, useNavigate } from "@solidjs/router";
import { UserService } from "src/api-service";
import type { SubmitHandler } from "@modular-forms/solid";

type RegisterForm = {
  username: string;
  nickname: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const [registerForm, { Form, Field }] = createForm<RegisterForm>();

  const handleSubmit: SubmitHandler<RegisterForm> = async (values, _e) => {
    const { data } = await UserService.signup(values);
    console.log("consthandleSubmit:SubmitHandler<RegisterForm>= ~ data:", data);
  };

  return (
    <SimpleFormContainer formTitle="註冊">
      <Form onSubmit={handleSubmit}>
        <div class="space-y-6">
          <Field name="username" validate={[required("使用者名稱不能為空"), pattern(ValidationUtil.usernameRegex, "請輸入6-16位英文或數字")]}>
            {(field, props) => <FieldInput {...props} type="text" label="使用者名稱" field={field} required />}
          </Field>
          <Field name="nickname" validate={[required("暱稱不能為空")]}>
            {(field, props) => <FieldInput {...props} type="text" label="暱稱" field={field} required />}
          </Field>
          <Field name="password" validate={[required("密碼不能為空"), pattern(ValidationUtil.passwordRegex, "請輸入6-16位英文或數字")]}>
            {(field, props) => <FieldInput {...props} type="password" label="密碼" field={field} required />}
          </Field>
          <Field
            name="confirmPassword"
            validate={[
              required("確認密碼不能為空"),
              custom(value => {
                const password = getValue(registerForm, "password");
                return Promise.resolve(value === password);
              }, "密碼不一致"),
            ]}
          >
            {(field, props) => <FieldInput {...props} type="password" label="確認密碼" field={field} required />}
          </Field>
          <Button type="submit">註冊</Button>
        </div>
      </Form>
      <p class="text-sm font-light text-gray-500 dark:text-gray-400">
        已經有帳戶了嗎？{" "}
        <A href="/login" class="font-medium text-primary-600 hover:underline dark:text-primary-500">
          點此登入
        </A>
      </p>
    </SimpleFormContainer>
  );
}
