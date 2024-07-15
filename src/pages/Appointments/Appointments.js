import "./Appointment.css";
import { Outlet } from "react-router-dom";

import AppointmentHeader from "../../views/Appointments/AppointmentHeader";


const Appointments = () => {

  return (
    <>
      {/* header */}
      <AppointmentHeader />

      <div className="data-table__container">
        <Outlet />
      </div>
    </>
  );
};

export default Appointments;
