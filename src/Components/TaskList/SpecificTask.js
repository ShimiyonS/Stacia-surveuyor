import React, { useState } from "react";
import "../../Styles/Task/SpecificTask.css";
import { IoDocumentText } from "react-icons/io5";
import { SlOptionsVertical } from "react-icons/sl";
import SpecificTaskMore from "./SpecificTaskMore";

const ResponsesTemplate = ({ imgSrc, name }) => {
  return (
    <div className="response-template">
      <div className="response-img-box">
        <img src={imgSrc} />
      </div>
      <div style={{}}>
        <div className="response-name">{name}</div>
        <div className="res-farmer">Farmer</div>
      </div>
    </div>
  );
};

const AssignedResTemplate = ({ imgSrc, name, id }) => {
  return (
    <div className="response-template"
      style={{
        justifyContent: 'space-between',
      }}
    >
      <div style={{
        display: "flex",
        alignItems: "center",
        columnGap: "0.6rem"
      }}>
        <div className="response-img-box">
          <img src={imgSrc} />
        </div>
        <div style={{}}>
          <div className="response-name">{name}</div>
          <div className="res-farmer">Surveyor</div>
        </div>
      </div>
      <div className="res-farmer">ID:{id}</div>
    </div>
  );
};

const resData = [
  {
    id: 1,
    imgSrc:
      "https://therecursive.com/cdn-cgi/image/format=auto/wp-content/uploads/2022/09/USE-THIS-FOR-SOCIAL-MEDIA-1200x628-38-1-900x471.png",
    name: "Saul goodman",
  },
  {
    id: 2,
    imgSrc:
      "https://therecursive.com/cdn-cgi/image/format=auto/wp-content/uploads/2022/09/USE-THIS-FOR-SOCIAL-MEDIA-1200x628-38-1-900x471.png",
    name: "Saul goodman",
  },
  {
    id: 3,
    imgSrc:
      "https://therecursive.com/cdn-cgi/image/format=auto/wp-content/uploads/2022/09/USE-THIS-FOR-SOCIAL-MEDIA-1200x628-38-1-900x471.png",
    name: "Saul goodman",
  },
  {
    id: 4,
    imgSrc:
      "https://therecursive.com/cdn-cgi/image/format=auto/wp-content/uploads/2022/09/USE-THIS-FOR-SOCIAL-MEDIA-1200x628-38-1-900x471.png",
    name: "Saul goodman",
  },
  {
    id: 5,
    imgSrc:
      "https://therecursive.com/cdn-cgi/image/format=auto/wp-content/uploads/2022/09/USE-THIS-FOR-SOCIAL-MEDIA-1200x628-38-1-900x471.png",
    name: "Saul goodman",
  },
  {
    id: 6,
    imgSrc:
      "https://therecursive.com/cdn-cgi/image/format=auto/wp-content/uploads/2022/09/USE-THIS-FOR-SOCIAL-MEDIA-1200x628-38-1-900x471.png",
    name: "Saul goodman",
  },
  {
    id: 1,
    imgSrc:
      "https://therecursive.com/cdn-cgi/image/format=auto/wp-content/uploads/2022/09/USE-THIS-FOR-SOCIAL-MEDIA-1200x628-38-1-900x471.png",
    name: "Saul goodman",
  },
  {
    id: 2,
    imgSrc:
      "https://therecursive.com/cdn-cgi/image/format=auto/wp-content/uploads/2022/09/USE-THIS-FOR-SOCIAL-MEDIA-1200x628-38-1-900x471.png",
    name: "Saul goodman",
  },
  {
    id: 3,
    imgSrc:
      "https://therecursive.com/cdn-cgi/image/format=auto/wp-content/uploads/2022/09/USE-THIS-FOR-SOCIAL-MEDIA-1200x628-38-1-900x471.png",
    name: "Saul goodman",
  },
  {
    id: 4,
    imgSrc:
      "https://therecursive.com/cdn-cgi/image/format=auto/wp-content/uploads/2022/09/USE-THIS-FOR-SOCIAL-MEDIA-1200x628-38-1-900x471.png",
    name: "Saul goodman",
  },
  {
    id: 5,
    imgSrc:
      "https://therecursive.com/cdn-cgi/image/format=auto/wp-content/uploads/2022/09/USE-THIS-FOR-SOCIAL-MEDIA-1200x628-38-1-900x471.png",
    name: "Saul goodman",
  },
  {
    id: 6,
    imgSrc:
      "https://therecursive.com/cdn-cgi/image/format=auto/wp-content/uploads/2022/09/USE-THIS-FOR-SOCIAL-MEDIA-1200x628-38-1-900x471.png",
    name: "Saul goodman",
  },
];

const assignedData = [
  {
    id: 14568,
    imgSrc:
      "https://therecursive.com/cdn-cgi/image/format=auto/wp-content/uploads/2022/09/USE-THIS-FOR-SOCIAL-MEDIA-1200x628-38-1-900x471.png",
    name: "Saul goodman",
  },
  {
    id: 20997,
    imgSrc:
      "https://therecursive.com/cdn-cgi/image/format=auto/wp-content/uploads/2022/09/USE-THIS-FOR-SOCIAL-MEDIA-1200x628-38-1-900x471.png",
    name: "Saul goodman",
  },
  {
    id: 33679,
    imgSrc:
      "https://therecursive.com/cdn-cgi/image/format=auto/wp-content/uploads/2022/09/USE-THIS-FOR-SOCIAL-MEDIA-1200x628-38-1-900x471.png",
    name: "Saul goodman",
  },
  {
    id: 46890,
    imgSrc:
      "https://therecursive.com/cdn-cgi/image/format=auto/wp-content/uploads/2022/09/USE-THIS-FOR-SOCIAL-MEDIA-1200x628-38-1-900x471.png",
    name: "Saul goodman",
  },
  {
    id: 59076,
    imgSrc:
      "https://therecursive.com/cdn-cgi/image/format=auto/wp-content/uploads/2022/09/USE-THIS-FOR-SOCIAL-MEDIA-1200x628-38-1-900x471.png",
    name: "Saul goodman",
  },
];

export default function SpecificTask() {
  const attachments = ["dummy_surveyors_data.xlsx", "farmer_data.xlsx"];

  const handleDownloadAll = () => {
    attachments.forEach((attachment) => {
      window.open(attachment, "_blank");
    });
  };

  const [activeResponseTab, setActiveResponseTab] = useState(true);
  const [activeAssignedSurveyorTab, setActiveAssignedSurveyorTab] =
    useState(false);

  return (
    <div className="task-specific">
      <div
        style={{
          width: "97%",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <div className="create-task-btn">Create Task</div>
      </div>
      <div className="task-specific-inner-layer">
        <div className="task-specific-left">
          <div className="task-specific-top">
            <div
              style={{
                marginBottom: "1.6rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: "1.3rem",
                }}
              >
                <div className="specific-task-id">ID : 12345</div>
                <div className="task-status-button">Completed</div>
              </div>
              {/* <div
                style={{
                  border: "1px solid rgba(132, 147, 178, 1)",
                  padding: "0.5rem 0.6rem",
                  borderRadius: "0.5rem",
                }}
              >
                <SlOptionsVertical color="rgba(132, 147, 178, 1)" />
              </div> */}
              <SpecificTaskMore />
            </div>

            {/* task name and icon */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                columnGap: "2.3rem",
              }}
            >
              <div className="task-icon-bg">
                <IoDocumentText
                  style={{ width: "2rem", height: "2rem" }}
                  color="#fff"
                />
              </div>
              <div className="specific-task-name">
                Lorem Ipsum is simply dummy
              </div>
            </div>

            {/* options */}

            {/* desc */}

            <div className="specific-task-desc-title">Description</div>
            <div className="specific-task-desc">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </div>

            {/* key values */}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "1rem",
                marginTop: "1.8rem",
              }}
            >
              <div className="task-key-value">
                <div className="task-key">Region</div>
                <div>:</div>
                <div className="task-value">Madurai</div>
              </div>
              <div className="task-key-value">
                <div className="task-key">Region radius</div>
                <div>:</div>
                <div className="task-value">10 km</div>
              </div>
              <div className="task-key-value">
                <div className="task-key">Survey Count</div>
                <div>:</div>
                <div className="task-value">20</div>
              </div>
              <div className="task-key-value-tags">
                <div className="task-key">Tags</div>
                <div>:</div>
                <div className="task-tags">
                  <div className="task-tag1">Customer shop Feedback</div>
                  <div className="task-tag2">Farmer feedback</div>
                </div>
              </div>
            </div>
          </div>

          {/* hr line */}
          <div
            style={{ borderBottom: "1px solid rgba(213, 232, 255, 1)" }}
          ></div>

          {/* downloadable documents */}

          <div className="attachment">
            <div className="attachment-text">2 Attachments</div>
            <div className="download-all-btn" oncl>
              Download All
            </div>
          </div>

          {/* documents */}

          <div
            style={{
              padding: "0 3rem",
              display: "flex",
              alignItems: "center",
              columnGap: "1.5rem",
            }}
          >
            {attachments.map((attachment, index) => (
              <div key={index}>
                <a href="" target="_blank" rel="noopener noreferrer" download>
                  {attachment}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="task-specific-right">
          <div className="task-specific-topbar">
            <div
              className="responses"
              style={{
                color: activeResponseTab
                  ? "rgba(27, 81, 187, 1)"
                  : "rgba(132, 147, 178, 1)",
                fontFamily: activeResponseTab
                  ? "EuclidSemibold"
                  : "EuclidMedium",
                borderBottom: activeResponseTab
                  ? "3px solid rgba(27, 81, 187, 1)"
                  : "3px solid #fff",
              }}
              onClick={() => {
                setActiveResponseTab(true);
                setActiveAssignedSurveyorTab(false);
              }}
            >
              Responses
            </div>
            <div
              className="responses"
              style={{
                color: activeAssignedSurveyorTab
                  ? "rgba(27, 81, 187, 1)"
                  : "rgba(132, 147, 178, 1)",
                fontFamily: activeAssignedSurveyorTab
                  ? "EuclidSemibold"
                  : "EuclidMedium",
                borderBottom: activeAssignedSurveyorTab
                  ? "3px solid rgba(27, 81, 187, 1)"
                  : "3px solid #fff",
              }}
              onClick={() => {
                setActiveResponseTab(false);
                setActiveAssignedSurveyorTab(true);
              }}
            >
              Assigned surveyor
            </div>
          </div>

          {/* check response tab */}

          {activeResponseTab && (
            <div
              style={{
                marginTop: "1.5rem",
                display: "flex",
                flexDirection: "column",
                rowGap: "0.5rem",
                // backgroundColor: "pink",
              }}
            >
              {resData.map(({ imgSrc, name }) => (
                <ResponsesTemplate imgSrc={imgSrc} name={name} />
              ))}
            </div>
          )}

          {/* chcek assigned tab */}

          {activeAssignedSurveyorTab && (
            <div
              style={{
                marginTop: "1.5rem",
                display: "flex",
                flexDirection: "column",
                rowGap: "0.5rem",
                // backgroundColor: "pink",
              }}
            >
              {assignedData.map(({ imgSrc, name, id }) => (
                <AssignedResTemplate imgSrc={imgSrc} name={name} id={id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
