import React from "react";

export default function DraggableBox({ index }) {
  return (
    <div
      style={{
        padding: "2rem",
        border: "1px solid #636363",
        // minWidth: "320px",
        height: "60vh",
        // userSelect: 'none'
      }}
    >
      <div>Box {index} </div>
    </div>
  );
}
