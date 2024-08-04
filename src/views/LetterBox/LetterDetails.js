import React from "react";
import { FiClock } from "react-icons/fi";
import { TbClockX } from "react-icons/tb";
import dayjs from 'dayjs';
import { titleCase } from "../../utils/titleCase";

const LetterDetails = ({ data }) => {
  return (
    <>
      <div className="appointment-detail">
        {/* header */}
        <div className="header">
          <div>
            <h2>Application Information</h2>
            <h3>Personal details and application.</h3>
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
        </article>

        {/* company info */}
        <article className="info-container">
          <div className="info-cell">
            <h4>Company Name</h4>
            <p>{data.company_name}</p>
          </div>
        </article>

        {/* additional info */}
        <article className="info-container">
          <div className="info-cell">
            <h4>Type</h4>
            <p>{titleCase(data.category)}</p>
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

export default LetterDetails;
