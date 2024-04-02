import { DatePicker as ArkDatePicker } from "@ark-ui/solid";
import { For } from "solid-js";
import { Portal } from "solid-js/web";
import { BsCalendar2Fill } from "solid-icons/bs";
import { twJoin } from "tailwind-merge";
import { RiArrowsArrowLeftSLine, RiArrowsArrowRightSLine } from "solid-icons/ri";
import IconButton from "@components/general/Button/IconButton";
import styles from "./index.module.scss";
import type { JSX } from "solid-js";

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
} = ArkDatePicker;

interface DatePickerProps {
  value: string;
  setValue: (value: string) => void;
}

const CustomViewControl = () => (
  <ViewControl class="flex justify-between gap-2">
    <PrevTrigger>
      <IconButton as="div">
        <RiArrowsArrowLeftSLine size="24" />
      </IconButton>
    </PrevTrigger>
    <ViewTrigger>
      <RangeText class="rounded-lg px-5 py-2 font-semibold text-neutral-text hover:bg-neutral-fill-secondary" />
    </ViewTrigger>
    <NextTrigger>
      <IconButton as="div">
        <RiArrowsArrowRightSLine size="24" />
      </IconButton>
    </NextTrigger>
  </ViewControl>
);

const StyledTableCellTrigger = (props: { children: JSX.Element; class: string }) => {
  return (
    <TableCellTrigger
      class={twJoin(
        props.class,
        "h-10 rounded-md hover:bg-neutral-fill-secondary data-[disabled]:cursor-not-allowed data-[selected]:bg-primary/90 data-[selected]:text-primary-content data-[disabled]:opacity-30 data-[disabled]:hover:bg-transparent",
      )}
    >
      {props.children}
    </TableCellTrigger>
  );
};

const StyledView: typeof View = props => (
  <View view={props.view} class="flex flex-col gap-3 [&[hidden]]:!hidden">
    {props.children}
  </View>
);

export const DatePicker = (props: DatePickerProps) => {
  return (
    <Root class="inline-flex" value={[props.value]} onValueChange={details => props.setValue(details.valueAsString[0])}>
      <Control>
        <Trigger class="flex size-10 items-center justify-center rounded-md border border-solid border-neutral-border bg-neutral-bg-container text-neutral-text-tertiary transition-all hover:border-primary-hover hover:text-primary focus:border-primary focus:ring-primary-border">
          <BsCalendar2Fill />
        </Trigger>
      </Control>
      <Portal>
        <Positioner>
          <Content class={`${styles.dropdown} w-[344px] gap-3 rounded-md bg-neutral-bg-elevated p-4 shadow-elevated`}>
            <StyledView view="day">
              {api => (
                <>
                  <CustomViewControl />
                  <Table>
                    <TableHead>
                      <TableRow>
                        <For each={api().weekDays}>{weekDay => <TableHeader class="size-10">{weekDay.narrow}</TableHeader>}</For>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <For each={api().weeks}>
                        {week => (
                          <TableRow>
                            <For each={week}>
                              {day => (
                                <TableCell value={day}>
                                  <StyledTableCellTrigger class="w-10">{day.day}</StyledTableCellTrigger>
                                </TableCell>
                              )}
                            </For>
                          </TableRow>
                        )}
                      </For>
                    </TableBody>
                  </Table>
                </>
              )}
            </StyledView>
            <StyledView view="month">
              {api => (
                <>
                  <CustomViewControl />
                  <Table>
                    <TableBody>
                      <For each={api().getMonthsGrid({ columns: 4, format: "short" })}>
                        {months => (
                          <TableRow>
                            <For each={months}>
                              {month => (
                                <TableCell value={month.value}>
                                  <StyledTableCellTrigger class="w-[72px]">{month.label}</StyledTableCellTrigger>
                                </TableCell>
                              )}
                            </For>
                          </TableRow>
                        )}
                      </For>
                    </TableBody>
                  </Table>
                </>
              )}
            </StyledView>
            <StyledView view="year">
              {api => (
                <>
                  <CustomViewControl />
                  <Table>
                    <TableBody>
                      <For each={api().getYearsGrid({ columns: 4 })}>
                        {years => (
                          <TableRow>
                            <For each={years}>
                              {year => (
                                <TableCell value={year.value}>
                                  <StyledTableCellTrigger class="w-[72px]">{year.label}</StyledTableCellTrigger>
                                </TableCell>
                              )}
                            </For>
                          </TableRow>
                        )}
                      </For>
                    </TableBody>
                  </Table>
                </>
              )}
            </StyledView>
          </Content>
        </Positioner>
      </Portal>
    </Root>
  );
};
