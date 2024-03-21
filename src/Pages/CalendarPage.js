import React, { useContext, useState, useEffect, useRef } from "react";
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
import DatePicker from "react-mobile-datepicker";

import { MdOutlineGroup } from "react-icons/md";
import { FiClock } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { GrAttachment } from "react-icons/gr";
import { BsTextParagraph } from "react-icons/bs";
import { AiOutlineRight } from "react-icons/ai";
import { FaChevronLeft } from "react-icons/fa6";

import GuestZero from "../Assets/EventZeroState.png";

import IosToggle from "../Components/Calendar/IosToggle";

import { surveyorData } from "../data/SurveyorData";
import SurveyorTemplate from "../Components/TaskList/SurveyorTemplate";

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

const EventComponent = ({ event }) => (
  <div
    style={{
      marginBottom: "1rem",
    }}
  >
    <strong>{event.title}</strong>
    {/* <div>
      <strong>Due:</strong> {moment(event.end).format("DD-MM-YYYY")}
    </div> */}
  </div>
);

// custom tooltip for events

const CustomTooltip = ({ event }) => {
  console.log("tool-tip data", event);
  return (
    <div>
      <h4>{event.title}</h4>
      <p>hello world</p>
    </div>
  );
};

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

const CalendarPage = () => {
  const localizer = momentLocalizer(moment);
  const { pageName } = useContext(PageContext);

  // task due

  const { taskDuedate, taskname } = useContext(PageContext);

  const [events, setEvents] = useState([
    {
      title: "Meeting with Client",
      description:
        "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
      start: new Date(2024, 2, 6, 10, 0),
      end: new Date(2024, 2, 7, 12, 0),
      colorEvento: "rgba(216, 26, 96, 0.1)",
      color: "rgba(216, 26, 96, 1)",
    },
    {
      title: "summa oru event",
      description:
        "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
      start: new Date(2024, 2, 19, 0, 0),
      end: new Date(2024, 2, 19, 0, 0),
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

  const [modalWidth, setModalWidth] = useState(false);

  // event states

  const [title, setTitle] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [color, setColor] = useState("");
  const [bg, setBg] = useState("");

  // new events

  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventBg, setEventBg] = useState("");
  const [selectEvent, setSelectEvent] = useState("");
  const [notification, setNotification] = useState(false);
  const [hour, setHour] = useState(false);
  const [day, setDay] = useState(false);
  const [isOpenStartDate, setIsOpenStartDate] = useState(false);
  const [isOpenEndDate, setIsOpenEndDate] = useState(false);
  const [isOpenStartTime, setIsOpenStartTime] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [allDayEvent, setAllDayEvent] = useState(false);
  const [modeChange, setModeChange] = useState("Online");
  const [isPopBelowVisible, setPopBelowVisible] = useState(false);
  const [sortArr, setSortArr] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [testArr2, setTestArr2] = useState([]);
  const [openColors, setOpenColors] = useState(false);
  const [chooseEventColor, setChooseEventColor] = useState(
    "rgba(142, 0, 139, 0.2)"
  );
  const [chooseTextColor, setChooseTextColor] = useState(
    "rgba(142, 0, 139, 1)"
  );
  const testArr = [];

  // a-z arr
  const azArr = [];

  const onModeChange = (e) => {
    setModeChange(e.target.value);
  };

  // handle pop below
  const handlePopBelowToggle = () => {
    setPopBelowVisible(!isPopBelowVisible);
    console.log(isPopBelowVisible);
    console.log("hit");
  };

  const handleSort = (letter) => {
    setSelectedLetter(letter);
    const sortedData = surveyorData.filter(({ value }) => {
      return value === letter;
    });
    setSortArr(sortedData);
  };

  const handleToggle = (id) => {
    surveyorData.map(({ labelId, children }) => {
      if (labelId === id) {
        children.map(({ sid }) => testArr.push(sid));
      }
    });
    setTestArr2([...testArr2, testArr]);
    console.log("////////////////", testArr2, "///////////////");
    // if (selectedAllUsers.includes(id)) {
    //   setSelectedAllUsers(selectedAllUsers.filter((i) => i !== id));
    // } else {
    //   setSelectedAllUsers([...selectedAllUsers, id]);
    // }
  };

  // generate a-z letters

  for (let i = 97; i <= 122; i++) {
    azArr.push(String.fromCharCode(i));
  }

  useEffect(() => {
    handleSort("a");
  }, []);

  // handle surveyor select

  const handleWithoutAllselect = (id) => {
    console.log("id...", id);
    if (selectedUsers.includes(id)) {
      // setActiveSelectedSurveyors(false);
      setSelectedUsers(selectedUsers.filter((i) => i !== id));
    } else {
      // setActiveSelectedSurveyors(true);
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  ///////////////////////////////////////////////////////////////////////

  const handleSelectSlot = (slotInfo) => {
    console.log("slotInfo", slotInfo.start);
    setShowModal(true);
    setSelectedDate(slotInfo.start);
    console.log(selectedDate);
    setSelectEvent(null);
  };

  const handleSelectedEvent = (event) => {
    setShowModal(true);
    setSelectEvent(event);
    setEventTitle(event.title);
  };

  const handleSelectTime = (event) => {};

  const saveEvent = () => {
    console.log("is all day event", allDayEvent);
    if (eventTitle && selectedDate) {
      if (selectEvent) {
        const updateEvent = {
          ...selectEvent,
          title: eventTitle,
          end: endDate,
          colorEvento: chooseEventColor,
          color: chooseTextColor,
        };
        const updateEvents = events.map((event) =>
          event === selectEvent ? updateEvent : event
        );
        setEvents(updateEvents);
      } else {
        const start = moment(`${startDate}T${startTime}`).toDate();
        const end = moment(start).add(1, "hour").toDate();
        console.log("start.......,end........,", startDate, startTime);
        const newEvent = {
          title: eventTitle,
          colorEvento: chooseEventColor,
          color: chooseTextColor,
          // allDay: allDayEvent,
          start: new Date(selectedDate),
          end: new Date(endDate),
        };
        console.log("selected date is ", selectedDate);
        setEvents([...events, newEvent]);
        console.log(
          "new event details",
          "title:",
          eventTitle,
          "start:",
          startDate,
          "end:",
          startTime
        );
      }
      setShowModal(false);
      setEventTitle("");
      setSelectEvent(null);
    }
  };

  //////////////////////////////////////////////////////////

  const handleCancel = () => {
    setIsOpen(false);
  };

  // start date

  const handleTaskStartDate = (startDate) => {
    setStartDate(startDate);
    setIsOpenStartDate(false);
    console.log("start date", startDate);
  };

  const handleTaskStartTime = (startTime) => {
    setStartDate(startTime);
    setIsOpenStartTime(false);
    // moment(startTime).format("YYYY,M,DD,HH,mm");
    // console.log(moment(startTime).format("YYYY,M,DD,HH,mm"));
    console.log("start time", startTime);
  };

  // end date

  const handleTaskEndDate = (endDate) => {
    setEndDate(endDate);
    console.log("end date", endDate);
    setIsOpenEndDate(false);
  };

  const monthMap = {
    1: "01",
    2: "02",
    3: "03",
    4: "04",
    5: "05",
    6: "06",
    7: "07",
    8: "08",
    9: "09",
    10: "10",
    11: "11",
    12: "12",
  };

  const dateConfig = {
    date: {
      format: "DD",
      caption: "DD",
      step: 1,
    },
    month: {
      format: (value) => monthMap[value.getMonth() + 1],
      caption: "MM",
      step: 1,
    },
    year: {
      format: "YYYY",
      caption: "YYYY",
      step: 1,
    },
  };

  const timeConfig = {
    hour: {
      format: "hh",
      caption: "HH",
      step: 1,
    },
    minute: {
      format: "mm",
      caption: "MM",
      step: 1,
    },
  };

  //////////////////////////////////////////////////////////

  // modal styles

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: modalWidth ? "70%" : "30%",
      height: "90%",
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

  //////////////////////////////////////////////////////////////////////

  // const openModal = () => {
  //   setModal1(true);
  // };

  // const closeModal = () => {
  //   setModal1(false);
  // };

  // const handleSelect1 = ({ start, end }) => {
  //   // setModal1(true);
  //   // const title = window.prompt("Enter the event title:");
  //   // const colorEvento = window.prompt("Enter bg color");
  //   // const color = window.prompt("Enter bg color");

  //   // if (title) {
  //   //   const newEvent = {
  //   //     title,
  //   //     colorEvento,
  //   //     color,
  //   //     start,
  //   //     end,
  //   //   };
  //   //   setEvents((prevEvents) => [...prevEvents, newEvent]);
  //   // }

  //   setSelectedSlot({ start, end });
  //   setModal1(true);
  //   console.log("handleSelect1 fn triggered...");
  // };

  // const handleModalClose = () => {
  //   setModal1(false);
  //   setSelectedSlot(null);
  //   // setTitle("");
  // };

  // const handleSelectSlot = (slotInfo) => {
  //   setNewEvent({
  //     title: '',
  //     start: slotInfo.start,
  //     end: slotInfo.end,
  //   });
  //   setShowForm(true);
  // };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setNewEvent({
  //     ...newEvent,
  //     [name]: value,
  //   });
  // };

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   setEvents([...events, newEvent]);
  //   setShowForm(false);
  // };

  // useEffect(() => {
  //   if (modal1 && eventTitleInputRef.current) {
  //     eventTitleInputRef.current.focus();
  //   };
  //   console.log("triggers...");
  // }, [modal1]);

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

  // fetch task due's in calendar page

  useEffect(() => {
    const newEvent = {
      title: taskname,
      start: taskDuedate,
      allDay: true,
      end: taskDuedate,
    };

    taskname !== "" && setEvents([...events, newEvent]);
  }, []);

  return (
    <>
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
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectedEvent}
          // tooltipAccessor={(event) => <CustomTooltip event={event} />}
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
            const borderLeft = events.color
              ? `4px solid ${events.color}`
              : "4px solid purple";
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

        {/* <Modal
        isOpen={modal1}
        onRequestClose={handleModalClose}
        style={customStyles}
      >
        <div>
        <label htmlFor="eventTitle">Title:</label>
        <input
          type="text"
          id="eventTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        </div>
      </Modal> */}
      </CalendarPageContainer>

      {/* {showModal && (
        <div
          className="modal"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            backgroundColor: "pink",
            height: "300px",
            zIndex: "10000",
            transform: "translate(-50%, -50%)"
          }}
        >
          <div className="modal-content">
            <h2>Add Event</h2>
            <form>
              <label htmlFor="eventTitle">title</label>
              <input
                type="text"
                name="title"
                id="eventTitle"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
              />

              <button type="submit" onClick={saveEvent}>
                Add Event
              </button>
            </form>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )} */}

      <Modal
        isOpen={showModal}
        // onRequestClose={handleModalClose}
        style={customStyles}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            padding: "0.8rem",
            cursor: "pointer",
            // backgroundColor: "red",
          }}
        >
          <IoMdClose onClick={() => setShowModal(false)} size={22} />
        </div>
        <div className="event-box">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              columnGap: "0.6rem",
              padding: "0 1rem",
            }}
          >
            {/* <label htmlFor="eventTitle">Title:</label> */}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                className="event-color-box"
                style={{
                  backgroundColor: chooseTextColor,
                }}
                onClick={() => setOpenColors(!openColors)}
              ></div>

              {/* colors for event creation */}

              {openColors && (
                <div className="event-colors">
                  <div>Choose color</div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "0.8rem",
                      marginTop: "1rem",
                    }}
                  >
                    <div
                      className="event-color-box"
                      style={{
                        backgroundColor: "rgba(3, 155, 230, 1)",
                      }}
                      onClick={() => {
                        setChooseEventColor("rgba(3, 155, 230, 0.2)");
                        setChooseTextColor("rgba(3, 155, 230, 1)");
                      }}
                    ></div>
                    <div
                      className="event-color-box"
                      style={{
                        backgroundColor: "rgba(236, 119, 63, 1)",
                      }}
                      onClick={() => {
                        setChooseEventColor("rgba(236, 119, 63, 0.2)");
                        setChooseTextColor("rgba(236, 119, 63, 1)");
                      }}
                    ></div>
                    <div
                      className="event-color-box"
                      style={{
                        backgroundColor: "rgba(216, 26, 96, 1)",
                      }}
                      onClick={() => {
                        setChooseEventColor("rgba(216, 26, 96, 0.2)");
                        setChooseTextColor("rgba(216, 26, 96, 1)");
                      }}
                    ></div>
                    <div
                      className="event-color-box"
                      style={{
                        backgroundColor: "rgba(108, 117, 220, 1)",
                      }}
                      onClick={() => {
                        setChooseEventColor("rgba(108, 117, 220, 0.2)");
                        setChooseTextColor("rgba(108, 117, 220, 1)");
                      }}
                    ></div>
                    <div
                      className="event-color-box"
                      style={{
                        backgroundColor: "rgba(0, 128, 128, 1)",
                      }}
                      onClick={() => {
                        setChooseEventColor("rgba(0, 128, 128, 0.2)");
                        setChooseTextColor("rgba(0, 128, 128, 1)");
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <input
              type="text"
              // id="eventTitle"
              className="event-title-box"
              placeholder="Event Title"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
            />
          </div>

          <div className="event-boxes">
            <div
              className="event-box-left"
              style={{
                width: modalWidth ? "50%" : "100%",
              }}
            >
              {/* guest */}
              {modalWidth ? (
                ""
              ) : (
                <div className="event-icon-box">
                  <MdOutlineGroup size={26} color="rgba(132, 147, 178, 1)" />
                  <div
                    style={{
                      position: "relative",
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    <div
                      className="select-event-guests"
                      onClick={handlePopBelowToggle}
                    >
                      Add Guest(s)
                    </div>

                    {/* select surveyors */}

                    {isPopBelowVisible && (
                      <div
                        style={
                          {
                            // marginTop: "0.5rem",
                          }
                        }
                        className="select-surveyor-pop-below"
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div className="pop-over-surveyor-txt">Surveyor</div>
                          <input
                            placeholder="Search"
                            className="pop-over-surveyor-search"
                          />
                        </div>
                        <div className="surveyor-data-container">
                          {sortArr.map((data) => (
                            <div
                              style={{
                                marginTop: "1rem",
                              }}
                            >
                              <div className="surveyor-region-txt">
                                <span
                                  style={{
                                    marginRight: "0.6rem",
                                  }}
                                  onClick={() => {
                                    handleToggle(data.labelId);
                                  }}
                                >
                                  <input type="checkbox" />
                                </span>
                                {data.label}
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  height: "1px",
                                  backgroundColor: "rgba(211, 220, 229, 1)",
                                  marginBottom: "1rem",
                                }}
                              ></div>
                              {data.children.map((child) => (
                                <SurveyorTemplate
                                  name={child.label}
                                  img={child.imgSrc}
                                  id={child.sid}
                                  handleWithoutAllselect={
                                    handleWithoutAllselect
                                  }
                                  selectedUsers={selectedUsers}
                                />
                                // <SurveyorSelectTemplate
                                //   surveyor_img={child.label}
                                //   surveyor_name={child.label}
                                //   surveyor_id={child.id}
                                //   selectedUsers={selectedUsers}
                                //   handleWithoutAllselect={handleWithoutAllselect}
                                // />
                              ))}
                            </div>
                          ))}
                        </div>
                        <div
                          style={{
                            width: "100%",
                            height: "1px",
                            backgroundColor: "rgba(211, 220, 229, 1)",
                          }}
                        ></div>
                        <div className="surveyor-sort-container">
                          <div
                            style={{
                              display: "flex",
                              height: "40%",
                              columnGap: "0.3rem",
                              // backgroundColor: "red",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {azArr.map((letter) => (
                              <div
                                className="sorted-letters"
                                onClick={() => handleSort(letter)}
                                style={{
                                  backgroundColor:
                                    letter === selectedLetter
                                      ? "rgba(27, 81, 187, 1)"
                                      : "#fff",
                                  color:
                                    letter === selectedLetter
                                      ? "#fff"
                                      : "rgba(132, 147, 178, 1)",
                                  // padding: "2px",
                                  borderRadius: "0.2rem",
                                  fontFamily: "EuclidRegular",
                                }}
                              >
                                {letter}
                              </div>
                            ))}
                          </div>
                          <div className="img-sort">
                            {surveyorData.map(({ label, regionImg, value }) => (
                              <div
                                className="popover-img-box"
                                onClick={() => handleSort(value)}
                              >
                                <div
                                  style={{
                                    width: "7rem",
                                    height: "3rem",
                                  }}
                                >
                                  <img
                                    src={regionImg}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                      borderRadius: "0.3rem",
                                    }}
                                  />
                                </div>
                                <div
                                  style={{
                                    color: "rgba(132, 147, 178, 1)",
                                    fontSize: "0.8rem",
                                    fontFamily: "EuclidRegular",
                                  }}
                                >
                                  {label}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        columnGap: "0.5rem",
                        marginTop: "1rem",
                      }}
                    >
                      <input type="checkbox" />
                      <div className="forward-event">
                        Allow Forwarding of this event
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* start */}

              <div className="event-icon-box">
                <FiClock size={26} color="rgba(132, 147, 178, 1)" />
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    columnGap: "1rem",
                  }}
                >
                  <div
                    // className="start-event-date"
                    style={{
                      width: "35%",
                    }}
                  >
                    <div
                      onClick={() => setIsOpenStartDate(!isOpenStartDate)}
                      style={{
                        backgroundColor: " rgba(247, 249, 251, 1)",
                        fontFamily: "EuclidMedium",
                        color: "rgba(211, 220, 229, 1)",
                        padding: "0.8rem",
                        borderRadius: "0.3rem",
                        cursor: "pointer",
                      }}
                    >
                      {moment(selectedDate).format("YYYY-MM-DD")}
                    </div>

                    {isOpenStartDate && (
                      <div
                        style={{
                          position: "absolute",
                          marginTop: "20rem",
                          width: "20rem",
                        }}
                      >
                        <DatePicker
                          value={startDate}
                          onSelect={handleTaskStartDate}
                          onCancel={handleCancel}
                          isPopup={false}
                          theme={"ios"}
                          showHeader={false}
                          showCaption={true}
                          dateConfig={dateConfig}
                          confirmText="Apply"
                          cancelText="Cancel"
                          style={{
                            width: "100%",
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      width: "35%",
                      position: "relative",
                    }}
                  >
                    <div
                      onClick={() => setIsOpenStartTime(!isOpenStartTime)}
                      style={{
                        backgroundColor: " rgba(247, 249, 251, 1)",
                        fontFamily: "EuclidMedium",
                        color: "rgba(211, 220, 229, 1)",
                        padding: "0.8rem",
                        borderRadius: "0.3rem",
                        cursor: "pointer",
                      }}
                    >
                      Start time
                    </div>
                    {isOpenStartTime && (
                      <div
                        style={{
                          position: "absolute",
                          marginTop: "22rem",
                          width: "10rem",
                        }}
                      >
                        <DatePicker
                          value={startTime}
                          onSelect={handleTaskStartTime}
                          onCancel={handleCancel}
                          isPopup={false}
                          theme={"ios"}
                          showHeader={false}
                          showCaption={true}
                          dateConfig={timeConfig}
                          confirmText="Apply"
                          cancelText="Cancel"
                          style={{
                            width: "100%",
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div
                    className="all-day-event"
                    style={{
                      display: "flex",
                      // backgroundColor: "red",
                      alignItems: "center",
                      // color: allDayEvent ? "green" : "red",
                      // cursor: "pointer",
                    }}
                    onClick={() => setAllDayEvent(!allDayEvent)}
                  >
                    {/* <IosToggle /> */}
                    <button
                      className={`toggle-btn ${allDayEvent ? "toggled" : ""}`}
                      onClick={() => setAllDayEvent(!allDayEvent)}
                    >
                      <div className="thumb"></div>
                    </button>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        fontFamily: "EuclidMedium",
                      }}
                    >
                      All day
                    </div>
                  </div>
                </div>
              </div>

              {/* to */}

              <div className="event-icon-box">
                <div
                  style={{
                    color: "rgba(27, 36, 54, 1)",
                    fontFamily: "EuclidMedium",
                    width: "26px",
                    height: "26px",
                    // backgroundColor: "red"
                  }}
                >
                  To
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    columnGap: "1rem",
                  }}
                >
                  <div
                    className="start-event-date"
                    onClick={() => setIsOpenEndDate(!isOpenEndDate)}
                  >
                    {moment(endDate).format("YYYY-MM-DD")}
                  </div>
                  {isOpenEndDate && (
                    <div
                      style={{
                        position: "absolute",
                        marginTop: "42rem",
                        width: "20rem",
                      }}
                    >
                      <DatePicker
                        value={endDate}
                        onSelect={handleTaskEndDate}
                        onCancel={handleCancel}
                        isPopup={false}
                        theme={"ios"}
                        showHeader={false}
                        showCaption={true}
                        dateConfig={dateConfig}
                        confirmText="Apply"
                        cancelText="Cancel"
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                  )}
                  <div className="start-event-time">End Time</div>
                </div>
              </div>

              {/* location */}

              <div className="event-icon-box">
                <SlLocationPin size={26} color="rgba(132, 147, 178, 1)" />
                <div
                  className="meet-link-box"
                  style={{
                    width: "100%",
                  }}
                >
                  <input
                    className="select-event-guests"
                    placeholder={
                      modeChange === "Online"
                        ? "Paste meet link"
                        : "Enter address"
                    }
                  />
                  {/* <div className="select-event-guests">Paste meet link</div> */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      columnGap: "0.5rem",
                      marginTop: "1rem",
                    }}
                  >
                    <label className="event-radio-btn">
                      <input
                        type="radio"
                        value="Offline"
                        name="mode"
                        checked={modeChange === "Offline"}
                        onChange={onModeChange}
                      />
                      Offline
                    </label>
                    <label
                      style={{
                        marginLeft: "0.8rem",
                      }}
                      className="event-radio-btn"
                    >
                      <input
                        type="radio"
                        value="Online"
                        name="mode"
                        checked={modeChange === "Online"}
                        onChange={onModeChange}
                      />
                      Online
                    </label>
                  </div>
                </div>
                {modalWidth ? (
                  ""
                ) : (
                  <div>
                    <AiOutlineRight
                      size={26}
                      color="rgba(132, 147, 178, 1)"
                      onClick={() => setModalWidth(!modalWidth)}
                    />
                  </div>
                )}
              </div>

              {/* alert */}
              {modalWidth && (
                <div className="event-icon-box">
                  <IoNotificationsOutline
                    size={26}
                    color="rgba(132, 147, 178, 1)"
                  />
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      columnGap: "1rem",
                    }}
                  >
                    {/* alert type */}

                    <div className="alert-event-type">
                      <div
                        className="alert-event-box"
                        onClick={() => setNotification(!notification)}
                      >
                        Notification
                      </div>
                      {notification && (
                        <div className="pop-below-event-type">
                          <div className="pop-below-text">Notification</div>
                          <div className="pop-below-text">Email</div>
                        </div>
                      )}
                    </div>

                    {/* hour, mins */}

                    <div className="alert-event-time">
                      <div
                        className="alert-event-box"
                        onClick={() => setHour(!hour)}
                      >
                        1 hour
                      </div>
                      {hour && (
                        <div className="pop-below-event-type">
                          <div className="pop-below-text">5 mins</div>
                          <div className="pop-below-text">10 mins</div>
                          <div className="pop-below-text">20 mins</div>
                          <div className="pop-below-text">30 mins</div>
                          <div className="pop-below-text">40 mins</div>
                          <div className="pop-below-text">50 mins</div>
                          <div className="pop-below-text">1 hour</div>
                          <div className="pop-below-text">2 hours</div>
                          <div className="pop-below-text">3 hours</div>
                        </div>
                      )}
                    </div>

                    {/* after before */}

                    <div className="alert-event-day">
                      <div
                        className="alert-event-box"
                        onClick={() => setDay(!day)}
                      >
                        Before
                      </div>
                      {day && (
                        <div className="pop-below-event-type">
                          <div className="pop-below-text">Before</div>
                          <div className="pop-below-text">After</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* attachment */}

              {modalWidth && (
                <div className="event-attachment">
                  <GrAttachment size={20} color="rgba(132, 147, 178, 1)" />
                  <input type="file" placeholder="Attachment" />
                </div>
              )}

              {/* event description */}

              <div className="event-attachment">
                <BsTextParagraph size={24} color="rgba(132, 147, 178, 1)" />
                <textarea
                  placeholder="Add Description"
                  cols="30"
                  rows="5"
                  style={{
                    width: "100%",
                    border: "none",
                    backgroundColor: "rgba(247, 249, 251, 1)",
                    fontFamily: "EuclidMedium",
                    padding: "0.5rem",
                    fontSize: "1rem",
                    borderRadius: "0.3rem",
                  }}
                ></textarea>
              </div>

              <button
                className="save-event-btn"
                type="submit"
                onClick={saveEvent}
              >
                Save
              </button>
            </div>

            {/* right */}

            {modalWidth ? (
              <div className="event-box-right">
                {/* guest */}
                <div
                  style={{
                    // backgroundColor: "pink",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                    }}
                    className="event-icon-box"
                  >
                    <MdOutlineGroup size={26} color="rgba(132, 147, 178, 1)" />
                    <div
                      style={{
                        width: "100%",
                      }}
                    >
                      <div className="select-event-guests">Add Guest(s)</div>
                      {/* guest box */}
                      <div className="guest-box">
                        <img src={GuestZero} />
                      </div>

                      {/* forward text */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          columnGap: "0.5rem",
                          marginTop: "1rem",
                        }}
                      >
                        <input type="checkbox" />

                        <div className="forward-event">
                          Allow Forwarding of this event
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: "15rem",
                    }}
                  >
                    <FaChevronLeft
                      size={26}
                      color="rgba(132, 147, 178, 1)"
                      onClick={() => setModalWidth(!modalWidth)}
                    />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CalendarPage;

// <div>
//           <div>
//             <label htmlFor="eventTitle">Title:</label>
//             <input
//               type="text"
//               id="eventTitle"
//               value={eventTitle}
//               onChange={(e) => setEventTitle(e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="eventBg">Event Bg:</label>
//             <input
//               type="text"
//               id="eventBg"
//               value={eventBg}
//               onChange={(e) => setEventBg(e.target.value)}
//             />
//           </div>
//           <br></br>
//           <button type="submit" onClick={saveEvent}>
//             Add Event
//           </button>
//           <br></br>
//         </div>
