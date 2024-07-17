import { useSearchParams } from "react-router-dom";
import { weekdays } from "../../utils/data";
import { useEffect } from "react";
import { useGetAllAppointmentQuery } from "../../redux/features/appointment/appointmentApi";
import dayjs from "dayjs";
import { dateFormatter } from "../../utils/format";

const Scheduler = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  let now = searchParams.has("m")
    ? new Date(searchParams.get("m"))
    : new Date();

    // fetch data
  const { data, isLoading } = useGetAllAppointmentQuery({
    start: dayjs(new Date(now.getFullYear(), now.getMonth(), 0)).format(
      "YYYY-MM-DD",
    ),
    end: dayjs(new Date(now.getFullYear(), now.getMonth() + 1, 0)).format(
      "YYYY-MM-DD",
    ),
  });


  

  // calender date setup
  const totalDays = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
  ).getDate();
  
  let dayList = [];

  for (let i = 1; i <= totalDays; i++) {
    dayList.push(new Date(`${now.getFullYear()}-${now.getMonth() + 1}-${i}`));
  }

  if (dayList[0] !== "") {
    let day = dayList[0].getDay();
    for (let i = 0; i < day; i++) {
      dayList.unshift("");
    }
  }

  if (isLoading) return <p>Loading...</p>;

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
                <div className="date">{item.getDate()}</div>
                <div className="events">
                  {data &&
                    data.data
                      .filter((event) => {
                        return (
                          dateFormatter(event.start) == dateFormatter(item)
                        );
                      })
                      .map((data) => (
                        <div className="event" key={data.id}>
                          {data.full_name}
                        </div>
                      ))}
                </div>
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
