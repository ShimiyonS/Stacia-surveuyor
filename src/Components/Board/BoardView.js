import React, { useEffect, useMemo, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskCard from "./TaskCard";
import ThreeDots from "../../Assets/threedots.svg";
import { SlOptionsVertical } from "react-icons/sl";
import AddBoard from "./AddBoard";

const Card = ({ id, text, index, moveCard, tasks }) => {
  const [, ref] = useDrag({
    type: "CARD",
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: "CARD",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveCard(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const cardColors = [
    "rgba(119, 104, 193, 1)",
    "rgba(159, 97, 97, 1)",
    "rgba(76, 155, 128, 1)",
    "rgba(180, 108, 173, 1)",
    "rgba(73, 120, 193, 1)",
    "rgba(205, 111, 14, 1)",
  ];

  return (
    <>
      {index === 0 ? (
        <>
          <div
            // ref={(node) => ref(drop(node))}
            className="board-view-section"
            style={{
              minWidth: "19.8rem",
              width: "19.8rem",
              maxHeight: "calc(85vh - 4rem)",
              overflowY: "scroll",
              height: "100%",
              // padding: "0.5rem",
              marginTop: "1rem",
              borderRadius: "0.6rem",
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                position: "sticky",
                top: "0",
                padding: "0.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div className="board-view-task-section-title">{text}</div>
                <SlOptionsVertical color="#8493B2" />
              </div>
              <div
                style={{
                  borderBottom: "1.5px solid #D5E8FF",
                  marginTop: "1rem",
                }}
              ></div>
            </div>
            <div style={{ margin: "0.5rem" }}>
              {tasks.map((data, index) => (
                <TaskCard
                  data={data}
                  bgColor={cardColors[(cardColors.length * Math.random()) | 0]}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div
          ref={(node) => ref(drop(node))}
          className="board-view-section"
          style={{
            minWidth: "19.8rem",
            width: "19.8rem",
            maxHeight: "calc(85vh - 4rem)",
            overflowY: "scroll",
            height: "100%",
            // padding: "0.5rem",
            marginTop: "1rem",
            borderRadius: "0.6rem",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              position: "sticky",
              top: "0",
              padding: "0.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div className="board-view-task-section-title">{text}</div>
              <SlOptionsVertical color="#8493B2" />
            </div>
            <div
              style={{ borderBottom: "1.5px solid #D5E8FF", marginTop: "1rem" }}
            ></div>
          </div>
          <div style={{ margin: "0.5rem" }}>
            {tasks.map((data, index) => (
              <TaskCard
                data={data}
                bgColor={cardColors[(cardColors.length * Math.random()) | 0]}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const DragDropContainer = () => {
  const initialCards = [
    {
      id: 1,
      dueDate: "Recently assigned",
      tasks: [
        {
          tid: 100,
          tname: "Farmer survey list task Lorem ( adscc fgjugyj )",
          tdude: "26/11/2023",
        },
        {
          tid: 101,
          tname: "Farmer survey list task Lorem ( adscc fgjugyj )",
          tdude: "26/11/2023",
        },
        {
          tid: 102,
          tname: "Farmer survey list task Lorem ( adscc fgjugyj )",
          tdude: "26/11/2023",
        },
        {
          tid: 103,
          tname: "Farmer survey list task Lorem ( adscc fgjugyj )",
          tdude: "26/11/2023",
        },
        {
          tid: 103,
          tname: "Farmer survey list task Lorem ( adscc fgjugyj )",
          tdude: "26/11/2023",
        },
        {
          tid: 103,
          tname: "Farmer survey list task Lorem ( adscc fgjugyj )",
          tdude: "26/11/2023",
        },
        {
          tid: 103,
          tname: "Farmer survey list task Lorem ( adscc fgjugyj )",
          tdude: "26/11/2023",
        },
        {
          tid: 103,
          tname: "Farmer survey list task Lorem ( adscc fgjugyj )",
          tdude: "26/11/2023",
        },
        {
          tid: 103,
          tname: "Farmer survey list task Lorem ( adscc fgjugyj )",
          tdude: "26/11/2023",
        },
        {
          tid: 103,
          tname: "Farmer survey list task Lorem ( adscc fgjugyj )",
          tdude: "26/11/2023",
        },
        {
          tid: 103,
          tname: "Farmer survey list task Lorem ( adscc fgjugyj )",
          tdude: "26/11/2023",
        },
        {
          tid: 103,
          tname: "Farmer survey list task Lorem ( adscc fgjugyj )",
          tdude: "26/11/2023",
        },
        {
          tid: 103,
          tname: "Farmer survey list task Lorem ( adscc fgjugyj )",
          tdude: "26/11/2023",
        },
        {
          tid: 103,
          tname: "Farmer survey list task Lorem ( adscc fgjugyj )",
          tdude: "26/11/2023",
        },
        {
          tid: 103,
          tname: "Farmer survey list task Lorem ( adscc fgjugyj )",
          tdude: "26/11/2023",
        },
      ],
    },
    // {
    //   id: 2,
    //   dueDate: "Do next week",
    //   tasks: [
    //     {
    //       tid: 200,
    //       tname: "Farmer survey list task Lorem ( adscc fgjugyj )",
    //       tdude: "26/11/2023",
    //     },
    //     {
    //       tid: 201,
    //       tname: "Farmer survey list task Lorem ( adscc fgjugyj )",
    //       tdude: "26/11/2023",
    //     },
    //   ],
    // },
    // {
    //   id: 3,
    //   dueDate: "Due tomorrow",
    //   tasks: [
    //     {
    //       tid: 300,
    //       tname: "Farmer survey list task Lorem ( adscc fgjugyj )",
    //       tdude: "26/11/2023",
    //     },
    //     {
    //       tid: 301,
    //       tname: "Farmer survey list task Lorem ( adscc fgjugyj )",
    //       tdude: "26/11/2023",
    //     },
    //     {
    //       tid: 302,
    //       tname: "Farmer survey list task Lorem ( adscc fgjugyj )",
    //       tdude: "26/11/2023",
    //     },
    //   ],
    // },
    // {
    //   id: 4,
    //   dueDate: "Due today",
    //   tasks: [
    //     {
    //       tid: 400,
    //       tname: "Farmer survey list task Lorem ( adscc fgjugyj )",
    //       tdude: "26/11/2023",
    //     },
    //     {
    //       tid: 401,
    //       tname: "Farmer survey list task Lorem ( adscc fgjugyj )",
    //       tdude: "26/11/2023",
    //     },
    //     {
    //       tid: 402,
    //       tname: "Farmer survey list task Lorem ( adscc fgjugyj )",
    //       tdude: "26/11/2023",
    //     },
    //   ],
    // },
    // {
    //   id: 5,
    //   dueDate: "Due next month",
    //   tasks: [
    //     {
    //       tid: 500,
    //       tname: "Farmer survey list task Lorem ( adscc fgjugyj )",
    //       tdude: "26/11/2023",
    //     },
    //     {
    //       tid: 501,
    //       tname: "Farmer survey list task Lorem ( adscc fgjugyj )",
    //       tdude: "26/11/2023",
    //     },
    //     {
    //       tid: 502,
    //       tname: "Farmer survey list task Lorem ( adscc fgjugyj )",
    //       tdude: "26/11/2023",
    //     },
    //   ],
    // },
    // {
    //   id: 6,
    //   dueDate: "Due",
    //   tasks: [
    //     {
    //       tid: 600,
    //       tname: "Farmer survey list task Lorem ( adscc fgjugyj )",
    //       tdude: "26/11/2023",
    //     },
    //   ],
    // },
  ];
  // const memorizeCards = useMemo(() => initialCards, []);
  const [cards, setCards] = useState(initialCards);

  const moveCard = (fromIndex, toIndex) => {
    const updatedCards = [...cards];
    const [movedCard] = updatedCards.splice(fromIndex, 1);
    updatedCards.splice(toIndex, 0, movedCard);
    setCards(updatedCards);
  };

  useEffect(() => {
    const jsonData = JSON.stringify(cards);
    localStorage.setItem("testArray", jsonData);
  }, []);

  const handleAddBoard = (newBoardData) => {
    setCards((prevArray) => [...prevArray, newBoardData]);
  };

  useEffect(() => {
    const storedData = localStorage.getItem("testArray");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setCards(parsedData);
    }
  }, []);

  // const boardDetails = {
  //   id: 8,
  //   dueDate: "new box",
  //   tasks: [],
  // };

  // useEffect(() => {
  //   const boardData = JSON.stringify(cards);
  //   localStorage.setItem("boardData", boardData);
  //   console.log("boardData", boardData);
  // }, []);

  return (
    <div
      className="scroll-boards"
      style={{
        display: "flex",
        overflowX: "auto",
        width: "97%",
        padding: "0.2rem 1.5rem",
        margin: "1rem auto",
        columnGap: "1rem",
        backgroundColor: "#fff",
      }}
    >
      {/* <div
        style={{
          border: "1px solid red",
          padding: "1rem",
          cursor: "pointer",
        }}
        // onClick={() => handleAddBoard(boardDetails)}
      >
        add new board
      </div> */}
      {/* <RecentlyAssigned /> */}
      {cards != null &&
        cards.map((card, index) => (
          <Card
            key={index}
            id={card.id}
            text={card.dueDate}
            tasks={card.tasks}
            index={index}
            moveCard={moveCard}
          />
        ))}
      <AddBoard handleAddBoard={handleAddBoard} />
    </div>
  );
};

const BoardView = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <DragDropContainer />
    </DndProvider>
  );
};

export default BoardView;

// import React, { useState } from "react";

// const BoardView = () => {
//   const [boxes, setBoxes] = useState([]);

//   const addBox = (side) => {
//     // Create a new box object
//     const newBox = {
//       id: Date.now(),
//       side: side,
//     };

//     // Update the state with the new box
//     setBoxes((prevBoxes) => [...prevBoxes, newBox]);
//   };

//   return (
//     <div>
//       <button onClick={() => addBox("left")}>Add Box to Left</button>
//       <button onClick={() => addBox("right")}>Add Box to Right</button>

//       <div>
//         {boxes.map((box) => (
//           <div
//             key={box.id}
//             style={{ float: box.side, border: "1px solid red", height: '499px' }}
//           >
//             Box {box.id} on {box.side} side
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BoardView;
