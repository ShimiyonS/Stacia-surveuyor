import React, { useState } from "react";

export default function SelectByStatus() {
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
            <div className="task-board-status" id="status-initiated">
              Initiated
            </div>
          </div>
          <div className="status-box">
            <div className="select-circle"></div>
            <div className="task-board-status" id="status-completed">
              Completed
            </div>
          </div>
          <div className="status-box">
            <div className="select-circle"></div>
            <div className="task-board-status" id="status-pending">
              Pending
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
