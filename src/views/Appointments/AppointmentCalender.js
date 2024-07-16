import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import { createCalendarControlsPlugin } from "@schedule-x/calendar-controls";
import { createEventsServicePlugin } from '@schedule-x/events-service'
import {
  viewWeek,
  viewDay,
  viewMonthGrid,
  viewMonthAgenda,
} from "@schedule-x/calendar";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import "./Calender.css";

import dayjs from 'dayjs';
import { useGetAllAppointmentQuery } from "../../redux/features/appointment/appointmentApi";
import { useEffect } from "react";

// calender plugins
const calendarControls = createCalendarControlsPlugin();
const eventsServicePlugin = createEventsServicePlugin()

function AppointmentCalender() {
  const { data, error, isLoading } = useGetAllAppointmentQuery({
    search: "",
    start: "",
    end: "",
  });

  let event = []

  useEffect(() => {
    if (data) {
      data.data.map((item) => {
        event.push({
          id: item.id,
          title: item.full_name,
          start: item.end ? dayjs(item.start).format('YYYY-MM-DD HH:mm') : dayjs(item.start).format('YYYY-MM-DD'),
          end: item.end ? dayjs(item.end).format('YYYY-MM-DD HH:mm') : dayjs(item.start).format('YYYY-MM-DD'),
        });
      });
    }
    eventsServicePlugin.set(event)
  }, [isLoading]);

  const calendar = useCalendarApp({
    defaultView: viewMonthGrid.name,
    views: [viewDay, viewWeek, viewMonthGrid, viewMonthAgenda],
    plugins: [createEventModalPlugin(), calendarControls, eventsServicePlugin],
    events: event,
  });

  return (
    <div>
      {isLoading && event.length == 0 ? (
        <p>Loading...</p>
      ) : (
        <ScheduleXCalendar calendarApp={calendar} />
      )}
    </div>
  );
}

export default AppointmentCalender;
