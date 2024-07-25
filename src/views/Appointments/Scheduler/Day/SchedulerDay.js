import React from "react";
import CalenderHeader from "./CalenderHeader";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import { useGetAllAppointmentQuery } from "../../../../redux/features/appointment/appointmentApi";
import { MdOutlineEventBusy } from "react-icons/md";
import { FaRegBuilding } from "react-icons/fa";

const SchedulerDay = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  let now = searchParams.has("d")
    ? new Date(searchParams.get("d"))
    : new Date();

  // fetch data
  const { data, isLoading } = useGetAllAppointmentQuery({
    start: dayjs(
      new Date(now.getFullYear(), now.getMonth(), now.getDate()),
    ).format("YYYY-MM-DD"),
    end: dayjs(
      new Date(now.getFullYear(), now.getMonth(), now.getDate()),
    ).format("YYYY-MM-DD"),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <CalenderHeader />
      <div className="scheduler__date">
        <div
          className={`header ${
            searchParams.has("d")
              ? dayjs(searchParams.get("d")).format("DD MM YYYY") ===
                dayjs(new Date()).format("DD MM YYYY")
                ? "active"
                : null
              : "active"
          }`}
        >
          <h3>
            {searchParams.has("d")
              ? dayjs(searchParams.get("d")).format("ddd").toUpperCase()
              : dayjs(new Date()).format("ddd").toUpperCase()}
          </h3>
          <h2>
            {searchParams.has("d")
              ? dayjs(searchParams.get("d")).format("DD")
              : dayjs(new Date()).format("DD")}
          </h2>
        </div>

        {/* day's event container */}
        <div className="date-event">
          {data &&
            data.data.length > 0 &&
            data.data
              .filter((event) => {
                return event.end == null;
              })
              .map((item, index) => (
                <div className="container" key={index}>
                  <div className="container-cell time">
                    <p></p>
                    <p></p>
                  </div>
                  <div className="container-cell details">{item.full_name}</div>
                </div>
              ))}

          {data && data.data.length > 0 ? (
            data.data
              .filter((event) => {
                return event.end != null;
              })
              .map((item, index) => (
                <div className="container" key={index}>
                  <div className="container-cell time">
                    <p>{dayjs(item.start).format("hh:mm a").toUpperCase()}</p>
                    <p>{dayjs(item.end).format("hh:mm a").toUpperCase()}</p>
                  </div>
                  <div className="container-cell details">
                    <h2>{item.full_name}</h2>
                    {item.company_name && (
                      <div className="company-info">
                        <FaRegBuilding size={16} />
                        <div className="cell">
                          <p>
                            {item.company_name}
                            {item.company_location && (
                              <span>, {item.company_location}</span>
                            )}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
          ) : (
            <div className="no-event">
              <div className="icon">
                <MdOutlineEventBusy />
              </div>
              <p>No Events</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SchedulerDay;
