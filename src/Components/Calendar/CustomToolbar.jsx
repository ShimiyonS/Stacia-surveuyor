import React, { useContext } from "react";
import Toolbar from "react-big-calendar";
import Next from "../../Assets/Next.svg";
import Prev from "../../Assets/Prev.svg";
import { RiExpandRightLine } from "react-icons/ri";
import { RiExpandLeftLine } from "react-icons/ri";
import { PageContext } from "../../Context/PageContext";

const CustomToolbar = ({ views, view, label, onView, onNavigate }) => {
  const { calendarExpand, setCalendarExpand } = useContext(PageContext);
  return (
    <div
      style={{
        backgroundColor: "#fff",
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
              fontFamily: "EuclidMedium",
            }}
          >
            Today
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              onClick={() => onNavigate("PREV")}
              style={{ cursor: "pointer" }}
            >
              <img src={Prev} alt="prev-btn" />
            </div>
            <div
              onClick={() => onNavigate("NEXT")}
              style={{ cursor: "pointer" }}
            >
              <img src={Next} alt="next-btn" />
            </div>
          </div>
        </div>
        <label
          style={{
            fontFamily: "EuclidMedium",
          }}
        >
          {label}
        </label>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          columnGap: "1rem",
        }}
      >
        <select
          value={view}
          onChange={(e) => onView(e.target.value)}
          className="select-cal-view"
          style={{
            textTransform: "capitalize",
            fontFamily: "EuclidRegular",
          }}
        >
          {views.map((item) => (
            <option
              key={item}
              value={item}
              style={{
                textTransform: "capitalize",
                fontFamily: "EuclidRegular",
              }}
            >
              {item}
            </option>
          ))}
        </select>
        {calendarExpand && (
          <RiExpandRightLine
            color="rgba(132, 147, 178, 1)"
            size={20}
            onClick={() => setCalendarExpand(false)}
            style={{
              cursor: "pointer",
            }}
          />
        )}

        {calendarExpand === false && (
          <RiExpandLeftLine
            color="rgba(132, 147, 178, 1)"
            size={20}
            onClick={() => setCalendarExpand(true)}
            style={{
              cursor: "pointer",
            }}
          />
        )}
      </div>
    </div>
  );
};
export default CustomToolbar;
