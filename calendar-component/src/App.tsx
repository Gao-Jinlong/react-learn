import "./App.css";
import Calendar from "./Calendar";
import dayjs from "dayjs";

function App() {
  return (
    <div className="App">
      <Calendar
        value={dayjs("2024-02-21")}
        locale="en-US"
        // dateRender={(value) => {
        //   return (
        //     <div>
        //       <p style={{ background: "yellowgreen", height: "50px" }}>
        //         {value.format("YYYY/MM/DD")}
        //       </p>
        //     </div>
        //   );
        // }}
        // dateInnerContent={(value) => {
        //   return (
        //     <div>
        //       <p style={{ background: "yellowgreen", height: "30px" }}>
        //         {value.format("YYYY/MM/DD")}
        //       </p>
        //     </div>
        //   );
        // }}
        onChange={(date) => {
          console.log(date.format("YYYY-MM-DD"));
        }}
      ></Calendar>

      <Calendar
        value={dayjs("2024-02-21")}
        locale="zh-CN"
        // dateRender={(value) => {
        //   return (
        //     <div>
        //       <p style={{ background: "yellowgreen", height: "50px" }}>
        //         {value.format("YYYY/MM/DD")}
        //       </p>
        //     </div>
        //   );
        // }}
        // dateInnerContent={(value) => {
        //   return (
        //     <div>
        //       <p style={{ background: "yellowgreen", height: "30px" }}>
        //         {value.format("YYYY/MM/DD")}
        //       </p>
        //     </div>
        //   );
        // }}
        onChange={(date) => {
          console.log(date.format("YYYY-MM-DD"));
        }}
      ></Calendar>
    </div>
  );
}

export default App;
