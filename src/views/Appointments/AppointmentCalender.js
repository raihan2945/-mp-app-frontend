import React from "react";
import { useSearchParams } from "react-router-dom";
import SchedulerMonth from "./Scheduler/Month/SchedulerMonth";
import SchedulerDay from "./Scheduler/Day/SchedulerDay";

const AppointmentCalender = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      {searchParams.get("v") === "d" ? <SchedulerDay /> : <SchedulerMonth />}
    </>
  );
};

export default AppointmentCalender;
