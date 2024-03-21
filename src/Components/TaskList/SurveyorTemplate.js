import React from "react";
import { MdDone } from "react-icons/md";

export default function SurveyorTemplate({
  img,
  name,
  id,
  handleWithoutAllselect,
  selectedUsers,
  // activeUser,
}) {
  // const [selectedUsers, setSelectedUsers] = useState([]);

  console.log("new selected users.......", selectedUsers);

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
        backgroundColor: selectedUsers.includes(id)
          ? "rgba(27, 81, 187, 0.1)"
          : "transparent",
        borderRadius: "0.2rem",
      }}
      onClick={() => {
        handleWithoutAllselect(id);
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
        {selectedUsers.includes(id) ? (
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
            src={img}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </div>
        <div>{name}</div>
      </div>
      <div>Assigned task(10)</div>
    </div>
  );
}
