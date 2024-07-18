import { useSearchParams } from "react-router-dom";
import { weekdays } from "../../utils/data";
import { useGetAllAppointmentQuery } from "../../redux/features/appointment/appointmentApi";
import dayjs from "dayjs";
import { dateFormatter } from "../../utils/format";
import { Popover, Modal } from "antd";
import { useState } from "react";
import EventModalDetails from "./EventModalDetails";

const Scheduler = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [event, setEvent] = useState();

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
                  {/* show event along with date */}
                  {/* if event > 3 ->
                    then show 2 and MORE option
                    else show all
                  */}

                  {data &&
                  data.data.filter((event) => {
                    return dateFormatter(event.start) == dateFormatter(item);
                  }).length > 3
                    ? data.data
                        .filter((event) => {
                          return (
                            dateFormatter(event.start) == dateFormatter(item)
                          );
                        })
                        .slice(0, 2)
                        .map((data) => (
                          <div
                            className="event"
                            key={data.id}
                            onClick={() => setEvent(data)}
                          >
                            {data.full_name}
                          </div>
                        ))
                    : data.data
                        .filter((event) => {
                          return (
                            dateFormatter(event.start) == dateFormatter(item)
                          );
                        })
                        .map((data) => (
                          <div
                            className="event"
                            key={data.id}
                            onClick={() => setEvent(data)}
                          >
                            {data.full_name}
                          </div>
                        ))}

                  {/* more event message */}
                  {data &&
                    data.data.filter((event) => {
                      return dateFormatter(event.start) == dateFormatter(item);
                    }).length > 3 && (
                      // to show more event in popover

                      <Popover
                        content={
                          <div className="event-popover">
                            <h4>{dayjs(item).format("ddd").toUpperCase()}</h4>
                            <h3>{dayjs(item).format("DD")}</h3>
                            <div className="events">
                              {data.data
                                .filter((event) => {
                                  return (
                                    dateFormatter(event.start) ==
                                    dateFormatter(item)
                                  );
                                })
                                .map((data) => (
                                  <div
                                    className="event"
                                    key={data.id}
                                    onClick={() => {
                                      setEvent(data);
                                    }}
                                  >
                                    {data.full_name}
                                  </div>
                                ))}
                            </div>
                          </div>
                        }
                        trigger={"click"}
                      >
                        <div className="event-more">
                          {data.data.filter((event) => {
                            return (
                              dateFormatter(event.start) == dateFormatter(item)
                            );
                          }).length - 2}{" "}
                          more
                        </div>
                      </Popover>
                    )}
                </div>
              </div>
            ) : (
              <div className="calender-cell disabled" key={idx}></div>
            ),
          )}
        </div>
      </div>

      {/* event details modal */}
      <Modal
        open={event}
        onCancel={() => {
          setEvent("");
        }}
        centered
        footer={false}
      >
        <EventModalDetails eventData={event} />
      </Modal>
    </>
  );
};

export default Scheduler;
