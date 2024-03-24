import { SimpleSelect } from "@components/general/Select";
import { createMemo, createResource, createSignal, Show } from "solid-js";
import { Pie } from "solid-chartjs";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { TimeEventTagColor } from "../openapi";
import { SummaryService } from "../api-service";
import type { GetSummaryResponse } from "../openapi";

ChartJS.register(ArcElement, Tooltip, Legend);

const summaryRageItems = [
  { label: "即日之內", value: "0" },
  { label: "7日之內", value: "6" },
  { label: "30日之內", value: "29" },
  { label: "365日之內", value: "364" },
];

function chartData(summary: GetSummaryResponse) {
  const infos = summary.tagInfos;
  const labels = infos.map(x => x.tagName);
  const datasets = [
    {
      label: "分鐘",
      data: infos.map(x => x.totalMinutes),
      backgroundColor: infos.map(x => getColor(x.color)),
    },
  ];
  return { labels, datasets };
}

export default function Summary() {
  const [value, setValue] = createSignal("0");
  const range = createMemo<[string, string]>(() => [prevNDayString(parseInt(value())), todayString()]);
  const [summary, _actions] = createResource(range, (x: [string, string]) => SummaryService.getSummary(x[0], x[1]));

  return (
    <div class="flex flex-col items-center p-6">
      <div class="mb-6 w-full">
        <SimpleSelect
          label="篩選時間範圍"
          id="summary-range-select"
          items={summaryRageItems}
          value={[value()]}
          onValueChange={setValue}
          renderItem={x => <span>{x.label}</span>}
        />
      </div>

      <Show when={summary.loading}>
        <div>Loading...</div>
      </Show>

      <Show when={summary()}>
        {nonNullSummary => (
          <Show when={nonNullSummary().tagInfos.length > 0} fallback={<div>沒有活動</div>}>
            <div class="w-full max-w-[400px]">
              <Pie data={chartData(nonNullSummary())} />
            </div>
          </Show>
        )}
      </Show>
    </div>
  );
}

function todayString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function prevNDayString(n: number) {
  const date = new Date();
  date.setDate(date.getDate() - n);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getColor(x: TimeEventTagColor): string {
  switch (x) {
    case TimeEventTagColor.RED:
      return "#ffcdd2";
    case TimeEventTagColor.ORANGE:
      return "#ffe0b2";
    case TimeEventTagColor.YELLOW:
      return "#fff9c4";
    case TimeEventTagColor.GREEN:
      return "#c8e6c9";
    case TimeEventTagColor.CYAN:
      return "#dcedc8";
    case TimeEventTagColor.BLUE:
      return "#b3e5fc";
    case TimeEventTagColor.PURPLE:
      return "#d1c4e9";
    case TimeEventTagColor.GREY:
      return "#cfd8dc";
  }
}
