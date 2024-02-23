import dayjs, { Dayjs } from "dayjs";
import MonthCalendar from "./MonthCalendar";
import Header from "./Header";
import "./index.scss";
import { CSSProperties, ReactNode, useState } from "react";
import cs from "classnames";
import LocaleContext from "./LocaleContext";

export interface CalendarProps {
  value: Dayjs;
  style?: CSSProperties;
  className?: string | string[];
  /** 自定义渲染日期单元格 */
  dateRender?: (currentDate: Dayjs) => ReactNode;
  /** 自定义渲染日期单元格内容（待办等） */
  dateInnerContent?: (currentDate: Dayjs) => ReactNode;
  /** 国际化 */
  locale?: string;
  onChange?: (date: Dayjs) => void;
}

function Calendar(props: CalendarProps) {
  const { value, style, className, locale, onChange } = props;
  const classNames = cs("calendar", className);

  const [curValue, setCurValue] = useState<Dayjs>(value);
  const [curMonth, setCurMonth] = useState<Dayjs>(value);

  function selectHandler(date: Dayjs) {
    setCurValue(date);
    setCurMonth(date);
    onChange?.(date);
  }
  function prevMonthHandler() {
    setCurMonth(curMonth.subtract(1, "month"));
  }
  function nextMonthHandler() {
    setCurMonth(curMonth.add(1, "month"));
  }
  function todayHandler() {
    const date = dayjs();

    selectHandler(date);
  }

  return (
    <LocaleContext.Provider
      value={{
        locale: locale || navigator.language,
      }}
    >
      <div className={classNames} style={style}>
        <Header
          curMonth={curMonth}
          prevMonthHandler={prevMonthHandler}
          nextMonthHandler={nextMonthHandler}
          todayHandler={todayHandler}
        ></Header>
        <MonthCalendar
          {...props}
          value={curValue}
          curMonth={curMonth}
          selectHandler={selectHandler}
        ></MonthCalendar>
      </div>
    </LocaleContext.Provider>
  );
}

export default Calendar;
