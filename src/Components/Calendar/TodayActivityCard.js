import React from "react";

export default function TodayActivityCard({ data, id }) {
  return (
    <div className="today-activity-card">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="activity-name">{data.taskName}{id}</div>
        <div className="activity-due">Due date: {data.dueDate}</div>
      </div>
      <div className="today-activity-desc">{data.desc}</div>
    </div>
  );
}
