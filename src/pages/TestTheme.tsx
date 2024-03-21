import { Button } from "@components/general/Button";

export default function TestTheme() {
  return (
    <div class="p-6">
      <section class="space-y-6">
        <h1>Button</h1>
        <div class="space-x-6">
          <Button>default</Button>
          <Button variant="danger">error</Button>
          <Button variant="gray">gray</Button>
        </div>
        <div class="space-x-6">
          <Button disabled>default</Button>
          <Button disabled variant="danger">
            error
          </Button>
          <Button disabled variant="gray">
            gray
          </Button>
        </div>
      </section>
    </div>
  );
}
