import React, { useEffect, useState } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { SiGoogleforms } from "react-icons/si";
import { MdOutlinePendingActions } from "react-icons/md";
import { BsTag } from "react-icons/bs";
import { MdOutlineExpandMore } from "react-icons/md";
import { MdDone } from "react-icons/md";
import SurveyorSelectTemplate from "../TaskList/SurveyorSelectTemplate";

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
        sid: 11,
        imgSrc:
          "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Walter_White_S5B.png/220px-Walter_White_S5B.png",
      },
      {
        label: "Ramasamy",
        value: "ramasamy",
        sid: 12,
        imgSrc:
          "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Walter_White_S5B.png/220px-Walter_White_S5B.png",
      },
    ],
  },
  {
    label: "chennai",
    labelId: 2,
    value: "c",
    regionImg:
      "https://upload.wikimedia.org/wikipedia/commons/3/32/Chennai_Central.jpg",
    children: [
      {
        label: "Ponbaskar",
        value: "ponbaskar",
        sid: 21,
        imgSrc:
          "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Walter_White_S5B.png/220px-Walter_White_S5B.png",
      },
      {
        label: "Ramasamy",
        value: "ramasamy",
        sid: 22,
        imgSrc:
          "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Walter_White_S5B.png/220px-Walter_White_S5B.png",
      },
    ],
  },
  {
    label: "madurai",
    regionImg:
      "https://assets-news.housing.com/news/wp-content/uploads/2022/07/28160317/Madurai-feature-compressed.jpg",
    labelId: 3,
    value: "m",
    children: [
      {
        label: "baskar",
        value: "baskar",
        sid: 31,
        imgSrc:
          "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Walter_White_S5B.png/220px-Walter_White_S5B.png",
      },
    ],
  },
  {
    label: "chengalpet",
    regionImg:
      "https://www.shutterstock.com/image-photo/mahabalipuram-temple-famous-tamil-nadu-600nw-2154084347.jpg",
    labelId: 4,
    value: "c",
    children: [
      {
        label: "Ratheesh",
        value: "ratheesh",
        sid: 41,
        imgSrc:
          "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Walter_White_S5B.png/220px-Walter_White_S5B.png",
      },
      {
        label: "Rithvik",
        value: "rithvik",
        sid: 42,
        imgSrc:
          "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Walter_White_S5B.png/220px-Walter_White_S5B.png",
      },
      {
        label: "Seeman",
        value: "seeman",
        sid: 43,
        imgSrc:
          "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Walter_White_S5B.png/220px-Walter_White_S5B.png",
      },
      {
        label: "Raja",
        value: "raja",
        sid: 44,
        imgSrc:
          "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Walter_White_S5B.png/220px-Walter_White_S5B.png",
      },
    ],
  },
  {
    label: "virudhunagar",
    regionImg:
      "https://1.bp.blogspot.com/-tm0VkMox8FU/XTg89NB1xMI/AAAAAAAAKCc/FSOocD6phP0wC9EWb9urV2W5F3zYK3oDQCLcBGAs/s1600/Virudhunagar_Top_Angle-useful%2Bdirectories.jpg",
    labelId: 5,
    value: "v",
    children: [
      {
        label: "Raja",
        value: "raja",
        sid: 51,
        imgSrc:
          "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Walter_White_S5B.png/220px-Walter_White_S5B.png",
      },
      {
        label: "Ratheesh",
        value: "ratheesh",
        sid: 52,
        imgSrc:
          "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Walter_White_S5B.png/220px-Walter_White_S5B.png",
      },
      {
        label: "Rithvik",
        value: "rithvik",
        sid: 53,
        imgSrc:
          "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Walter_White_S5B.png/220px-Walter_White_S5B.png",
      },
      {
        label: "Raja",
        value: "raja",
        sid: 54,
        imgSrc:
          "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Walter_White_S5B.png/220px-Walter_White_S5B.png",
      },
    ],
  },
];

const CreateboardTemplate = ({ type, icon }) => {
  const [openCreateboardExpand, setOpenCreateboardExpand] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        cursor: "pointer",
      }}
      onClick={() => setOpenCreateboardExpand(!openCreateboardExpand)}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            columnGap: "0.5rem",
          }}
        >
          {icon}
          <div
            style={{
              color: "rgba(27, 36, 54, 1)",
              fontFamily: "EuclidMedium",
              fontSize: "1rem",
            }}
          >
            {type}
          </div>
        </div>
        <MdOutlineExpandMore size={26} color="rgba(132, 147, 178, 1)" />
      </div>
      {openCreateboardExpand && (
        <div className="create-board-filter-expand">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget
          purus feugiat, eleifend turpis non, commodo metus. Ut facilisis
          facilisis odio, sed luctus lectus faucibus et. Praesent accumsan dui
          non quam sodales interdum vitae ut tortor. Integer ut ante ex. Mauris
          a eleifend odio, a feugiat leo. Morbi vitae augue erat. Donec et dolor
          id felis rutrum molestie. Duis ipsum justo, maximus quis molestie
          vitae, dignissim a leo. Sed velit diam, iaculis at tincidunt ut,
          pulvinar non odio. Curabitur fermentum posuere lacus sit amet laoreet.
          Sed mauris lectus, aliquet non efficitur ac, sodales in neque. Morbi
          eleifend, erat id finibus euismod, massa mauris molestie dolor, ut
          gravida sapien sapien eu purus. Nullam eu luctus sem, sed hendrerit
          arcu. Proin ullamcorper massa vel velit venenatis tincidunt. Fusce et
          lacus odio. Nulla nec interdum ex, sed dapibus ex. Proin congue non
          lectus vel fermentum. Cras interdum fringilla massa vitae eleifend.
          Proin rhoncus ex sed ex facilisis hendrerit. Donec consectetur dapibus
          neque.
        </div>
      )}
    </div>
  );
};

const SurveyorTemplate = ({
  img,
  name,
  id,
  handleWithoutAllselect,
  selectedUsers,
  // activeUser,
}) => {
  // const [selectedUsers, setSelectedUsers] = useState([]);

  console.log("new selected users.......", selectedUsers);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.4rem",
        cursor: "pointer",
        fontFamily: "EuclidMedium",
        color: "rgba(132, 147, 178, 1)",
        backgroundColor: selectedUsers.includes(id)
          ? "rgba(27, 81, 187, 0.1)"
          : "transparent",
        borderRadius: "0.2rem",
      }}
      onClick={() => {
        handleWithoutAllselect(id);
        // setOpenFormFrameModal(false);
        // handleSelectUser(child);
      }} // handleSelectSurveyors
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          columnGap: "0.6rem",
        }}
      >
        {selectedUsers.includes(id) ? (
          <MdDone color="rgba(132, 147, 178, 1)" />
        ) : (
          <MdDone color="#fff" />
        )}

        <div
          style={{
            width: "2rem",
            height: "2rem",
          }}
        >
          <img
            src={img}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </div>
        <div>{name}</div>
      </div>
      <div>Assigned task(10)</div>
    </div>
  );
};

export default function BoardFilter() {
  const [preset, setPreset] = useState(true);
  const [createboard, setCreateboard] = useState(false);
  const [openSelectSurveyor, setOpenSelectSurveyor] = useState(false);
  const [selectedAllUsers, setSelectedAllUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [activeSelectedSurveyors, setActiveSelectedSurveyors] = useState(false);

  const handleCreateboard = () => {
    setPreset(false);
    setCreateboard(true);
  };

  const handlePreset = () => {
    setCreateboard(false);
    setPreset(true);
  };

  const [sortArr, setSortArr] = useState([]);
  const [selectSurveyor, setSelectSurveyor] = useState();

  const [testArr2, setTestArr2] = useState([]);

  const testArr = [];

  // a-z arr
  const azArr = [];
  const [selectedLetter, setSelectedLetter] = useState("");

  // const handleFormModal = () => {
  //   setOpenFormFrameModal(!openFormFrameModal);
  // };

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

  useEffect(() => {
    handleSort("a");
  }, []);

  const handleToggle = (id) => {
    data.map(({ labelId, children }) => {
      if (labelId === id) {
        children.map(({ sid }) => testArr.push(sid));
      }
    });
    setTestArr2([...testArr2, testArr]);
    console.log("////////////////", testArr2, "///////////////");
    // if (selectedAllUsers.includes(id)) {
    //   setSelectedAllUsers(selectedAllUsers.filter((i) => i !== id));
    // } else {
    //   setSelectedAllUsers([...selectedAllUsers, id]);
    // }
  };

  const handleWithoutAllselect = (id) => {
    if (selectedUsers.includes(id)) {
      // setActiveSelectedSurveyors(false);
      setSelectedUsers(selectedUsers.filter((i) => i !== id));
    } else {
      // setActiveSelectedSurveyors(true);
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  const handleAllSelect = () => {};

  const dateRange = [
    "Unsigned",
    "Over due",
    "Due in the next day",
    "Due next week",
    "Due next month",
  ];

  const activity = [
    "Active from last week",
    "Active from last two week",
    "Active from last four week",
    "Without Active from last four week",
  ];

  const status = [
    {
      status: "Initiated",
      color: "rgba(207, 104, 30, 1)",
      bg: "rgba(255, 235, 168, 1)",
    },
    {
      status: "Completed",
      color: "rgba(0, 179, 72, 1)",
      bg: "rgba(58, 255, 137, 0.15)",
    },
    {
      status: "Pending",
      color: "rgba(221, 54, 31, 1)",
      bg: "rgba(255, 159, 159, 0.3)",
    },
  ];

  const createboardFilter = [
    {
      type: "Date range",
      icon: <IoCalendarOutline size={26} color="rgba(132, 147, 178, 1)" />,
      typeArr: ["22/02/2024", "20/02/2024-22/02/2024", "January 2024"],
    },
    {
      type: "Surveyor",
      icon: <IoPersonOutline size={26} color="rgba(132, 147, 178, 1)" />,
      typeArr: [
        {
          id: 1,
          imgSrc:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRums5TQ8iZunHQcCnqlI0LxsNjoAY-nkBNIw&usqp=CAU",
          surveyorName: "Ponbaskar",
          assignedTasks: 10,
          dueDate: "20/02/2024",
        },
        {
          id: 2,
          imgSrc:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRums5TQ8iZunHQcCnqlI0LxsNjoAY-nkBNIw&usqp=CAU",
          surveyorName: "Rocky balboa",
          assignedTasks: 10,
        },
        {
          id: 3,
          imgSrc:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRums5TQ8iZunHQcCnqlI0LxsNjoAY-nkBNIw&usqp=CAU",
          surveyorName: "mike tyson",
          assignedTasks: 10,
        },
      ],
    },
    {
      type: "Forms",
      icon: <SiGoogleforms size={26} color="rgba(132, 147, 178, 1)" />,
    },
    {
      type: "Status",
      icon: (
        <MdOutlinePendingActions size={26} color="rgba(132, 147, 178, 1)" />
      ),
    },
    {
      type: "Tags",
      icon: <BsTag size={26} color="rgba(132, 147, 178, 1)" />,
    },
  ];

  // console.log("selected users", selectedUsers);
  console.log("selected all users", selectedAllUsers);

  return (
    <div>
      <div
        style={{
          color: "rgba(27, 36, 54, 1)",
          fontSize: "1.1rem",
          fontFamily: "EuclidMedium",
          textAlign: "center",
          marginBottom: "0.6rem",
        }}
      >
        Filter
      </div>

      {/*  btns */}

      <div className="preset-createboard-btns">
        <div
          className="preset-btn"
          style={{
            backgroundColor: preset ? "rgba(27, 81, 187, 1)" : "transparent",
            color: preset ? "#fff" : "rgba(27, 81, 187, 1)",
          }}
          onClick={handlePreset}
        >
          Preset
        </div>
        <div
          className="preset-btn"
          style={{
            backgroundColor: createboard
              ? "rgba(27, 81, 187, 1)"
              : "transparent",
            color: createboard ? "#fff" : "rgba(27, 81, 187, 1)",
          }}
          onClick={handleCreateboard}
        >
          Create Board
        </div>
      </div>

      {/* check preset active */}

      {preset && (
        <>
          {/* preset */}

          <div className="preset-filter">
            <div
              className="preset-filter-select-surveyor"
              onClick={() => setOpenSelectSurveyor(!openSelectSurveyor)}
            >
              Select Surveyor
            </div>
            {openSelectSurveyor && (
              <div
                style={{
                  marginTop: "0.5rem",
                }}
                className="select-surveyor-pop-below"
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div className="pop-over-surveyor-txt">Surveyor</div>
                  <input
                    placeholder="Search"
                    className="pop-over-surveyor-search"
                  />
                </div>
                <div className="surveyor-data-container">
                  {sortArr.map((data) => (
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
                          onClick={() => {
                            handleToggle(data.labelId);
                          }}
                        >
                          <input type="checkbox" />
                        </span>
                        {data.label}
                      </div>
                      <div
                        style={{
                          width: "100%",
                          height: "1px",
                          backgroundColor: "rgba(211, 220, 229, 1)",
                          marginBottom: "1rem",
                        }}
                      ></div>
                      {data.children.map((child) => (
                        <SurveyorTemplate
                          name={child.label}
                          img={child.imgSrc}
                          id={child.sid}
                          handleWithoutAllselect={handleWithoutAllselect}
                          selectedUsers={selectedUsers}
                        />
                        // <SurveyorSelectTemplate
                        //   surveyor_img={child.label}
                        //   surveyor_name={child.label}
                        //   surveyor_id={child.id}
                        //   selectedUsers={selectedUsers}
                        //   handleWithoutAllselect={handleWithoutAllselect}
                        // />
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
                        onClick={() => handleSort(letter)}
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
                        onClick={() => handleSort(value)}
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
          </div>

          {/* date range */}

          <div className="preset-date-range-text">Date range</div>

          {dateRange.map((data) => (
            <div className="preset-date-range">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: "0.6rem",
                }}
              >
                <div className="preset-date-check-box"></div>
                <div className="preset-date-txt">{data}</div>
              </div>
            </div>
          ))}

          {/* activity */}
          <div className="preset-date-range-text">Activity</div>

          {activity.map((data) => (
            <div className="preset-date-range">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: "0.6rem",
                }}
              >
                <div className="preset-date-check-box"></div>
                <div className="preset-date-txt">{data}</div>
              </div>
            </div>
          ))}

          {/* status */}
          <div className="preset-date-range-text">Status</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {status.map(({ status, bg, color }) => (
              <div className="preset-date-range">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: "0.6rem",
                  }}
                >
                  <div className="preset-date-check-box"></div>
                  <div
                    style={{
                      color: color,
                      backgroundColor: bg,
                      fontSize: "1rem",
                      fontFamily: "EuclidMedium",
                      padding: "0.2rem 1rem",
                      borderRadius: "0.5rem",
                    }}
                  >
                    {status}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* clear */}

          <div
            style={{
              width: "100%",
              height: "1px",
              backgroundColor: "rgba(211, 220, 229, 1)",
              marginTop: "1.5rem",
            }}
          ></div>

          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              marginTop: "1rem",
            }}
          >
            <div className="preset-clear-btn">Clear All</div>
          </div>
        </>
      )}

      {/* check create board active */}

      {createboard && (
        <div className="create-board-filter-active">
          {createboardFilter.map(({ icon, type }) => (
            <CreateboardTemplate icon={icon} type={type} />
          ))}
        </div>
      )}
    </div>
  );
}
