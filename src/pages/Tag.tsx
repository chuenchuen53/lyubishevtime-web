import { createResource } from "solid-js";
import { listTags } from "../api/tag";

export default function Tag() {
  const [data] = createResource(listTags);

  return (
    <div>
      <h1>Tag</h1>
      {JSON.stringify(data)}
    </div>
  );
}
