import axios from "axios";
import React, { useEffect, useState } from "react";
import { SiGoogleforms } from "react-icons/si";

// const tagData = [
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

const TagTemplate = ({ tags, setSelectedTag, setSelectedID, setType }) => {
  return (
    <div
      className="board-form-template"
      onClick={() => {
        setSelectedTag({ tags: tags });
        setType("tags");
        setSelectedID(tags);
      }}
    >
      <div className="board-form-tag">{tags}</div>
    </div>
  );
};

export default function SelectByTags({ setSelectedID, setType }) {
  const [openFormFrameModal, setOpenFormFrameModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState();

  const [tagData, setTagData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleFormModal = () => {
    setOpenFormFrameModal(!openFormFrameModal);
  };

  const getAllTags = async () => {
    try {
      const res = await axios.get("http://192.168.0.115:8001/form/all-tags");
      console.log(res.data.data);
      setTagData(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getAllTags();
  }, []);

  return (
    <div className="create-board-based-form">
      <div className="form-frame-txt" onClick={handleFormModal}>
        Select board by tags
      </div>
      {openFormFrameModal && (
        <div className="select-form-pop-below">
          <div
            className="tags-container"
            style={{
              marginTop: "1rem",
            }}
          >
            {loading ? (
              <div>loading...</div>
            ) : (
              tagData.map((tag) => (
                <TagTemplate
                  // formName={formName}
                  tags={tag}
                  setSelectedTag={setSelectedTag}
                  setSelectedID={setSelectedID}
                  setType={setType}
                />
              ))
            )}
          </div>
        </div>
      )}
      {selectedTag != null && (
        <div className="selected-tag-template">
          <div
            style={{
              backgroundColor: "rgba(27, 81, 187, 0.1)",
              padding: "0.3rem",
              borderRadius: "0.4rem",
            }}
          >
            <div className="board-form-tag">{selectedTag.tags}</div>
          </div>
        </div>
      )}
    </div>
  );
}
