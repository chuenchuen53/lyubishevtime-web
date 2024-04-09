import { createSignal } from "solid-js";
import { Button } from "../Button";
import { Modal as ModalComp } from ".";
import type { Meta, StoryObj } from "storybook-solidjs";

const [modalOpened, setModalOpened] = createSignal(false);

const meta: Meta<typeof ModalComp> = {
  title: "general/Modal",
  component: ModalComp,
  render: _args => {
    return (
      <>
        <Button class="w-fit" onClick={() => setModalOpened(true)}>
          Open Modal
        </Button>
        <ModalComp
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
        </ModalComp>
      </>
    );
  },
};

export default meta;
type Story = StoryObj<typeof ModalComp>;

export const Modal: Story = {};
