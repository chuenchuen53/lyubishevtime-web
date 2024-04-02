import { ApiUtil } from "@utils/ApiUtil";
import { createEffect, createSignal } from "solid-js";
import { createStore, produce } from "solid-js/store";
import { DateUtil } from "@utils/DateUtil";
import { Message } from "@components/general/Message";
import { EventService } from "../../api-service";
import { EventFormModal } from "./EventFormModal";
import type { TimeEvent, TimeEventTag } from "@openapi";
import type { EventForm } from "./EventFormModal";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccessfulAdd: (x: TimeEvent) => void;
  tags: TimeEventTag[];
  pageDate: string;
}

export const AddEventModal = (props: Props) => {
  const [form, setForm] = createStore<EventForm>({
    date: DateUtil.todayString(),
    tagId: -1,
    minute: 1,
    name: "",
    startTime: "00:00:00",
  });
  const [loading, setLoading] = createSignal(false);

  const handleSubmit = async () => {
    if (form.name.length > 255) {
      Message.createError("簡介長度不可超過255字");
      return;
    }

    const { timeEvent } = await ApiUtil.loadingAndErrHandling(() => EventService.addTimeEvent(form), setLoading, "新增活動失敗");
    props.onSuccessfulAdd(timeEvent);
    setForm(
      produce(draft => {
        draft.name = "";
        draft.minute = 1;
      }),
    );
    props.onClose();
  };

  createEffect(() => {
    setForm("date", props.pageDate);
  });

  createEffect(() => {
    setForm("tagId", props.tags[0]?.id);
  });

  return (
    <EventFormModal
      open={props.open}
      onClose={props.onClose}
      submitText="新增"
      handleSubmit={handleSubmit}
      disableSubmit={!form.name}
      loading={loading()}
      tags={props.tags}
      form={form}
      setForm={setForm}
    />
  );
};
