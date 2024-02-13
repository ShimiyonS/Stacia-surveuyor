// import React, { useContext, useState } from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import "../Styles/Task/CreateBoard.css"
// import { PageContext } from '../Context/PageContext';

// const CalendarView = () => {
//   const localizer = momentLocalizer(moment);

//   const { pageName } = useContext(PageContext);

//   const [events, setEvents] = useState([
//     {
//       title: 'Meeting with Client',
//       start: new Date(2023, 11, 1, 10, 0),
//       end: new Date(2023, 11, 1, 12, 0),
//     },
//     {
//       title: 'Team Standup',
//       start: new Date(2023, 11, 2, 15, 0),
//       end: new Date(2023, 11, 2, 16, 0),
//     },
//     {
//       title: 'Project Deadline',
//       start: new Date(2023, 11, 5, 12, 0),
//       end: new Date(2023, 11, 5, 17, 0),
//     },
//   ]);

//   const handleSelect = ({ start, end }) => {
//     const title = window.prompt('Enter the event title:');
//     if (title) {
//       const newEvent = {
//         title,
//         start,
//         end,
//       };
//       setEvents((prevEvents) => [...prevEvents, newEvent]);
//     }
//   };

//   return (
//     <div>
//       <Calendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: 800, width: '80%' }}
//         selectable
//         onSelectSlot={handleSelect}
//       />
//     </div>
//   );
// };

// export default CalendarView;

import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import CustomToolbar from "./Calendar/CustomToolbar";
import MiniCalendar from "react-calendar";
import TaskActivity from "./TaskList/TaskActivity";

const localizer = momentLocalizer(moment);

const events = [
  {
    title: "Client meet",
    start: new Date(2023, 11, 28, 10, 0), // dec 28, 2023, 10:00 AM
    end: new Date(2023, 11, 28, 13, 30), // dec 28, 2023, 1:30 PM
  },
  {
    title: "Designers meet",
    start: new Date(2023, 11, 29, 14, 30),
    end: new Date(2023, 11, 29, 16, 0),
  },
  {
    title: "Designers meet",
    start: new Date(2024, 0, 12, 14, 30),
    end: new Date(2024, 0, 12, 16, 0),
  },
];

const CustomDayHeader = ({ date }) => {
  const formattedDate = moment(date).format("dddd");
  const formattedWeekName = moment(date).format("D");

  return (
    <div  
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        margin: "1rem 0.5rem",
      }}
    >
      <div
        style={{
          fontSize: "2rem",
          color: "#1B2436",
          opacity: "0.9",
          fontFamily: "EuclidSemibold"
        }}
      >
        {formattedWeekName}
      </div>
      <div
        style={{
          zIndex: "2",
          color: "#1B2436",
          fontSize: "1rem",
          fontFamily: "EuclidSemibold"
        }}
      >
        {formattedDate}
      </div>
    </div>
  );
};

const CalendarView = () => {
  const [value, setValue] = useState(new Date());

  // timeGutterFormat: (date, culture, localizer) =>
  // localizer.format(date, "h A", culture),

  const formats = {
    dayFormat: (date, culture, localizer) => {
      return localizer.format(date, 'D dddd', culture);
    },
    weekdayFormat: (day, culture, localizer) => {
      return localizer.format(day, 'dddd', culture); 
    },
    timeGutterFormat: (date, culture, localizer) => {
      return localizer.format(date, "h A", culture);
    }
  };

  return (
    <div style={{ width: "97%", display: "flex", margin: "1rem auto" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        formats={formats}
        // formats={{
        //   weekdayFormat: (date, culture, localizer) => {
        //     return localizer.format(date, "dddd", culture);
        //   },   
         
        // }}
        style={{
          height: 850,
          width: "97%",
          margin: "0 auto",
          backgroundColor: "#fff",
        }}
        views={["month", "work_week", "week"]}
        // view="work-week"
        defaultView="month"
        components={{
          toolbar: CustomToolbar,
          week: {
            header: CustomDayHeader,
          },
          work_week: {
            header: CustomDayHeader
          }
        }}
      />

      <div className="mini-calendar">
        <MiniCalendar
          formatShortWeekday={(locale, date) =>
            date.toLocaleDateString(locale, { weekday: "short" }).charAt(0)
          }
        />
        <TaskActivity />
      </div>
    </div>
  );
};

export default CalendarView;
