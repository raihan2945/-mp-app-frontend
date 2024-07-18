import React from "react";
import dayjs from "dayjs";
import { GoDotFill } from "react-icons/go";
import { FaRegClock, FaRegBuilding } from "react-icons/fa";

const EventModalDetails = ({ eventData }) => {
  return (
    <div className="event-modal-details">
      <div className="modal-cells">
        <div className="icon square"></div>
        <div className="cell">
          <h4>{eventData.full_name}</h4>
          <h5>
            {eventData.designation}
            {eventData.designation && <GoDotFill size={7} />}
            {eventData.mobile}
          </h5>
        </div>
      </div>

      <div className="modal-cells">
        <div>
          <FaRegClock size={18} />
        </div>
        <div className="cell">
          <h5>
            {dayjs(eventData.start).format("dddd, MMMM DD")}
            {eventData.end != null && (
              <>
                <GoDotFill size={7} />
                {dayjs(eventData.start).format("h:mm")}
                <span>-</span>
                {dayjs(eventData.end).format("h:mm a")}
              </>
            )}
          </h5>
        </div>
      </div>

      {/* company info */}
      {eventData.company_name && (
        <div className="modal-cells">
          <div>
            <FaRegBuilding size={18} />
          </div>
          <div className="cell">
            <p>
              {eventData.company_name}
              {eventData.company_location && (
                <span>, {eventData.company_location}</span>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventModalDetails;
