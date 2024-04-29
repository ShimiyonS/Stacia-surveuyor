import React from "react";
import "../../Styles/Task/Taskcard.css";
import Profile from "../../Assets/Profile.svg";
import Threedots from "../../Assets/threedots.svg";
import { IoCalendarOutline } from "react-icons/io5";
import { SlOptionsVertical } from "react-icons/sl";

export default function TaskCard({ data, bgColor }) {
  const originalColor = bgColor;
  const matches = originalColor.match(/(\d+(\.\d+)?)/g);
  const [red, green, blue] = matches.slice(0, 3).map(Number);
  const newAlpha = 0.1;
  const newColor = `rgba(${red}, ${green}, ${blue}, ${newAlpha.toFixed(2)})`;

  return (
    <div className="board-view-task-card" style={{ backgroundColor: newColor }}>
      <div className="task-card-img-div">
        <img src={Profile} />
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", rowGap: "0.6rem" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            width: '100%',
            justifyContent: 'space-between',
            columnGap: "0.2rem",
          }}
        >
          <div className="board-view-task-name" style={{ color: bgColor }}>
            {data.taskName}
          </div>
          <SlOptionsVertical color={bgColor} />
        </div>
        <div className="board-view-task-due">
          <IoCalendarOutline color={bgColor} />
          <div style={{ color: bgColor }}>{data.dueDate}</div>
        </div>
      </div>
    </div>
  );
}
