import { Modal } from "@components/general/Modal";
import { LinkButton } from "@components/general/Button/LinkButton";

interface Props {
  data: {
    username: string;
    nickname: string;
  } | null;
  onClose: () => void;
}

export const SuccessRegisterModal = (props: Props) => {
  return (
    <Modal
      open={Boolean(props.data)}
      onClose={props.onClose}
      title="註冊成功"
      footer={
        <div class="flex w-full justify-end">
          <LinkButton href="/login">登入</LinkButton>
        </div>
      }
    >
      <div class="grid w-80 grid-cols-[auto_1fr] grid-rows-2 gap-x-2 gap-y-4">
        <p>使用者名稱:</p>
        <p>{props.data?.username}</p>
        <p>暱稱:</p>
        <p>{props.data?.nickname}</p>
      </div>
    </Modal>
  );
};
