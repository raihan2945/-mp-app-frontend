import { useSearchParams } from "react-router-dom";
import { weekdays } from "../../utils/data";
import { useEffect, useState } from "react";

const Scheduler = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  let now = new Date(searchParams.get("m")) || new Date();
  const totalDays = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
  ).getDate();

  let dayList = [];

  useEffect(() => {
    now = new Date(searchParams.get("m"));
  }, [searchParams]);

  for (let i = 1; i <= totalDays; i++) {
    dayList.push(new Date(`${now.getFullYear()}-${now.getMonth() + 1}-${i}`));
  }

  if (dayList[0] !== "") {
    let day = dayList[0].getDay();
    for (let i = 0; i < day; i++) {
      dayList.unshift("");
    }
  }

  return (
    <>
      <div className="scheduler">
        {/* weekdays */}
        <div className="calender-cells weekday">
          {weekdays.map((item, idx) => (
            <div key={idx}>{item}</div>
          ))}
        </div>

        {/* days */}
        <div className="calender-cells">
          {dayList.map((item, idx) =>
            item != "" ? (
              <div className="calender-cell" key={idx}>
                {item.getDate()}
              </div>
            ) : (
              <div className="calender-cell disabled" key={idx}></div>
            ),
          )}
        </div>
      </div>
    </>
  );
};

export default Scheduler;
