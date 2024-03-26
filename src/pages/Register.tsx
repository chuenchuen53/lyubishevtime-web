import { Button } from "@components/general/Button";
import { SimpleFormContainer } from "@components/common/SimpleFormContainer";
import { createForm, custom, getValue, maxLength, pattern, required, setError } from "@modular-forms/solid";
import { FieldInput } from "@components/common/FieldInput";
import { ValidationUtil } from "@utils/ValidationUtil";
import { Show, createSignal } from "solid-js";
import { LinkButton } from "@components/general/Button/LinkButton";
import { SuccessRegisterModal } from "@components/register/SuccessRegisteModal";
import { ApiUtil } from "@utils/ApiUtil";
import { UserService } from "../api-service";
import type { RegisterResponse } from "../openapi";
import type { SubmitHandler } from "@modular-forms/solid";

type RegisterForm = {
  username: string;
  nickname: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const [successData, setSuccessData] = createSignal<RegisterResponse | null>(null);
  const [registerForm, { Form, Field }] = createForm<RegisterForm>();
  const [fetching, setFetching] = createSignal(false);

  const handleSubmit: SubmitHandler<RegisterForm> = async (values, _e) => {
    try {
      setFetching(true);
      const data = await UserService.register(values);
      setSuccessData(data);
    } catch (error) {
      if (ApiUtil.isAxiosErrorWithStatus(error, 409)) {
        setError(registerForm, "username", "使用者名稱已被使用");
      } else {
        throw error;
      }
    } finally {
      setFetching(false);
    }
  };

  return (
    <SimpleFormContainer formTitle="註冊">
      <Form onSubmit={handleSubmit}>
        <div class="space-y-6">
          <Field name="username" validate={[required("使用者名稱不能為空"), pattern(ValidationUtil.usernameRegex, "請輸入6-16位英文或數字")]}>
            {(field, props) => <FieldInput {...props} type="text" label="使用者名稱" field={field} required />}
          </Field>
          <Field name="nickname" validate={[required("暱稱不能為空"), maxLength(12, "不能超過12個字")]}>
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
          <Button loading={fetching()} type="submit">
            註冊
          </Button>
        </div>
      </Form>
      <p class="text-sm font-light text-neutral-text-secondary">
        已經有帳戶了嗎？{" "}
        <LinkButton variant="link" href="/login" class="dark">
          點此登入
        </LinkButton>
      </p>
      <Show when={successData()}>{nonNullData => <SuccessRegisterModal {...nonNullData()} onClose={() => setSuccessData(null)} />}</Show>
    </SimpleFormContainer>
  );
}
