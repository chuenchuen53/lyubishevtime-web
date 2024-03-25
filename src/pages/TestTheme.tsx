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

const selectItems = [
  { label: "React", value: "react" },
  { label: "Solid", value: "solid" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
  { label: "Angular", value: "angular" },
  { label: "jQuery", value: "jquery" },
];

const dropdownItems = ["Dashboard", "Settings", "Earnings", "Sign out"];

export default function TestTheme() {
  const [singleSelectedValue, setSingleSelectedValue] = createSignal("react");
  const [multiSelectedValue, setMultiSelectedValue] = createSignal(["react", "solid"]);
  const [date, setDate] = createSignal(DateUtil.getTodayString());

  return (
    <div class="space-y-10 p-6">
      <section>
        <h1>Date Picker</h1>
        <div class="flex items-center gap-6">
          <div>Selected Date: {date()}</div>
          <DatePicker value={date()} setValue={setDate} />
        </div>
      </section>

      <section class="space-y-6">
        <h1>Button</h1>
        <div class="space-x-6">
          <Button>default</Button>
          <Button variant="danger">error</Button>
          <Button variant="gray">gray</Button>
          <Button variant="text">text</Button>
        </div>
        <div class="space-x-6">
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
        </div>
      </section>
      <section class="space-y-6">
        <h1>Link Button</h1>
        <div class="space-x-6">
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
        </div>
      </section>
      <section class="space-y-6">
        <h1>Icon Button</h1>
        <div class="space-x-6">
          <IconButton>
            <BiSolidPencil size={24} />
          </IconButton>
          <IconButton variant="primary">
            <BiSolidPencil size={24} />
          </IconButton>
          <IconButton variant="danger">
            <BiSolidPencil size={24} />
          </IconButton>
        </div>
      </section>
      <section class="space-y-6">
        <h1>Input</h1>
        <div class="space-x-6">
          <Input type="text" placeholder="input text here" value="" />
          <Input type="text" placeholder="input text here" value="" isError />
        </div>
      </section>

      <section class="space-y-6">
        <h1>Select</h1>
        <div class="flex space-x-6">
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
        </div>
      </section>

      <section class="space-y-6">
        <h1>Dropdown</h1>
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
      </section>
    </div>
  );
}
