import React, { useState } from "react";

export default function SelectByStatus({ setSelectedID, setType }) {
  const [openStatusFrameModal, setOpenStatusFrameModal] = useState(false);

  const handleStatusModal = () => {
    setOpenStatusFrameModal(!openStatusFrameModal);
  };

  return (
    <div className="create-board-based-status">
      <div className="status-frame-txt" onClick={handleStatusModal}>
        Select board by Status frame
      </div>
      {openStatusFrameModal && (
        <div className="select-status-pop-below">
          <div className="status-box">
            <div className="select-circle"></div>
            <div className="task-board-status" id="status-initiated"
            onClick={() => {
              setType("status");
              setSelectedID('initiated');
            }}
            >
              Initiated
            </div>
          </div>
          <div className="status-box">
            <div className="select-circle"
            ></div>
            <div className="task-board-status" id="status-completed"
            onClick={() => {
              setType("status");
              setSelectedID('completed');
            }}
            >
              Completed
            </div>
          </div>
          <div className="status-box">
            <div className="select-circle"></div>
            <div className="task-board-status" id="status-pending"
            onClick={() => {
              setType("status");
              setSelectedID('pending');
            }}
            >
              Pending
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
