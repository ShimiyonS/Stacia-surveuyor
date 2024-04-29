import React, { useState } from "react";
import DatePicker from "react-mobile-datepicker";

export default function SelectByTimeFrame() {
  const [openTimeFrameModal, setOpenTimeFrameModal] = useState(false);
  const [time, setTime] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const handleTimeModal = () => {
    setOpenTimeFrameModal(!openTimeFrameModal);
  };

  const handleSelect = (time) => {
    setTime(time);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const monthMap = {
    1: "01",
    2: "02",
    3: "03",
    4: "04",
    5: "05",
    6: "06",
    7: "07",
    8: "08",
    9: "09",
    10: "10",
    11: "11",
    12: "12",
  };

  const dateConfig = {
    date: {
      format: "DD",
      caption: "DD",
      step: 1,
    },
    month: {
      format: (value) => monthMap[value.getMonth() + 1],
      caption: "MM",
      step: 1,
    },
    year: {
      format: "YYYY",
      caption: "YYYY",
      step: 1,
    },
  };

  return (
    <>
      <div className="create-board-based-time">
        <div className="time-frame-txt" onClick={handleTimeModal}>
          Select board by time frame
        </div>
        {openTimeFrameModal && (
          <div className="select-time-pop-below">
            <div
              className="pop-below-txt"
              onClick={() => {
                setOpenTimeFrameModal(false);
                setIsOpen(true);
              }}
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
      
    </>
  );
}
