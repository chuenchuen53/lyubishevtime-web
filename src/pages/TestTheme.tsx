import { Button } from "@components/general/Button";
import IconButton from "@components/general/Button/IconButton";
import { LinkButton } from "@components/general/Button/LinkButton";
import { Input } from "@components/general/Input";
import { MultipleSelect, SingleSelect } from "@components/general/Select";
import { Index, createEffect, createSignal } from "solid-js";
import { BiSolidPencil } from "solid-icons/bi";
import { Dropdown } from "@components/general/Dropdown";
import { DatePicker } from "@components/general/DatePicker";
import { DateUtil } from "@utils/DateUtil";
import { TimePicker } from "@components/general/TimePicker";
import { Modal } from "@components/general/Modal";

import { Message } from "@components/general/Message";
import type { ParentComponent } from "solid-js";

const selectItems = [
  { label: "React", value: "react" },
  { label: "Solid", value: "solid" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
  { label: "Angular", value: "angular" },
  { label: "jQuery", value: "jquery" },
];

const dropdownItems = ["Dashboard", "Settings", "Earnings", "Sign out"];

const DemoSection: ParentComponent<{ title: string }> = props => (
  <section class="mb-10">
    <h1 class="mb-6 text-xl font-bold">{props.title}</h1>
    <div class="flex flex-col gap-6">{props.children}</div>
  </section>
);

const DemoRow: ParentComponent = props => <div class="flex flex-wrap items-center gap-6">{props.children}</div>;

export default function TestTheme() {
  const [singleSelectedValue, setSingleSelectedValue] = createSignal("react");
  const [multiSelectedValue, setMultiSelectedValue] = createSignal(["react", "solid"]);
  const [date, setDate] = createSignal(DateUtil.getTodayString());
  const [time, setTime] = createSignal("00:00:00");
  const [modalOpened, setModalOpened] = createSignal(false);

  return (
    <div class="p-6">
      <DemoSection title="Message">
        <DemoRow>
          <Button onClick={() => Message.create("Default")}>Default</Button>
          <Button onClick={() => Message.create("Success", "success")}>Success</Button>
          <Button onClick={() => Message.create("Error", "error")}>Error</Button>
        </DemoRow>
      </DemoSection>

      <DemoSection title="Button">
        <DemoRow>
          <Button>default</Button>
          <Button variant="danger">error</Button>
          <Button variant="gray">gray</Button>
          <Button variant="text">text</Button>
        </DemoRow>
        <DemoRow>
          <Button disabled>default</Button>
          <Button disabled variant="danger">
            error
          </Button>
          <Button disabled variant="gray">
            gray
          </Button>
          <Button disabled variant="text">
            text
          </Button>
        </DemoRow>
      </DemoSection>

      <DemoSection title="Link Button">
        <DemoRow>
          <LinkButton href="/">default</LinkButton>
          <LinkButton href="/" variant="danger">
            error
          </LinkButton>
          <LinkButton href="/" variant="gray">
            gray
          </LinkButton>
          <LinkButton href="/" variant="text">
            text
          </LinkButton>
          <LinkButton href="/" variant="link">
            link
          </LinkButton>
        </DemoRow>
      </DemoSection>
      <DemoSection title="Icon Button">
        <DemoRow>
          <IconButton>
            <BiSolidPencil size={24} />
          </IconButton>
          <IconButton variant="primary">
            <BiSolidPencil size={24} />
          </IconButton>
          <IconButton variant="danger">
            <BiSolidPencil size={24} />
          </IconButton>
        </DemoRow>
      </DemoSection>
      <DemoSection title="Input">
        <DemoRow>
          <Input type="text" placeholder="input text here" value="" />
          <Input type="text" placeholder="input text here" value="" isError />
        </DemoRow>
      </DemoSection>

      <DemoSection title="Select">
        <DemoRow>
          <SingleSelect
            label="Single Value Select"
            id="single-value-select-ui-test"
            triggerClass="w-48"
            items={selectItems}
            value={singleSelectedValue()}
            onValueChange={setSingleSelectedValue}
            renderItem={item => <div>{item.label}</div>}
          />
          <MultipleSelect
            label="Multiple Value Select"
            id="multiple-value-select-ui-test"
            triggerClass="w-48"
            items={selectItems}
            value={multiSelectedValue()}
            onValueChange={setMultiSelectedValue}
            renderItem={item => <div>{item.label}</div>}
          />
        </DemoRow>
      </DemoSection>

      <DemoSection title="Dropdown">
        <Dropdown
          id="dropdown-ui-test"
          class="inline-block"
          options={{ placement: "bottom-start" }}
          dropdownClass="w-36"
          dropdownElement={
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
              <Index each={dropdownItems}>{x => <li class="block px-4 py-2 hover:bg-neutral-fill-tertiary">{x()}</li>}</Index>
            </ul>
          }
        >
          <Button class="w-36">Open</Button>
        </Dropdown>
      </DemoSection>

      <DemoSection title="Date Picker">
        <DemoRow>
          <div>Selected Date: {date()}</div>
          <DatePicker value={date()} setValue={setDate} />
        </DemoRow>
      </DemoSection>

      <DemoSection title="Time Picker">
        <div class="grid w-fit grid-cols-2 grid-rows-2 items-center gap-6">
          <div>Time: {time()}</div>
          <TimePicker id="time-picker-demo" value={time()} setValue={setTime} />
          <div>Time: {time().slice(0, 5)}</div>
          <TimePicker id="time-picker-no-sec-demo" value={time()} setValue={setTime} hideSeconds />
        </div>
      </DemoSection>

      <DemoSection title="Modal">
        <Button class="w-fit" onClick={() => setModalOpened(true)}>
          Open Modal
        </Button>
        <Modal
          open={modalOpened()}
          onClose={() => setModalOpened(false)}
          title="Test Modal"
          footer={
            <div class="flex w-full justify-end">
              <Button onClick={() => setModalOpened(false)}>OK</Button>
            </div>
          }
        >
          <div class="w-[600px] max-w-[80vw]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut nulla fugit ullam provident eius non illum esse molestias mollitia consequatur
            doloribus rerum maiores harum fugiat pariatur maxime, sunt rem repellendus!
          </div>
        </Modal>
      </DemoSection>
    </div>
  );
}
