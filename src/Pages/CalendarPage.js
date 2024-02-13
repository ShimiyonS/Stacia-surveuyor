import React, { useContext, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../Styles/Task/CreateBoard.css";
import { PageContext } from "../Context/PageContext";
import "../Styles/Calendar/CalendarPage.css";
import MiniCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarPage = () => {
  const localizer = momentLocalizer(moment);
  const { pageName } = useContext(PageContext);

  const [events, setEvents] = useState([
    {
      title: "Meeting with Client",
      start: new Date(2023, 11, 1, 10, 0),
      end: new Date(2023, 11, 1, 12, 0),
    },
    {
      title: "Team Standup",
      start: new Date(2023, 11, 2, 15, 0),
      end: new Date(2023, 11, 2, 16, 0),
    },
    {
      title: "Project Deadline",
      start: new Date(2023, 11, 5, 12, 0),
      end: new Date(2023, 11, 5, 17, 0),
    },
  ]);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt("Enter the event title:");
    if (title) {
      const newEvent = {
        title,
        start,
        end,
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
  };

  return (
    <div className="calendar-page">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 900, width: "80%", backgroundColor: "#fff" }}
        selectable
        onSelectSlot={handleSelect}
      />
      <div className="mini-calendar">
        <MiniCalendar />
      </div>
    </div>
  );
};

export default CalendarPage;
