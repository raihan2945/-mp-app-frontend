import { useSearchParams } from "react-router-dom";
import { weekdays } from "../../utils/data";
import { useGetAllAppointmentQuery } from "../../redux/features/appointment/appointmentApi";
import dayjs from "dayjs";
import { dateFormatter } from "../../utils/format";
import { Popover, Modal } from "antd";
import { useEffect, useState } from "react";
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

  let eventDay = [];
  for (let i = 1; i <= totalDays; i++) {
    eventDay.push({
      date: new Date(`${now.getFullYear()}-${now.getMonth() + 1}-${i}`),
      events: [],
    });
  }

  if (data && eventDay.length > 0) {
    for (let i = 0; i < eventDay.length; i++) {
      for (let j = 0; j < data.data.length; j++) {
        if (
          dateFormatter(data.data[j].start) == dateFormatter(eventDay[i].date)
        ) {
          eventDay[i].events.push(data.data[j]);
        }
      }
    }
  }

  if (eventDay.length > 0) {
    let day = eventDay[0].date.getDay();
    let lastDay = eventDay[eventDay.length - 1].date.getDay();
    for (let i = 0; i < day; i++) {
      eventDay.unshift({
        date: new Date(now.getFullYear(), now.getMonth(), -i),
        events: [],
      });
    }

    for (let i = 1; i < 7 - lastDay; i++) {
      eventDay.push({
        date: new Date(now.getFullYear(), now.getMonth() + 1, i),
        events: [],
      });
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
          {eventDay.length > 0 &&
            eventDay.map((item, idx) =>
              item != "" ? (
                <div className="calender-cell" key={idx}>
                  <div
                    className={`date ${
                      dayjs(item.date).format("YYYY-MM-DD") ==
                        dayjs(new Date()).format("YYYY-MM-DD") && "selected"
                    }
                  ${
                    dayjs(item.date).format("YYYY-MM") !==
                      dayjs(now).format("YYYY-MM") && "disabled"
                  }
                  `}
                  >
                    {item.date.getDate()}
                  </div>
                  <div className="events">
                    {/* show event along with date */}
                    {/* if event > 3 ->
                    then show 2 and MORE option
                    else show all
                  */}

                    {item.events.length > 3
                      ? item.events.slice(0, 2).map((e) => (
                          <div
                            className="event"
                            key={e.id}
                            onClick={() => setEvent(e)}
                          >
                            {e.full_name}
                          </div>
                        ))
                      : item.events.map((e) => (
                          <div
                            className="event"
                            key={e.id}
                            onClick={() => setEvent(e)}
                          >
                            {e.full_name}
                          </div>
                        ))}

                    {/* more event message */}
                    {item.events.length > 3 && (
                        // to show more event in popover

                        <Popover
                          content={
                            <div className="event-popover">
                              <h4>
                                {dayjs(item.date).format("ddd").toUpperCase()}
                              </h4>
                              <h3>{dayjs(item.date).format("DD")}</h3>
                              <div className="events">
                                {data.data
                                  .filter((event) => {
                                    return (
                                      dateFormatter(event.start) ==
                                      dateFormatter(item.date)
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
                                dateFormatter(event.start) ==
                                dateFormatter(item.date)
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
