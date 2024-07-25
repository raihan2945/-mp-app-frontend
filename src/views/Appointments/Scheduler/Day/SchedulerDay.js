import React from "react";
import CalenderHeader from "./CalenderHeader";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";

const SchedulerDay = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <CalenderHeader />
      <div className="scheduler__date">
        <div className={`header ${searchParams.has('d') && dayjs(searchParams.get('d')).format('DD MM YYYY') === dayjs(new Date()).format('DD MM YYYY') ? 'active' : null}`}>
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
          <div className="container">
            <div className="container-cell time">
              <p>10:30 AM</p>
              <p>11:30 AM</p>
            </div>
            <div className="container-cell details">Jahidul</div>
          </div>

          <div className="container">
            <div className="container-cell time">
              <p>10:30 AM</p>
              <p>11:30 AM</p>
            </div>
            <div className="container-cell details">Jahidul</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SchedulerDay;
