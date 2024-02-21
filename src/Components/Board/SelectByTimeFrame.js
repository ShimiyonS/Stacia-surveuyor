import React, { useState } from "react";

export default function SelectByTimeFrame() {
  const [openTimeFrameModal, setOpenTimeFrameModal] = useState(false);

  const handleTimeModal = () => {
    setOpenTimeFrameModal(!openTimeFrameModal);
  };

  return (
    <div className="create-board-based-time">
      <div className="time-frame-txt" onClick={handleTimeModal}>
        Select board by time frame
      </div>
      {openTimeFrameModal && (
        <div className="select-time-pop-below">
          <div
            className="pop-below-txt"
            // onClick={() => handleBoardfilter("timeframe")}
          >
            Date
          </div>
          <div
            className="pop-below-txt"
            // onClick={() => handleBoardfilter("task")}
          >
            Date range
          </div>
          <div
            className="pop-below-txt"
            // onClick={() => handleBoardfilter("surveyor")}
          >
            Month
          </div>
          <div
            className="pop-below-txt"
            // onClick={() => handleBoardfilter("forms")}
          >
            Year
          </div>
        </div>
      )}
    </div>
  );
}
