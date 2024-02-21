import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import "./index.css";

const monthNames = [
  "一月",
  "二月",
  "三月",
  "四月",
  "五月",
  "六月",
  "七月",
  "八月",
  "九月",
  "十月",
  "十一月",
  "十二月",
];

interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
}
interface CalendarRef {
  getDate: () => Date;
  setDate: (date: Date) => void;
}
const Calendar: React.ForwardRefRenderFunction<CalendarRef, CalendarProps> = (
  props,
  ref
) => {
  const { value = new Date(), onChange } = props;

  const [date, setDate] = useState(value);

  const handlePreMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };
  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  const daysOfMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  const firstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  const renderDays = () => {
    const days = [];

    const daysCount = daysOfMonth(date.getFullYear(), date.getMonth());
    const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth());

    const lastMonthDaysCount = daysOfMonth(
      date.getMonth() === 0 ? date.getFullYear() - 1 : date.getFullYear(),
      date.getMonth() === 0 ? 11 : date.getMonth() - 1
    );

    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`last-${i}`} className="day disabled">
          {lastMonthDaysCount - firstDay + i + 1}
        </div>
      );
    }

    for (let i = 1; i <= daysCount; i++) {
      const clickHandler = onChange?.bind(
        null,
        new Date(date.getFullYear(), date.getMonth(), i)
      );

      if (i === date.getDate()) {
        days.push(
          <div key={i} className="day selected" onClick={clickHandler}>
            {i}
          </div>
        );
      } else {
        days.push(
          <div key={i} className="day" onClick={clickHandler}>
            {i}
          </div>
        );
      }
    }

    for (let i = 1; i <= 35 - daysCount - firstDay; i++) {
      days.push(
        <div key={`next-${i}`} className="day disabled">
          {i}
        </div>
      );
    }

    return days;
  };

  useImperativeHandle(ref, () => {
    return {
      getDate() {
        return date;
      },
      setDate(date: Date) {
        setDate(date);
      },
    };
  });

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={handlePreMonth}>&lt;</button>
        <div>
          {date.getFullYear()}年{monthNames[date.getMonth()]}
        </div>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="days">
        <div className="day">日</div>
        <div className="day">一</div>
        <div className="day">二</div>
        <div className="day">三</div>
        <div className="day">四</div>
        <div className="day">五</div>
        <div className="day">六</div>
        {renderDays()}
      </div>
    </div>
  );
};
const WrappedCalendar = React.forwardRef(Calendar);

function App() {
  const calendarRef = useRef<CalendarRef>(null);

  useEffect(() => {
    console.log(calendarRef.current?.getDate().toLocaleDateString());

    setTimeout(() => {
      calendarRef.current?.setDate(new Date(2024, 3, 1));
    }, 3000);
  }, []);

  return (
    <div className="App">
      <WrappedCalendar
        value={new Date("2024-02-21")}
        onChange={(date: Date) => {
          console.log("onChange", date);
        }}
      />
      <WrappedCalendar
        ref={calendarRef}
        value={new Date("2023-08-07")}
        onChange={(date: Date) => {
          console.log("onChange", date);
        }}
      />
    </div>
  );
}

export default App;
