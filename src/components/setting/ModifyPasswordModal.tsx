import { Button } from "@components/general/Button";
import { FieldInput } from "@components/general/FieldInput";
import { Modal } from "@components/general/Modal";
import { createForm, custom, getValue, pattern, required, setError } from "@modular-forms/solid";
import { ValidationUtil } from "@utils/ValidationUtil";
import { Axios, AxiosError } from "axios";
import { logout } from "@stores/UserStore";
import { UserService } from "../../api-service";
import type { SubmitHandler } from "@modular-forms/solid";

interface Props {
  open: boolean;
  onClose: () => void;
}

type ModifyPasswordForm = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export const ModifyPasswordModal = (props: Props) => {
  const [modifyPasswordForm, { Form, Field }] = createForm<ModifyPasswordForm>();

  const handleSubmit: SubmitHandler<ModifyPasswordForm> = async (values, _e) => {
    try {
      await UserService.updatePassword({ oldPassword: values.oldPassword, newPassword: values.newPassword });
      props.onClose();
      logout();
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 401 && e.response.data.errorMessage === "Incorrect old password") {
        setError(modifyPasswordForm, "oldPassword", "密碼錯誤");
      } else {
        throw e;
      }
    }
  };

  return (
    <Modal title="修改密碼" open={props.open} onClose={props.onClose}>
      <Form onSubmit={handleSubmit}>
        <div class="w-80 max-w-full space-y-6">
          <Field name="oldPassword" validate={[required("密碼不能為空"), pattern(ValidationUtil.passwordRegex, "請輸入6-16位英文或數字")]}>
            {(field, props) => <FieldInput {...props} type="password" label="舊密碼" field={field} required />}
          </Field>
          <Field name="newPassword" validate={[required("密碼不能為空"), pattern(ValidationUtil.passwordRegex, "請輸入6-16位英文或數字")]}>
            {(field, props) => <FieldInput {...props} type="password" label="新密碼" field={field} required />}
          </Field>
          <Field
            name="confirmPassword"
            validate={[
              required("確認密碼不能為空"),
              custom(value => {
                const newPassword = getValue(modifyPasswordForm, "newPassword");
                return Promise.resolve(value === newPassword);
              }, "密碼不一致"),
            ]}
          >
            {(field, props) => <FieldInput {...props} type="password" label="確認密碼" field={field} required />}
          </Field>
          <div class="text-right">
            <Button type="submit" disabled={!modifyPasswordForm.dirty || modifyPasswordForm.invalid}>
              修改密碼
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};
