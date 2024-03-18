import { Button } from "@components/generate/Button";
import { createForm, pattern } from "@modular-forms/solid";
import { TextInput } from "@components/generate/TextInput";
import type { SubmitHandler } from "@modular-forms/solid";

type RegisterForm = {
  username: string;
  nickname: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const [registerForm, { Form, Field }] = createForm<RegisterForm>();

  const handleSubmit: SubmitHandler<RegisterForm> = (values, e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <div class="px-6">
      <h1 class="text-center">註冊</h1>

      <Form onSubmit={handleSubmit}>
        <div class="space-y-6">
          <Field name="username" validate={[pattern(/^[a-zA-Z0-9_]{6,16}$/, "請輸入6-16位英文或數字")]}>
            {(field, props) => (
              <TextInput {...props} type="text" label="使用者名稱" name={field.name} value={field.value} error={field.error} required />
            )}
          </Field>
          <Field name="nickname" validate={[pattern(/\S+/, "暱稱不能為空")]}>
            {(field, props) => <TextInput {...props} type="text" label="暱稱" name={field.name} value={field.value} error={field.error} required />}
          </Field>
          <Field name="password" validate={[pattern(/^[a-zA-Z0-9_]{6,16}$/, "請輸入6-16位英文或數字")]}>
            {(field, props) => <TextInput {...props} type="text" label="密碼" name={field.name} value={field.value} error={field.error} required />}
          </Field>
          <Field name="confirmPassword" validate={[pattern(/^[a-zA-Z0-9_]{6,16}$/, "請輸入6-16位英文或數字")]}>
            {(field, props) => (
              <TextInput {...props} type="text" label="確認密碼" name={field.name} value={field.value} error={field.error} required />
            )}
          </Field>
          <div class="text-right">
            <Button type="submit">註冊</Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
