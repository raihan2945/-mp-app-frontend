import React from "react";
import { FiClock } from "react-icons/fi";
import { TbClockX } from "react-icons/tb";
import dayjs from 'dayjs';

const AppointmentDetails = ({ data }) => {
  return (
    <>
      <div className="appointment-detail">
        {/* header */}
        <div className="header">
          <div>
            <h2>Applicant Information</h2>
            <h3>Personal details and application.</h3>
          </div>
          <div className="data-time-card">
            {/* start time */}
            <div className="date-time-card__content">
                <FiClock className="icon" />
                {dayjs(data?.start || data.created_at).format('hh:MM A | DD MMM, YY')}
            </div>

             {/* end time */}
             <div className="date-time-card__content">
                <TbClockX className="icon" />
                {dayjs(data?.end || data.created_at).format('hh:MM A | DD MMM, YY')}
            </div>
          </div>
        </div>

        {/* applicant info */}
        <article className="info-container">
          <div className="info-cell">
            <h4>Full Name</h4>
            <p>{data.full_name}</p>
          </div>
          <div className="info-cell">
            <h4>Designation</h4>
            <p>{data.designation}</p>
          </div>
          <div className="info-cell">
            <h4>Contact</h4>
            <p>{data.mobile}</p>
          </div>
          <div className="info-cell">
            <h4>Address</h4>
            <p>{data.address}</p>
          </div>
        </article>

        {/* company info */}
        <article className="info-container">
          <div className="info-cell">
            <h4>Company Name</h4>
            <p>{data.company_name}</p>
          </div>
          <div className="info-cell">
            <h4>Company Location</h4>
            <p>{data.company_location}</p>
          </div>
        </article>

        {/* additional info */}
        <article className="info-container">
          <div className="info-cell">
            <h4>Reference</h4>
            <p>{data.reference}</p>
          </div>
          <div className="info-cell">
            <h4>Note</h4>
            <p>{data.note}</p>
          </div>
        </article>
      </div>
    </>
  );
};

export default AppointmentDetails;
