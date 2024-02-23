import React, { useState } from "react";
import Modal from "react-modal";
import { IoMdAdd } from "react-icons/io";
import SelectByTimeFrame from "./SelectByTimeFrame";
import SelectbyForms from "./SelectbyForms";
import SelectByStatus from "./SelectByStatus";
import SelectBySurveyor from "./SelectBySurveyor";
import SelectByTags from "./SelectByTags";

export default function AddBoard({ handleAddBoard }) {
  const [modal, setModal] = useState(false);
  const [isPopBelowVisible, setPopBelowVisible] = useState(false);

  // ways to display tasks inside new board state
  const [selectedFilter, setSelectedFilter] = useState("");

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const handlePopBelowToggle = () => {
    setPopBelowVisible(!isPopBelowVisible);
  };

  const [newBoardData, setNewBoardData] = useState("");
  const [title, setTitle] = useState("");

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "30%",
      height: "80%",
      borderRadius: "16px",
      transform: "translate(-50%, -50%)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.25)",
      zIndex: "999",
    },
  };

  const handleBoardfilter = (filterOption) => {
    setPopBelowVisible(false);
    setSelectedFilter(filterOption);
  };

  console.log(selectedFilter);

  return (
    <>
      <div className="add-board" onClick={openModal}>
        Add another board
      </div>

      <Modal
        isOpen={modal}
        onAfterOpen={openModal}
        onAfterClose={closeModal}
        style={customStyles}
      >
        <div>
          <div className="create-board-text">Create board</div>
          <input
            placeholder="Title"
            type="text"
            className="board-title"
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* create board by */}
          <div className="create-board-by-box">
            <IoMdAdd color="rgba(27, 36, 54, 1)" />
            <div className="create-board-by-txt" onClick={handlePopBelowToggle}>
              Create board by
            </div>
            {isPopBelowVisible && (
              <div className="select-pop-below">
                <div
                  className="pop-below-txt"
                  onClick={() => handleBoardfilter("timeframe")}
                >
                  Timeframe
                </div>
                <div
                  className="pop-below-txt"
                  onClick={() => handleBoardfilter("surveyor")}
                >
                  Surveyor
                </div>
                <div
                  className="pop-below-txt"
                  onClick={() => handleBoardfilter("forms")}
                >
                  Forms
                </div>
                <div
                  className="pop-below-txt"
                  onClick={() => handleBoardfilter("status")}
                >
                  Status
                </div>
                <div
                  className="pop-below-txt"
                  onClick={() => handleBoardfilter("tags")}
                >
                  Tags
                </div>
              </div>
            )}
          </div>
          {selectedFilter === "timeframe" && <SelectByTimeFrame />}
          {selectedFilter === "forms" && <SelectbyForms />}
          {selectedFilter === "status" && <SelectByStatus />}
          {selectedFilter === "surveyor" && <SelectBySurveyor />}
          {selectedFilter === "tags" && <SelectByTags />}
        </div>

        {/* cancel create btns */}

        <div className="create-board-btns">
          <div className="create-board-btns1" onClick={closeModal}>
            Cancel
          </div>
          <div
            className="create-board-btns2"
            onClick={() => {
              setModal(false);
              handleAddBoard({
                id: 9,
                dueDate: title,
                tasks: [
                  {
                    tid: 903,
                    tname: "Farmer survey list task Lorem ( adscc fgjugyj )",
                    tdude: "26/11/2023",
                  },
                  {
                    tid: 903,
                    tname: "Farmer survey list task Lorem ( adscc fgjugyj )",
                    tdude: "26/11/2023",
                  },
                  {
                    tid: 903,
                    tname: "Farmer survey list task Lorem ( adscc fgjugyj )",
                    tdude: "26/11/2023",
                  },
                ],
              });
            }}
          >
            Create
          </div>
        </div>
      </Modal>
    </>
  );
}
