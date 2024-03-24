import { DatePicker } from "@ark-ui/solid";
import { JSX, Show } from "solid-js";
import { Portal } from "solid-js/web";

const {
  Root,
  Control,
  Trigger,
  Positioner,
  Content,
  View,
  ViewControl,
  PrevTrigger,
  ViewTrigger,
  RangeText,
  NextTrigger,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableCellTrigger,
} = DatePicker;

interface SimpleDatePickerProps {
  value: string;
  setValue: (value: string) => void;
}

export const SimpleDatePicker = (props: SimpleDatePickerProps) => {
  return (
    <Root class="inline-flex" value={[props.value]} onValueChange={details => props.setValue(details.valueAsString[0])}>
      <Control>
        <Trigger class="flex size-10 items-center justify-center rounded-md border border-solid border-gray-400">
          <CalenderIcon />
        </Trigger>
      </Control>
      <Portal>
        <Positioner>
          <Content class="w-[344px] gap-3 rounded-md bg-bg-default p-4 shadow-md">
            <View view="day" class="flex flex-col gap-3 [&[hidden]]:!hidden">
              {api => (
                <>
                  <ViewControl class="flex justify-between gap-2 py-2">
                    <PrevTrigger>
                      <LeftArrow />
                    </PrevTrigger>
                    <ViewTrigger>
                      <RangeText class="font-semibold" />
                    </ViewTrigger>
                    <NextTrigger>
                      <RightArrow />
                    </NextTrigger>
                  </ViewControl>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {api().weekDays.map(weekDay => (
                          <TableHeader class="size-10">{weekDay.narrow}</TableHeader>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {api().weeks.map(week => (
                        <TableRow>
                          {week.map(day => (
                            <TableCell value={day}>
                              <TableCellTrigger class="size-10 rounded-sm hover:bg-gray-200/20 data-[disabled]:cursor-not-allowed data-[selected]:bg-primary/70 data-[disabled]:opacity-30 data-[disabled]:hover:bg-transparent">
                                {day.day}
                              </TableCellTrigger>
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </>
              )}
            </View>
            <View view="month" class="flex flex-col gap-3 [&[hidden]]:!hidden">
              {api => (
                <>
                  <ViewControl class="flex justify-between gap-2 py-2">
                    <PrevTrigger>
                      <LeftArrow />
                    </PrevTrigger>
                    <ViewTrigger>
                      <RangeText class="font-semibold" />
                    </ViewTrigger>
                    <NextTrigger>
                      <RightArrow />
                    </NextTrigger>
                  </ViewControl>
                  <Table>
                    <TableBody>
                      {api()
                        .getMonthsGrid({ columns: 4, format: "short" })
                        .map(months => (
                          <TableRow>
                            {months.map(month => (
                              <TableCell value={month.value}>
                                <TableCellTrigger class="h-10 w-[72px] rounded-sm hover:bg-gray-200/20 data-[disabled]:cursor-not-allowed data-[selected]:bg-primary/70 data-[disabled]:opacity-30 data-[disabled]:hover:bg-transparent">
                                  {month.label}
                                </TableCellTrigger>
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </>
              )}
            </View>
            <View view="year" class="flex flex-col gap-3 [&[hidden]]:!hidden">
              {api => (
                <>
                  <ViewControl class="flex justify-between gap-2 py-2">
                    <PrevTrigger>
                      <LeftArrow />
                    </PrevTrigger>
                    <ViewTrigger>
                      <RangeText class="font-semibold" />
                    </ViewTrigger>
                    <NextTrigger>
                      <RightArrow />
                    </NextTrigger>
                  </ViewControl>
                  <Table>
                    <TableBody>
                      {api()
                        .getYearsGrid({ columns: 4 })
                        .map(years => (
                          <TableRow>
                            {years.map(year => (
                              <TableCell value={year.value}>
                                <TableCellTrigger class="h-10 w-[72px] rounded-sm hover:bg-gray-200/20 data-[disabled]:cursor-not-allowed data-[selected]:bg-primary/70 data-[disabled]:opacity-30 data-[disabled]:hover:bg-transparent">
                                  {year.label}
                                </TableCellTrigger>
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </>
              )}
            </View>
          </Content>
        </Positioner>
      </Portal>
    </Root>
  );
};

function CalenderIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M8 2v4"></path>
      <path d="M16 2v4"></path>
      <rect width="18" height="18" x="3" y="4" rx="2"></rect>
      <path d="M3 10h18"></path>
    </svg>
  );
}

function LeftArrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="m15 18-6-6 6-6"></path>
    </svg>
  );
}

function RightArrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="m9 18 6-6-6-6"></path>
    </svg>
  );
}
