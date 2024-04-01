import { Modal } from "@components/general/Modal";
import { Input } from "@components/general/Input";
import { createSignal } from "solid-js";
import { Button } from "@components/general/Button";
import { updateNickname } from "@stores/UserStore";
import { UserService } from "../../api-service";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const EditNicknameModal = (props: Props) => {
  const [nickname, setNickname] = createSignal("");

  const handleSubmit = async () => {
    try {
      await UserService.updateNickname({ nickname: nickname() });
      updateNickname(nickname());
      props.onClose();
    } catch (e) {
      // todo
      console.log(e);
    }
  };

  return (
    <Modal
      title="修改暱稱"
      open={props.open}
      onClose={props.onClose}
      footer={
        <div class="w-full space-x-4 text-end">
          <Button disabled={nickname() === "" || nickname().length > 30} onClick={handleSubmit}>
            確定
          </Button>
          <Button variant="gray" onClick={props.onClose}>
            取消
          </Button>
        </div>
      }
    >
      <div class="mt-4 w-80 max-w-full">
        <label for="new-nickname-input" class="mb-2 block text-sm font-medium">
          暱稱
        </label>
        <Input id="new-nickname-input" class="w-full" type="text" value={nickname()} onInput={e => setNickname(e.currentTarget.value)} />
      </div>
    </Modal>
  );
};
