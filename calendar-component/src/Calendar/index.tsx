import { Dayjs } from "dayjs";
import MonthCalendar from "./MonthCalendar";
import Header from "./Header";
import "./index.scss";

export interface CalendarProps {
  value: Dayjs;
}

function Calendar(props: CalendarProps) {
  return (
    <div className="calendar">
      <Header></Header>
      <MonthCalendar {...props}></MonthCalendar>
    </div>
  );
}

export default Calendar;
