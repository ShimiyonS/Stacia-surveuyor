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

const FormTemplate = ({
  formName,
  tags,
  setSelectedForm,
  setOpenFormFrameModal,
}) => {
  return (
    <div
      className="board-form-template"
      onClick={() => {
        setOpenFormFrameModal(false);
        setSelectedForm({ formName: formName, tags: tags });
      }}
    >
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
  const [selectedForm, setSelectedForm] = useState();

  const handleFormModal = () => {
    setOpenFormFrameModal(!openFormFrameModal);
  };

  console.log("selected form", selectedForm);

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
            className="forms-container"
            style={{
              marginTop: "1rem",
            }}
          >
            {formData.map(({ formName, tags }) => (
              <FormTemplate
                formName={formName}
                tags={tags}
                setSelectedForm={setSelectedForm}
                setOpenFormFrameModal={setOpenFormFrameModal}
              />
            ))}
          </div>
        </div>
      )}
      {selectedForm != null && (
        <div
          className="board-form-template"
          style={{
            border: "1px solid rgba(211, 220, 229, 1)",
            padding: "0.5rem",
            borderRadius: "0.4rem",
            marginTop: "0.6rem",
          }}
        >
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
            <div className="board-form-txt">{selectedForm.formName}</div>
          </div>
          <div className="board-form-tag">{selectedForm.tags}</div>
        </div>
      )}
    </div>
  );
}
