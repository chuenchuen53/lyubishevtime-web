import { Button } from "@components/general/Button";
import { FieldInput } from "@components/general/FieldInput";
import { Modal } from "@components/general/Modal";
import { SubmitHandler, createForm, maxLength, required } from "@modular-forms/solid";
import { TimeEventTagColor } from "src/openapi";
import { Demo } from "./Demo";
import { MySlider } from "@components/general/HoverCard";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleAddTag: () => void;
}

type AddTagForm = {
  color: TimeEventTagColor;
  name: string;
};

export const AddTagModal = (props: Props) => {
  let submitBtn!: HTMLButtonElement;
  const [_form, { Form, Field }] = createForm<AddTagForm>({ validateOn: "blur" });

  const handleSubmit: SubmitHandler<AddTagForm> = async (values, _e) => {
    console.log(values);
    props.handleAddTag();
  };

  const handleAddClick = () => {
    submitBtn.click();
  };

  return (
    <Modal
      open={props.open}
      title="活動標籤"
      onClose={() => props.setOpen(false)}
      footer={
        <div class="space-x-4">
          <Button disabled={!_form.dirty || _form.invalid} onClick={handleAddClick}>
            新增
          </Button>
          <Button variant="danger" onClick={() => props.setOpen(false)}>
            取消
          </Button>
        </div>
      }
    >
      <div class="w-[320px] max-w-full">
        <Form onSubmit={handleSubmit}>
          <div class="space-y-6">
            <Field name="name" validate={[required("標籤名稱不能為空"), maxLength(20, "標籤名稱不能超過20個字")]}>
              {(field, props) => <FieldInput {...props} type="text" label="標籤名稱" field={field} required />}
            </Field>
            <Field name="color" validate={[required("密碼不能為空")]}>
              {(field, props) => <FieldInput {...props} type="password" label="密碼" field={field} required />}
            </Field>
            <Demo />
            <MySlider />
            <button ref={submitBtn} type="submit" class="hidden">
              submit
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};
