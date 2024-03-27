import { SingleSelect } from "@components/general/Select";
import { createEffect, createMemo, createResource, createSignal, Show } from "solid-js";
import { Pie } from "solid-chartjs";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { useDelayedLoading } from "@reactivity/useDelayedLoading";
import { DateUtil } from "@utils/DateUtil";
import { TagColorUtil } from "@utils/TagColorUtil";
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
      backgroundColor: infos.map(x => TagColorUtil.chartColor(x.color)),
    },
  ];
  return { labels, datasets };
}

export default function Summary() {
  const [value, setValue] = createSignal("0");
  const range = createMemo<[string, string]>(() => [DateUtil.prevNDayString(parseInt(value())), DateUtil.todayString()]);
  const [summary, _actions] = createResource(range, (x: [string, string]) => SummaryService.getSummary(x[0], x[1]));
  const [loading, setDeferLoading, setNotLoading] = useDelayedLoading(750);

  createEffect(() => {
    if (summary.loading) {
      setDeferLoading();
    } else {
      setNotLoading();
    }
  });

  return (
    <div class="flex flex-col items-center">
      <div class="mb-6 w-full">
        <SingleSelect
          label="篩選時間範圍"
          id="summary-range-select"
          items={summaryRageItems}
          value={value()}
          onValueChange={setValue}
          renderItem={x => <span>{x.label}</span>}
        />
      </div>

      <Show when={loading()}>
        <div class="animate-pulse rounded-full">
          <div class="mb-4 grid h-4 w-[calc(min(375px,100vw-60px))] grid-cols-3 gap-4">
            <div class="bg-gray-200 dark:bg-gray-700" />
            <div class="bg-gray-200 dark:bg-gray-700" />
            <div class="bg-gray-200 dark:bg-gray-700" />
          </div>
          <div class="mb-4 size-[calc(min(375px,100vw-60px))] rounded-full bg-gray-200 dark:bg-gray-700" />
        </div>
      </Show>

      <Show when={!loading() && summary()}>
        {nonNullSummary => (
          <Show when={nonNullSummary().tagInfos.length > 0} fallback={<div>沒有活動</div>}>
            <div class="flex w-full max-w-[400px] justify-center">
              <Pie data={chartData(nonNullSummary())} />
            </div>
          </Show>
        )}
      </Show>
    </div>
  );
}
