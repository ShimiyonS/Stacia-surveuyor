import axios from "axios";
import React, { useEffect, useState } from "react";
import { SiGoogleforms } from "react-icons/si";

// const formData = [
//   {
//     id: 1,
//     formName: "Lorem Ipsum has dbwjy kh...",
//     tags: "Customer Feedback",
//   },
//   {
//     id: 2,
//     formName: "Lorem Ipsum has dwnkjhud...",
//     tags: "Customer Feedback",
//   },
//   {
//     id: 3,
//     formName: "Lorem Ipsum has dqgjh...",
//     tags: "Farmer Feedback",
//   },
//   {
//     id: 3,
//     formName: "Lorem Ipsum has dqgjh...",
//     tags: "Farmer Feedback",
//   },
//   {
//     id: 3,
//     formName: "Lorem Ipsum has dqgjh...",
//     tags: "Farmer Feedback",
//   },
// ];

const FormTemplate = ({
  formName,
  formId,
  setSelectedForm,
  setOpenFormFrameModal,
  setSelectedID,
  setType
}) => {
  return (
    <div
      className="board-form-template"
      onClick={() => {
        setOpenFormFrameModal(false);
        setType("form");
        setSelectedID(formId);
        setSelectedForm({ formName: formName });
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
      {/* <div className="board-form-tag">{tags}</div> */}
    </div>
  );
};

export default function SelectByForms({ setSelectedID, setType }) {
  const [openFormFrameModal, setOpenFormFrameModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState();
  const [formData, setFormData] = useState(null);

  const handleFormModal = () => {
    setOpenFormFrameModal(!openFormFrameModal);
  };

  console.log("selected form", selectedForm);

  const getAllForms = async () => {
    try{
      const res = await axios.get('http://192.168.0.115:8001/form/all-lists');
      setFormData(res.data.data);
    }catch(err){
      console.log(err.message);
    }
  };

  useEffect(() => {
    getAllForms();
  }, []);

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
            {formData.map((data) => (
              <FormTemplate
                formName={data.name}
                formId={data.id}
                // tags={tags}
                setSelectedForm={setSelectedForm}
                setOpenFormFrameModal={setOpenFormFrameModal}
                setType={setType}
                setSelectedID={setSelectedID}
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
          {/* <div className="board-form-tag">{selectedForm.tags}</div> */}
        </div>
      )}
    </div>
  );
}
