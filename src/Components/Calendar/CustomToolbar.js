import React from "react";
import Toolbar from "react-big-calendar";
import Next from "../../Assets/Next.svg";
import Prev from "../../Assets/Prev.svg";

const CustomToolbar = ({ views, view, label, onView, onNavigate }) => (
  <div
    style={{
      // backgroundColor: "pink",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      // margin: "1rem",
      // marginTop: '1rem',
      borderLeft: "1px solid #D3DCE5",
      borderRight: "1px solid #D3DCE5",
      borderTop: "1px solid #D3DCE5",
      padding: "0.8rem 1rem",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div
          onClick={() => onNavigate("TODAY")}
          style={{
            color: "#fff",
            cursor: "pointer",
            backgroundColor: "rgba(27, 81, 187, 1)",
            padding: "0.4rem 0.8rem",
            borderRadius: "0.3rem",
          }}
        >
          Today
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div onClick={() => onNavigate("PREV")} style={{ cursor: "pointer" }}>
            <img src={Prev} alt="prev-btn" />
          </div>
          <div onClick={() => onNavigate("NEXT")} style={{ cursor: "pointer" }}>
            <img src={Next} alt="next-btn" />
          </div>
        </div>
      </div>
      <label>{label}</label>
    </div>

    <select
      value={view}
      onChange={(e) => onView(e.target.value)}
      className="select-cal-view"
    >
      {views.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  </div>
);

export default CustomToolbar;
