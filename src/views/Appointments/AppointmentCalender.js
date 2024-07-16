import { useCalendarApp, Calendar } from '@schedule-x/react'
import {
  viewWeek,
  viewDay,
  viewMonthGrid,
  viewMonthAgenda,
} from '@schedule-x/calendar'
import { createEventModalPlugin } from '@schedule-x/event-modal' 
import './Calender.css'

 
function AppointmentCalender() {
  const calendar = useCalendarApp({
    defaultView: viewMonthGrid.name,
    views: [viewDay, viewWeek, viewMonthGrid, viewMonthAgenda],
    plugins: [createEventModalPlugin()],
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: '2024-07-16 10:05',
        end: '2024-07-16 10:10',
      },
      {
        id: '2',
        title: 'Event 2',
        start: '2024-07-16 10:05',
        end: '2024-07-16 10:20',
      },
      {
        id: '3',
        title: 'Event 3',
        start: '2024-07-16 10:05',
        end: '2024-07-16 10:20',
      },
      {
        id: '4',
        title: 'Event 3',
        start: '2024-07-16 10:05',
        end: '2024-07-16 14:20',
      },
    ],
  })
 
  return (
    <div>
      <Calendar
        calendarApp={calendar}
      />
    </div>
  )
}
 
export default AppointmentCalender