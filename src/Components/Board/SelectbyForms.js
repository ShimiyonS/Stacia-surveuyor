import React, { useState } from "react";
import { SiGoogleforms } from "react-icons/si";

const formData = [
  {
    id: 1,
    formName: "Lorem Ipsum has dbwjy kh...",
    tags: "Customer Feedback",
  },
  {
    id: 2,
    formName: "Lorem Ipsum has dwnkjhud...",
    tags: "Customer Feedback",
  },
  {
    id: 3,
    formName: "Lorem Ipsum has dqgjh...",
    tags: "Farmer Feedback",
  },
  {
    id: 3,
    formName: "Lorem Ipsum has dqgjh...",
    tags: "Farmer Feedback",
  },
  {
    id: 3,
    formName: "Lorem Ipsum has dqgjh...",
    tags: "Farmer Feedback",
  },
];

const FormTemplate = ({ formName, tags }) => {
  return (
    <div className="board-form-template">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          columnGap: "0.5rem",
        }}
      >
        <div className="board-form-icon">
          <SiGoogleforms color="#fff" />
        </div>
        <div className="board-form-txt">{formName}</div>
      </div>
      <div className="board-form-tag">{tags}</div>
    </div>
  );
};

export default function SelectByForms() {
  const [openFormFrameModal, setOpenFormFrameModal] = useState(false);

  const handleFormModal = () => {
    setOpenFormFrameModal(!openFormFrameModal);
  };

  return (
    <div className="create-board-based-form">
      <div className="form-frame-txt" onClick={handleFormModal}>
        Select board by forms
      </div>
      {openFormFrameModal && (
        <div className="select-form-pop-below">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                fontSize: "1.2rem",
                fontFamily: "EuclidMedium",
              }}
            >
              Forms
            </div>
            <input type="text" placeholder="Search" />
          </div>
          <div
            style={{
              marginTop: "1rem",
            }}
          >
            {formData.map(({ formName, tags }) => (
              <FormTemplate formName={formName} tags={tags} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
