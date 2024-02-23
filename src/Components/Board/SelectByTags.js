import React, { useState } from "react";
import { SiGoogleforms } from "react-icons/si";

const tagData = [
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

const TagTemplate = ({ formName, tags, setSelectedTag }) => {
  return (
    <div
      className="board-form-template"
      onClick={() => setSelectedTag({ tags: tags })}
    >
      <div className="board-form-tag">{tags}</div>
    </div>
  );
};

export default function SelectByTags() {
  const [openFormFrameModal, setOpenFormFrameModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState();

  const handleFormModal = () => {
    setOpenFormFrameModal(!openFormFrameModal);
  };

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
            {tagData.map(({ formName, tags }) => (
              <TagTemplate
                formName={formName}
                tags={tags}
                setSelectedTag={setSelectedTag}
              />
            ))}
          </div>
        </div>
      )}
      {selectedTag != null && (
        <div className="selected-tag-template">
          <div
            style={{
              backgroundColor: 'rgba(27, 81, 187, 0.1)',
              padding: '0.3rem',
              borderRadius: '0.4rem'
            }}
          >
            <div className="board-form-tag">{selectedTag.tags}</div>
          </div>
        </div>
      )}
    </div>
  );
}
