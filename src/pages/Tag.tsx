import { createResource } from "solid-js";
import { TagService } from "../api-service";

export default function Tag() {
  const [data] = createResource(TagService.listTimeEventTag);

  return (
    <div>
      <h1>Tag</h1>
      {JSON.stringify(data())}
    </div>
  );
}
