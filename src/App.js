import logo from "./logo.svg";
import "./App.css";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import OverviewPage from "./Pages/OverviewPage";
import TopBar from "./Components/TopBar";
import { useState, useEffect } from "react";
import SignInpage from "./Pages/SignInpage";
import TaskPage from "./Pages/TaskPage";
import NewTopBar from "./Components/NewTopBar";
import Sidebar from "./Components/Sidebar";
import TaskCreate from "./Components/TaskList/TaskCreate";
import { PageContextProvider } from "./Context/PageContext";
import CalendarPage from "./Pages/CalendarPage";
import SpecificTask from "./Components/TaskList/SpecificTask";
import CreateTask from "./Components/TaskList/CreateTask";

function App() {
  const [isAuthenticated, setAuthenticated] = useState(true);

  return (
    <PageContextProvider>
      <div className="App">
        <Router>
          {isAuthenticated && (
            <>
              {/* <TopBar /> */}
              <NewTopBar />
              <Sidebar />
            </>
          )}

          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? <OverviewPage /> : <Navigate to="/signin" />
              }
            />
            <Route
              path="/surveyor-tasks"
              element={
                isAuthenticated ? <TaskPage /> : <Navigate to="/signin" />
              }
            />
            <Route
              path="/create-task"
              element={
                isAuthenticated ? (
                  <CreateTask />
                ) : (
                  <Navigate to="/create-task" />
                )
              }
            />
            <Route
              path="/surveyor-tasks/specific-task/:id"
              element={
                isAuthenticated ? <SpecificTask /> : <Navigate to="/sign-in" />
              }
            />
            <Route
              path="/calendar"
              element={
                isAuthenticated ? <CalendarPage /> : <Navigate to="/signin" />
              }
            />
            <Route path="/signin" element={<SignInpage />} />
          </Routes>
        </Router>
      </div>
    </PageContextProvider>
  );
}

export default App;