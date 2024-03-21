import { Button } from "@components/general/Button";
import { FieldInput } from "@components/general/FieldInput";
import { Modal } from "@components/general/Modal";
import { TimeEventTagColor } from "../../openapi";
import * as Select from "@components/general/Select";
import { createStore } from "solid-js/store";
import { Input } from "@components/general/Input";
import { timeEventTagColorTranslate } from "@utils/ApiTranslator";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleAddTag: () => void;
}

type AddTagForm = {
  color: TimeEventTagColor;
  name: string;
};

interface ColorItem {
  label: string;
  value: TimeEventTagColor;
}

const colorItems: ColorItem[] = Object.keys(TimeEventTagColor).map(x => ({
  label: timeEventTagColorTranslate(x as TimeEventTagColor),
  value: x as TimeEventTagColor,
}));

export const AddTagModal = (props: Props) => {
  const [form, setForm] = createStore<AddTagForm>({
    color: colorItems[0].value,
    name: "",
  });

  const handleSubmit = async () => {
    console.log(form);
    props.handleAddTag();
  };

  return (
    <Modal
      open={props.open}
      title="活動標籤"
      onClose={() => props.setOpen(false)}
      footer={
        <div class="w-full space-x-4 text-end">
          <Button disabled={form.name === ""} onClick={handleSubmit}>
            新增
          </Button>
          <Button variant="gray" onClick={() => props.setOpen(false)}>
            取消
          </Button>
        </div>
      }
    >
      <div class="w-[320px] max-w-full">
        <div class="space-y-6">
          <div>
            <label for="name-input" class="mb-2 block text-sm font-medium">
              標籤名稱 *
            </label>
            <Input id="name-input" class="w-full" type="text" value={form.name} required onInput={e => setForm("name", e.currentTarget.value)} />
          </div>

          <Select.SimpleSelect
            items={colorItems}
            value={[form.color]}
            onValueChange={x => setForm("color", x)}
            label="標籤顏色 *"
            id="tag-color-select"
            renderItem={item => item.label}
          />
        </div>
      </div>
    </Modal>
  );
};
