import React, { useState } from "react";
import { weekdays } from "../../utils/data";

const Scheduler = () => {

  const [month, setMonth] = useState(new Date())

  const totalDays = new Date(
    `${new Date().getFullYear()}-${new Date().getMonth() + 2}-0`,
  ).getDate();

  const dayList = [];

  Array.from({ length: totalDays }, (_, i) => i + 1).map((item) => {
    dayList.push(
      new Date(
        `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${item}`,
      ),
    );
  });

  if( dayList[0] !== '') {
    let day = dayList[0].getDay()
    for(let i=0; i < day; i++) {
      dayList.unshift('')
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
          {dayList.map((item, idx) => (
            item !== '' ? 
            <div className="calender-cell">{item.getDate()}</div> :
            <div className="calender-cell"></div>
          ))}
        </div>
        
      </div>
    </>
  );
};

export default Scheduler;
