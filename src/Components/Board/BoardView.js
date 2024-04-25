import React, { useContext, useEffect, useMemo, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskCard from "./TaskCard";
import ThreeDots from "../../Assets/threedots.svg";
import { SlOptionsVertical } from "react-icons/sl";
import AddBoard from "./AddBoard";
import axios from "axios";
import { PageContext } from "../../Context/PageContext";
import TablerowMoreOptions from "../TaskList/TablerowMoreOptions";
import BoardMoreOptions from "./BoardMoreOptions";

const Card = ({ id, title, index, moveCard, tasks, boardId, getBoardTask }) => {
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

    // delete board

    const deleteBoard = async () => {
      try{
        const res =  await axios.delete(`http://192.168.0.115:8001/board/delete/660aa4d54a8e525d204aaa77/${boardId}`);
        console.log(res.data);
      }catch(err){
        console.log(err.message);
      }
    };

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
                <div className="board-view-task-section-title">{title}</div>
                {/* <SlOptionsVertical color="#8493B2" /> */}
                <BoardMoreOptions handleDeleteRow={""} handleBookmark={""} />
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
              <div className="board-view-task-section-title">{title}</div>
              {/* <SlOptionsVertical color="#8493B2" /> */}
              <BoardMoreOptions 
              deleteBoard={deleteBoard}
              handleDeleteRow={""} handleBookmark={""} 
              getBoardTask={getBoardTask}
              />
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
  // const memorizeCards = useMemo(() => initialCards, []);
  const [cards, setCards] = useState(null);
  const [taskBoard, setTaskBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    filterByStatus,
    boardSurveyorId,
    boardViewStatus,
    setBoardViewStatus,
    boardDateFilter,
    boardRangeFilter,
  } = useContext(PageContext);

  // console.log("context data", filterByStatus);
  // console.log(boardDateFilter);

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

  const createBoard = async (boardData) => {
    // setCards((prevArray) => [...prevArray, boardData]);
    // console.log("task request for board creation", boardData);

    try {
      const res = await axios.post(
        `http://192.168.0.115:8001/board/create-board/${boardData.managerId}`,
        boardData
      );
      // console.log(res.data);
    } catch (err) {
      console.log(err.message);
    }

    // try {
    //   const res = await axios.get(
    //     `http://192.168.0.115:8001/task/task-board/660aa4d54a8e525d204aaa77?query=surveyor&id=${selectedID}`
    //   );
    //   setTaskBoard(res.data.data);
    //   console.log("board data:", res.data.data);
    // } catch (err) {
    //   console.log(err.message);
    // }
  };

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

  const getBoardTask = async () => {
    try {
      const res = await axios.get(
        `http://192.168.0.115:8001/board/task-board/660aa4d54a8e525d204aaa77`,
        {
          params: {
            status: boardViewStatus,
            surveyorIds: boardSurveyorId,
            dateQuery: boardDateFilter,
            date: boardRangeFilter,
          },
        }
      );
      // console.log(res.data.data);
      setCards(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getBoardTask();
  }, [boardViewStatus, boardSurveyorId, boardDateFilter, boardRangeFilter]);

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
            title={card.title}
            tasks={card.tasks}
            index={index}
            moveCard={moveCard}
            boardId={card.boardId}
            getBoardTask={getBoardTask}
          />
        ))}
      {/* <AddBoard handleAddBoard={handleAddBoard} /> */}
      <AddBoard createBoard={createBoard} />
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
