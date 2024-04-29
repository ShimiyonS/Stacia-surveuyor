import React, { useContext, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../Styles/Task/CreateBoard.css";
import { PageContext } from "../Context/PageContext";
import "../Styles/Calendar/CalendarPage.css";
import MiniCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CalendarView from "../Components/CalendarView";
import CustomToolbar1 from "../Components/Calendar/CustomToolbar1";
import styled from "styled-components";
import TaskActivity from "../Components/TaskList/TaskActivity";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import Modal from "react-modal";

const eventStyleGetter = (event, start, end, isSelected, colorEvento) => {
  const style = {
    backgroundColor: isSelected ? "lightblue" : event.colorEvento,
    borderRadius: "5px",
    border: "none",
    color: event.color,
    display: "block",
  };
  return {
    style: style,
  };
};

// modal styles

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "30%",
    height: "80%",
    borderRadius: "16px",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.25)",
    zIndex: "999",
  },
};

const EventComponent = ({ event }) => (
  <div
    style={{
      marginBottom: "1rem",
    }}
  >
    <strong>{event.title}</strong>
    <div>
      <strong>Due:</strong> {moment(event.end).format("DD-MM-YYYY")}
    </div>
  </div>
);

// HH:mm

const CustomAgendaView = ({ events }) => {
  return (
    <div>
      <h2>Custom Agenda View</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.title}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

console.log("renders!!!");

const CalendarPage1 = () => {
  const localizer = momentLocalizer(moment);
  const { pageName } = useContext(PageContext);

  const [events, setEvents] = useState([
    {
      title: "Meeting with Client",
      description:
        "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
      start: new Date(2024, 2, 1, 10, 0),
      end: new Date(2024, 2, 1, 12, 0),
      colorEvento: "rgba(216, 26, 96, 0.1)",
      color: "rgba(216, 26, 96, 1)",
    },
    {
      title: "Team Standup",
      description:
        "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
      start: new Date(2024, 2, 2, 15, 0),
      end: new Date(2024, 2, 2, 16, 0),
      colorEvento: "rgba(0, 128, 128, 0.1)",
      color: "rgba(0, 128, 128, 1)",
    },
    {
      title: "Project Deadline",
      description:
        "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
      start: new Date(2024, 2, 5, 12, 0),
      end: new Date(2024, 2, 5, 17, 0),
      colorEvento: "rgba(108, 117, 220, 0.1)",
      color: "rgba(108, 117, 220, 1)",
    },
    {
      title: "Project Deadline",
      description:
        "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
      start: new Date(2024, 2, 5, 17, 30),
      end: new Date(2024, 2, 5, 19, 0),
      colorEvento: "rgba(108, 117, 220, 0.1)",
      color: "rgba(108, 117, 220, 1)",
    },
  ]);
  const [modal1, setModal1] = useState(false);

  // event states

  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");
  const [bg, setBg] = useState("");

  const openModal = () => {
    setModal1(true);
  };

  const closeModal = () => {
    setModal1(false);
  };

  const handleSelect1 = ({ start, end }) => {
    // setModal(true);
    // const title = window.prompt("Enter the event title:");
    // const colorEvento = window.prompt("Enter bg color");
    // const color = window.prompt("Enter bg color");

    // if (title) {
    //   const newEvent = {
    //     title,
    //     colorEvento,
    //     color,
    //     start,
    //     end,
    //   };
    //   setEvents((prevEvents) => [...prevEvents, newEvent]);
    // }
  };

  const formats1 = {
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

  const CustomDayHeader1 = ({ date }) => {
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

  const CalendarPageContainer = styled.div`
    width: calc(100% - 4.2rem);
    max-height: calc(100vh - 4rem);
    height: calc(100vh - 4rem);
    margin-left: 4.2rem;
    background-color: rgba(239, 242, 244, 1);
    padding: 1rem;
    display: flex;
  `;

  return (
    <CalendarPageContainer>
      <Calendar
        style={{
          height: "100%",
          width: "80%",
          backgroundColor: "#fff",
        }}
        events={events}
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        formats={formats1}
        views={["month", "work_week", "week", "day", "agenda"]}
        defaultView="month"
        selectable
        onSelectSlot={openModal}
        components={{
          toolbar: CustomToolbar1,
          week: {
            header: CustomDayHeader1,
          },
          work_week: {
            header: CustomDayHeader1,
          },
          event: EventComponent,
        }}
        eventPropGetter={(events) => {
          const backgroundColor = events.colorEvento
            ? events.colorEvento
            : "yellow";
          const color = events.color ? events.color : "purple";
          const borderLeft = `4px solid ${events.color}`;
          const border = `1px solid ${events.colorEvento}`;
          return { style: { backgroundColor, color, borderLeft } };
        }}
        // eventPropGetter={eventStyleGetter}
      />
      <div
        style={{
          backgroundColor: "palegoldenrod",
          width: "20%",
          height: "100%",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar />
        </LocalizationProvider>

        <TaskActivity />
      </div>

      <Modal
        isOpen={modal1}
        onAfterOpen={openModal}
        onAfterClose={closeModal}
        style={customStyles}
      >
        <div>
          title: <input type="text" 
          onChange={(e) => setTitle(e.target.value)}
          />
          {/* {console.log(title)} */}
        </div>
      </Modal>
    </CalendarPageContainer>
  );
};

export default CalendarPage1;
