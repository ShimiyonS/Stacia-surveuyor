import React from "react";
import { MdDone } from "react-icons/md";

export default function SurveyorSelectTemplate({
  surveyor_id,
  surveyor_img,
  surveyor_name,
  handleWithoutAllselect,
  selectedUsers,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.4rem",
        cursor: "pointer",
        fontFamily: "EuclidMedium",
        color: "rgba(132, 147, 178, 1)",
        backgroundColor: selectedUsers.includes(surveyor_id)
          ? "rgba(27, 81, 187, 0.1)"
          : "transparent",
        borderRadius: "0.2rem",
      }}
      onClick={() => {
        handleWithoutAllselect(surveyor_id);
        // setOpenFormFrameModal(false);
        // handleSelectUser(child);
      }} // handleSelectSurveyors
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          columnGap: "0.6rem",
        }}
      >
        {selectedUsers.includes(surveyor_id) ? (
          <MdDone color="rgba(132, 147, 178, 1)" />
        ) : (
          <MdDone color="#fff" />
        )}

        <div
          style={{
            width: "2rem",
            height: "2rem",
          }}
        >
          <img
            src={surveyor_img}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </div>
        <div>{surveyor_name}</div>
      </div>
      <div>Assigned task(10)</div>
    </div>
  );
}
