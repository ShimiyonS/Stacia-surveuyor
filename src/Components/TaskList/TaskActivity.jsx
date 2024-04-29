import React, { useState } from "react";
import TodayActivityCard from "../Calendar/TodayActivityCard";

export default function TaskActivity() {
  const [todayActivityCards, setTodayActivityCards] = useState([
    {
      id: 1,
      taskName: "Farmer Survey",
      dueDate: "26/12/2023",
      desc: "Lorem Ipsum has been the industrys standard andard dummystandard dummy",
    },
    {
      id: 2,
      taskName: "Farmer Survey",
      dueDate: "26/12/2023",
      desc: "Lorem Ipsum has been the industrys standard andard dummystandard dummy",
    },
    {
      id: 3,
      taskName: "Farmer Survey",
      dueDate: "26/12/2023",
      desc: "Lorem Ipsum has been the industrys standard andard dummystandard dummy",
    },
    {
      id: 4,
      taskName: "Farmer Survey",
      dueDate: "26/12/2023",
      desc: "Lorem Ipsum has been the industrys standard andard dummystandard dummy",
    },
    {
      id: 5,
      taskName: "Farmer Survey",
      dueDate: "26/12/2023",
      desc: "Lorem Ipsum has been the industrys standard andard dummystandard dummy",
    },
    {
      id: 6,
      taskName: "Farmer Survey",
      dueDate: "26/12/2023",
      desc: "Lorem Ipsum has been the industrys standard andard dummystandard dummy",
    },
    {
      id: 7,
      taskName: "Farmer Survey",
      dueDate: "26/12/2023",
      desc: "Lorem Ipsum has been the industrys standard andard dummystandard dummy",
    },
    {
      id: 8,
      taskName: "Farmer Survey",
      dueDate: "26/12/2023",
      desc: "Lorem Ipsum has been the industrys standard andard dummystandard dummy",
    },
    {
      id: 9,
      taskName: "Farmer Survey",
      dueDate: "26/12/2023",
      desc: "Lorem Ipsum has been the industrys standard andard dummystandard dummy",
    },
    {
      id: 9,
      taskName: "Farmer Survey",
      dueDate: "26/12/2023",
      desc: "Lorem Ipsum has been the industrys standard andard dummystandard dummy",
    },
    {
      id: 10,
      taskName: "Farmer Survey",
      dueDate: "26/12/2023",
      desc: "Lorem Ipsum has been the industrys standard andard dummystandard dummy",
    },
  ]);

  return (
    <div className="today-activity">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="activity-text">Today’s Activity</div>
        <div className="activity-text">( 20 )</div>
      </div>
      {/* activity cards */}
      <div style={{ marginTop: "1.5rem" }}>
        {todayActivityCards.map((data, index) => (
          <TodayActivityCard data={data} id={index} />
        ))}
      </div>
    </div>
  );
}
