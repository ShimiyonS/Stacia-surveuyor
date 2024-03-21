import React, { useContext, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import CustomToolbar from "./Calendar/CustomToolbar";
import MiniCalendar from "react-calendar";
import TaskActivity from "./TaskList/TaskActivity";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PageContext } from "../Context/PageContext";

const localizer = momentLocalizer(moment);

const events1 = [
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
    start: new Date(2024, 1, 29, 14, 30),
    end: new Date(2024, 1, 29, 16, 0),
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
          fontFamily: "EuclidSemibold",
        }}  
      >
        {formattedWeekName}
      </div>
      <div
        style={{
          zIndex: "2",
          color: "#1B2436",
          fontSize: "1rem",
          fontFamily: "EuclidSemibold",
        }}
      >
        {formattedDate}
      </div>
    </div>
  );
};

const CalendarView = () => {
  const [value, setValue] = useState(new Date());
  const [events, setEvents] = useState([]);
  const { calendarExpand, setCalendarExpand } = useContext(PageContext);

  // timeGutterFormat: (date, culture, localizer) =>
  // localizer.format(date, "h A", culture),

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

  const formats = {
    dayFormat: (date, culture, localizer) => {
      return localizer.format(date, "D dddd", culture);
    },
    weekdayFormat: (day, culture, localizer) => {
      return localizer.format(day, "dddd", culture);
    },
    timeGutterFormat: (date, culture, localizer) => {
      return localizer.format(date, "h A", culture);
    },
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        marginTop: "1rem",
        padding: "0rem 1.2rem",
        maxHeight: "calc(90vh - 4rem)", 
        height: "calc(90vh - 4rem)",
        // backgroundColor: "rebeccapurple",
      }}
    >
      <Calendar
        localizer={localizer}
        events={events1}
        startAccessor="start"
        endAccessor="end"
        formats={formats}
        selectable
        onSelectSlot={handleSelect}
        // formats={{
        //   weekdayFormat: (date, culture, localizer) => {
        //     return localizer.format(date, "dddd", culture);
        //   },

        // }}
        style={{
          height: "100%",
          width: calendarExpand ? "80%" : "100%",
          // margin: "0 auto",
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
            header: CustomDayHeader,
          },
        }}
      />

      {calendarExpand && (
        <div
          style={{
            backgroundColor: "palegoldenrod",
            width: "20%",
            height: "100%"
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar />
          </LocalizationProvider>

          <TaskActivity />
        </div>
      )}
    </div>
  );
};

export default CalendarView;
{
  /* <MiniCalendar
          style={{
            width: "100%",
            backgroundColor: "pink",
          }}
          formatShortWeekday={(locale, date) =>
            date.toLocaleDateString(locale, { weekday: "short" }).charAt(0)
          }
        /> */
}
