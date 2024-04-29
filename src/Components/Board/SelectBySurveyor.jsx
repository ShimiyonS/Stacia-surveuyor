import axios from "axios";
import React, { useEffect, useState } from "react";
import { SiGoogleforms } from "react-icons/si";
import UserSelectTemplate from "../TaskList/UserSelectTemplate";

const data = [
  {
    label: "ariyalur",
    labelId: 1,
    value: "a",
    regionImg:
      "https://upload.wikimedia.org/wikipedia/commons/3/32/Chennai_Central.jpg",
    children: [
      {
        label: "Ponbaskar",
        value: "ponbaskar",
        imgSrc:
          "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Walter_White_S5B.png/220px-Walter_White_S5B.png",
      },
      {
        label: "Ramasamy",
        value: "ramasamy",
        imgSrc:
          "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Walter_White_S5B.png/220px-Walter_White_S5B.png",
      },
    ],
  },
  {
    label: "chennai",
    labelId: 1,
    value: "c",
    regionImg:
      "https://upload.wikimedia.org/wikipedia/commons/3/32/Chennai_Central.jpg",
    children: [
      {
        label: "Ponbaskar",
        value: "ponbaskar",
        imgSrc:
          "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Walter_White_S5B.png/220px-Walter_White_S5B.png",
      },
      {
        label: "Ramasamy",
        value: "ramasamy",
        imgSrc:
          "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Walter_White_S5B.png/220px-Walter_White_S5B.png",
      },
    ],
  },
  {
    label: "madurai",
    regionImg:
      "https://assets-news.housing.com/news/wp-content/uploads/2022/07/28160317/Madurai-feature-compressed.jpg",
    labelId: 2,
    value: "m",
    children: [
      {
        label: "baskar",
        value: "baskar",
        imgSrc:
          "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Walter_White_S5B.png/220px-Walter_White_S5B.png",
      },
    ],
  },
  {
    label: "chengalpet",
    regionImg:
      "https://www.shutterstock.com/image-photo/mahabalipuram-temple-famous-tamil-nadu-600nw-2154084347.jpg",
    labelId: 3,
    value: "c",
    children: [
      {
        label: "Ratheesh",
        value: "ratheesh",
        imgSrc:
          "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Walter_White_S5B.png/220px-Walter_White_S5B.png",
      },
      {
        label: "Rithvik",
        value: "rithvik",
        imgSrc:
          "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Walter_White_S5B.png/220px-Walter_White_S5B.png",
      },
      {
        label: "Seeman",
        value: "seeman",
        imgSrc:
          "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Walter_White_S5B.png/220px-Walter_White_S5B.png",
      },
      {
        label: "Raja",
        value: "raja",
        imgSrc:
          "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Walter_White_S5B.png/220px-Walter_White_S5B.png",
      },
    ],
  },
  {
    label: "virudhunagar",
    regionImg:
      "https://1.bp.blogspot.com/-tm0VkMox8FU/XTg89NB1xMI/AAAAAAAAKCc/FSOocD6phP0wC9EWb9urV2W5F3zYK3oDQCLcBGAs/s1600/Virudhunagar_Top_Angle-useful%2Bdirectories.jpg",
    labelId: 4,
    value: "v",
    children: [
      {
        label: "Raja",
        value: "raja",
        imgSrc:
          "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Walter_White_S5B.png/220px-Walter_White_S5B.png",
      },
      {
        label: "Ratheesh",
        value: "ratheesh",
        imgSrc:
          "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Walter_White_S5B.png/220px-Walter_White_S5B.png",
      },
      {
        label: "Rithvik",
        value: "rithvik",
        imgSrc:
          "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Walter_White_S5B.png/220px-Walter_White_S5B.png",
      },
      {
        label: "Raja",
        value: "raja",
        imgSrc:
          "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Walter_White_S5B.png/220px-Walter_White_S5B.png",
      },
    ],
  },
];

const TagTemplate = ({ formName, tags }) => {
  return (
    <div className="board-form-template">
      <div className="board-form-tag">{tags}</div>
    </div>
  );
};

export default function SelectBySurveyor({ setSelectedID, setSelectedUsers, setType }) {
  const [openFormFrameModal, setOpenFormFrameModal] = useState(false);
  const [sortArr, setSortArr] = useState([]);
  const [selectSurveyor, setSelectSurveyor] = useState();

  const [surveyors, setSurveyors] = useState(null);
  const [loading, setLoading] = useState(false);

  // a-z arr
  const azArr = [];
  const [selectedLetter, setSelectedLetter] = useState("");

  const handleFormModal = () => {
    setOpenFormFrameModal(!openFormFrameModal);
  };

  const handleSort = (letter) => {
    setSelectedLetter(letter);
    const sortedData = data.filter(({ value }) => {
      return value === letter;
    });
    setSortArr(sortedData);
  };

  for (let i = 97; i <= 122; i++) {
    azArr.push(String.fromCharCode(i));
  }

  const handleSelectUser = async (selectedSurveyorData) => {
    console.log("---------",selectedSurveyorData._id);
    setSelectedID(selectedSurveyorData._id);
    setType("surveyor");
    // try {
    //   const res = await axios.get(
    //     `http://192.168.0.115:8001/task/task-board/660aa4d54a8e525d204aaa77?query=surveyor&id=${selectedSurveyorData._id}`
    //   );
    //   setSelectedUsers(res.data.data);
    //   setSelectSurveyor(selectedSurveyorData);
    //   setSelectedID(selectedSurveyorData._id);
    // } catch (err) {
    //   console.log(err.message);
    // }
  };

  // useEffect(() => {
  //   handleSort("a");
  // }, []);

  const selectBySurveyor = async (selectedLetter) => {
    try {
      const users = await axios.get(
        `http://192.168.0.115:8000/user/surveyors?query=${selectedLetter}`
      );
      setSurveyors(users.data.data);
      setLoading(true);
      setSelectedLetter(selectedLetter);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    selectBySurveyor("a");
    console.log(surveyors);
  }, []);

  console.log("renders....");

  return (
    <div className="create-board-based-form">
      <div className="form-frame-txt" onClick={handleFormModal}>
        Select board by surveyor
      </div>
      {openFormFrameModal && (
        <div className="select-surveyor-pop-below">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="pop-over-surveyor-txt">Surveyor</div>
            <input placeholder="Search" className="pop-over-surveyor-search" />
          </div>
          <div className="surveyor-data-container">
            {loading &&
              surveyors.map((data) => (
                <div
                  style={{
                    marginTop: "1rem",
                  }}
                >
                  <div className="surveyor-region-txt">
                    <span
                      style={{
                        marginRight: "0.6rem",
                      }}
                    >
                      <input type="checkbox" />
                    </span>
                    {data.district}
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "1px",
                      backgroundColor: "rgba(211, 220, 229, 1)",
                      marginBottom: "1rem",
                    }}
                  ></div>
                  {data.users.map((child) => (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0.4rem",
                        cursor: "pointer",
                        fontFamily: "EuclidMedium",
                        color: "rgba(132, 147, 178, 1)",
                      }}
                      onClick={() => {
                        setOpenFormFrameModal(false);
                        handleSelectUser(child);
                      }} // handleSelectSurveyors
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          columnGap: "0.6rem",
                        }}
                      >
                        <div
                          style={{
                            width: "2rem",
                            height: "2rem",
                          }}
                        >
                          <img
                            src={child.dpFullUrl}
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <div>{child.fullName}</div>
                      </div>
                      <div>Assigned task({child.taskCount})</div>
                    </div>
                  ))}
                </div>
              ))}
          </div>
          <div
            style={{
              width: "100%",
              height: "1px",
              backgroundColor: "rgba(211, 220, 229, 1)",
            }}
          ></div>
          <div className="surveyor-sort-container">
            <div
              style={{
                display: "flex",
                height: "40%",
                columnGap: "0.3rem",
                // backgroundColor: "red",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {azArr.map((letter) => (
                <div
                  className="sorted-letters"
                  onClick={() => selectBySurveyor(letter)}
                  style={{
                    backgroundColor:
                      letter === selectedLetter
                        ? "rgba(27, 81, 187, 1)"
                        : "#fff",
                    color:
                      letter === selectedLetter
                        ? "#fff"
                        : "rgba(132, 147, 178, 1)",
                    // padding: "2px",
                    borderRadius: "0.2rem",
                    fontFamily: "EuclidRegular",
                  }}
                >
                  {letter}
                </div>
              ))}
            </div>
            <div className="img-sort">
              {data.map(({ label, regionImg, value }) => (
                <div
                  className="popover-img-box"
                  onClick={() => selectBySurveyor(value)}
                >
                  <div
                    style={{
                      width: "7rem",
                      height: "3rem",
                    }}
                  >
                    <img
                      src={regionImg}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "0.3rem",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      color: "rgba(132, 147, 178, 1)",
                      fontSize: "0.8rem",
                      fontFamily: "EuclidRegular",
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectSurveyor != null && (
        <div className="selected-surveyor-template">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "rgba(27, 81, 187, 0.1)",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                columnGap: "1rem",
              }}
            >
              <div className="selected-surveyor-img-box">
                <img
                  src={selectSurveyor.dpFullUrl}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <div className="selected-surveyor-name">
                {selectSurveyor.fullName}
              </div>
            </div>
            <div className="selected-surveyor-tasks">
              Assigned task({selectSurveyor.taskCount})
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
