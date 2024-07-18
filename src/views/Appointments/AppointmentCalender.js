import React from "react";
import CalenderHeader from "./CalenderHeader";
import Scheduler from "./Scheduler";
import { useSearchParams } from "react-router-dom";

const AppointmentCalender = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      {/* calender header */}
      <CalenderHeader />
      {searchParams.get("v") == "d" ? <p>Day</p> : <Scheduler />}
    </>
  );
};

export default AppointmentCalender;
