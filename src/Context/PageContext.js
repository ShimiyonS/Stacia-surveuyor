import React, { createContext, useEffect, useState } from "react";

const PageContext = createContext();

const PageContextProvider = ({ children }) => {
  const [pageName, setPageName] = useState("Dashboard");
  const [calendarExpand, setCalendarExpand] = useState(true);
  const [taskDuedate, setTaskDuedate] = useState(new Date());
  const [taskname, setTaskname] = useState("");
  const [surveyors, setSurveyors] = useState([]);
  const [filterByStatus, setFilterByStatus] = useState([]);
  const [boardSurveyorId, setBoardSurveyorId] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [desc, setDesc] = useState("");
  const [region, setRegion] = useState("");
  const [taskDue, setTaskDue] = useState("");
  const [dueStart, setDueStart] = useState("");
  const [dueEnd, setDueEnd] = useState("");
  const [surveyLimit, setSurveyLimit] = useState("");
  const [surveyRadius, setSurveyRadius] = useState("");
  const [taskListStatus, setTaskListStatus] = useState([]);
  const [unassigned, setUnassigned] = useState("");

  const [listDateFilter, setListDateFilter] = useState([]);

  const [boardViewStatus, setBoardViewStatus] = useState([]);
  const [boardDateFilter, setBoardDateFilter] = useState([]);
  const [boardRangeFilter, setBoardRangeFilter] = useState([]);
  const [boardFilterActive, setBoardFilterActive] = useState(false);
  const [selectedSurveyors, setSelectedSurveyors] = useState([]);
  const [selectSurveyorInCreateTask, setSelectedSurveyorInCreateTask] = useState([]);

  // store bulk assign task response
  const [bulkRes, setBulkRes] = useState("");

  // fillter types [create board]
  const [showStatus, setShowStatus] = useState([]);
  const [showDateRange, setShowDateRange] = useState([]);

  // create task surveyors select

  const [createTaskSuvreyors, setCreateTaskSurveyors] = useState([]);

  return (
    <PageContext.Provider
      value={{
        pageName,
        setPageName,
        calendarExpand,
        setCalendarExpand,
        taskname,
        setTaskname,
        taskDuedate,
        setTaskDuedate,
        surveyors,
        setSurveyors,
        filterByStatus,
        setFilterByStatus,
        boardSurveyorId,
        setBoardSurveyorId,
        taskName,
        setTaskName,
        desc,
        setDesc,
        region,
        setRegion,
        taskDue,
        setTaskDue,
        dueStart,
        setDueStart,
        dueEnd,
        setDueEnd,
        surveyLimit,
        setSurveyLimit,
        surveyRadius,
        setSurveyRadius,
        bulkRes,
        setBulkRes,
        taskListStatus,
        setTaskListStatus,
        unassigned,
        setUnassigned,
        listDateFilter,
        setListDateFilter,
        // board view filter
        boardViewStatus,
        setBoardViewStatus,
        boardDateFilter,
        setBoardDateFilter,
        boardRangeFilter,
        setBoardRangeFilter,
        boardFilterActive,
        setBoardFilterActive,
        selectedSurveyors,
        setSelectedSurveyors,
        showDateRange,
        setShowDateRange,
        showStatus,
        setShowStatus,
        selectSurveyorInCreateTask, setSelectedSurveyorInCreateTask,
        createTaskSuvreyors, setCreateTaskSurveyors
      }}
    >
      {children}
    </PageContext.Provider>
  );
};

export { PageContext, PageContextProvider };
