import React, { createContext, useEffect, useState } from "react";

const PageContext = createContext();

const PageContextProvider = ({ children }) => {
  const [pageName, setPageName] = useState("Dashboard");
  const [calendarExpand, setCalendarExpand] = useState(true);
  const [taskDuedate, setTaskDuedate] = useState(new Date());
  const [taskname, setTaskname] = useState("");

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
      }}
    >
      {children}
    </PageContext.Provider>
  );
};

export { PageContext, PageContextProvider };
