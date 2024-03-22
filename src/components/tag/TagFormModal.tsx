import { Button } from "@components/general/Button";
import { Modal } from "@components/general/Modal";
import { TimeEventTagColor } from "../../openapi";
import * as Select from "@components/general/Select";
import { createStore } from "solid-js/store";
import { Input } from "@components/general/Input";
import { timeEventTagColorTranslate } from "@utils/ApiTranslator";
import { EnumUtil } from "@utils/EnumUtil";
import { createEffect, untrack } from "solid-js";

export interface TagForm {
  color: TimeEventTagColor;
  name: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  handleSubmit: (x: TagForm) => void;
  initialForm?: TagForm;
  mode: "add" | "edit";
}

interface ColorItem {
  label: string;
  value: TimeEventTagColor;
}

const colorItems: ColorItem[] = EnumUtil.values(TimeEventTagColor).map(x => ({
  label: timeEventTagColorTranslate(x),
  value: x,
}));

export const TagFormModal = (props: Props) => {
  const [form, setForm] = createStore<TagForm>(
    props.initialForm ?? {
      color: colorItems[0].value,
      name: "",
    },
  );

  const handleSubmit = async () => {
    props.handleSubmit(form);
  };

  return (
    <Modal
      open={props.open}
      title="活動標籤"
      onClose={props.onClose}
      footer={
        <div class="w-full space-x-4 text-end">
          <Button
            disabled={form.name === "" || (props.mode === "edit" && form.name === props.initialForm?.name && form.color === props.initialForm.color)}
            onClick={handleSubmit}
          >
            {props.mode === "add" ? "新增" : "編輯"}
          </Button>
          <Button variant="gray" onClick={props.onClose}>
            取消
          </Button>
        </div>
      }
    >
      <div class="w-[320px] max-w-full space-y-6">
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
    </Modal>
  );
};
