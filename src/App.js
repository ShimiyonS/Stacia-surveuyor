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
import TaskNextPage from "./Components/TaskList/TaskNextPage";
import Notifications from "./Components/Notification/Notifications";
import Chat from "./Pages/Chat";
import EditTask from "./Components/TaskList/EditTask";
import Chat1 from "./Pages/Chat1";

function App() {
  const [isAuthenticated, setAuthenticated] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [pageName, setPageName] = useState("Dashboard");
  const handleFileChange = (file) => {
    setSelectedFile(file);
  };

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
                isAuthenticated ? (
                  <OverviewPage pageName={pageName} />
                ) : (
                  <Navigate to="/signin" />
                )
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
                  <CreateTask onFileChange={handleFileChange} 
                  />
                ) : (
                  <Navigate to="/create-task" />
                )
              }
            />
            <Route
              path="/surveyor-tasks/edit-task/:id"
              element={
                isAuthenticated ? (
                  <EditTask onFileChange={handleFileChange} 
                  />
                ) : (
                  <Navigate to="/surveyor-tasks/edit-task/:id" />
                )
              }
            />
            <Route
              path="/create-task/excel-view"
              element={
                isAuthenticated ? (
                  <TaskNextPage selectedFile={selectedFile} />
                ) : (
                  <Navigate to="/create-task/excel-view" />
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
              path="/create-task/calendar"
              element={
                isAuthenticated ? <CalendarPage /> : <Navigate to="/signin" />
              }
            />
            <Route
              path="/calendar"
              element={
                isAuthenticated ? <CalendarPage /> : <Navigate to="/signin" />
              }
            />
            <Route
              path="/notifications"
              element={
                isAuthenticated ? <Notifications /> : <Navigate to="/signin" />
              }
            />
            <Route
              path="/chat"
              element={isAuthenticated ? <Chat /> : <Navigate to="/chat" />}
            />

            {/* chat dynamic desgin checking route */}
            <Route
              path="/chat1"
              element={isAuthenticated ? <Chat1 /> : <Navigate to="/chat1" />}
            />
            <Route path="/signin" element={<SignInpage />} />
          </Routes>
        </Router>
      </div>
    </PageContextProvider>
  );
}

export default App;
