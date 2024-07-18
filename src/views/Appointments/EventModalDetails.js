import React from "react";
import dayjs from "dayjs";
import { GoDotFill } from "react-icons/go";
import { FaRegClock } from "react-icons/fa";



const EventModalDetails = ({ eventData }) => {
  return (
    <div className="event-modal-details">
      <div className="modal-cells">
        <div className="icon square"></div>
        <div className="cell">
          <h4>{eventData.full_name}</h4>
        </div>
      </div>


      <div className="modal-cells">
        <div><FaRegClock size={18} /></div>
        <div className="cell">
          <h5>
            {dayjs(eventData.start).format("dddd, MMMM DD")}
            <GoDotFill size={7} />
            {dayjs(eventData.start).format("h:mm")}
            <span>-</span>
            {eventData.end != null && dayjs(eventData.end).format("h:mm a")}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default EventModalDetails;
