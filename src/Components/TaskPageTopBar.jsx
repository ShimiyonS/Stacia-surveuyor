import React, { useState } from 'react'
import styled from 'styled-components'
import Create from "../Assets/CreateTask.svg";
import Filter from "../Assets/Filter.svg";
import Sort from "../Assets/Sort.svg";
import Board from './Board';
// import Calendar from './CalendarView';
import ListViewInTask from './ListViewInTask';

import "../Styles/Task/TaskPageTopBar.css"
import { Navigate, useNavigate } from 'react-router-dom';
import CalendarView from './CalendarView';
import DrafAndDrop from './DrafAndDrop';
import BoardView from './Board/BoardView';
import Modal from 'react-modal'
import TablerowMoreOptions from './TaskList/TablerowMoreOptions';
import DateRangeFilter from './TaskList/DateRangeFilter';
import NewTable from './TaskList/NewTable';

export default function TaskPageTopBar() {

  const [listTabActive, setListTabActive] = useState(true);
  const [boardTabActive, setBoardTabActive] = useState(false);
  const [CalendarTabActive, setCalendarTabActive] = useState(false);

  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const TaskPageTopBar = styled.div`
    width: 95%;
    /* background-color: bisque; */
    height: 3rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `

  const TaskTabs = styled.div`
    display: flex;
    column-gap: 1.5rem;
  `
  const TaskTab = styled.div`
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.32px;
    cursor: pointer;
  `

  const TaskCTA = styled.div`
    display: flex;
    gap: 15px;
    align-items: center;
  `

  const CreateTask = styled.div`
    border-radius: 4.966px;
    border: 1.241px solid #1B51BB;
    background: #1B51BB;
    display: flex;
    align-items: center;
    padding: 0.5rem;
  `

  const FilterTask = styled.div`
    border-radius: 4.966px;
    border: 1.241px solid #9794AB;
    display: flex;
    align-items: center;
    padding: 0.5rem;
    
  `

  const ButtonText = styled.div`
  margin-left: 0.8rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 400;
  text-align: center;
`

  const FilterText = styled.div`
  margin-left: 0.8rem;
  color: #9794AB;
  font-size: 0.8rem;
  font-weight: 400;
  text-align: center;
`

  const customStyles = {
    content: {
      top: "13%",
      left: "60%",
      // marginRight: "-50%",
      width: "25%",
      height: "30%",
      borderRadius: "16px",
      // transform: "translate(-50%, -50%)",
    },
    overlay: {
      background: "rgba(0, 0, 0, 0)",
      // marginBottom: '4rem',
      zIndex: "999",
    },
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className='taskpage-topbar'>
        <div className='task-tabs'>
          <div className='task-tab' style={{ borderBottom: listTabActive && '3px solid #1B51BB', color: listTabActive ? '#1B51BB' : '#8493B2', fontWeight: listTabActive ? '600' : '500', }} onClick={() => {
            setBoardTabActive(false);
            setCalendarTabActive(false);
            setListTabActive(true);
          }}>
            List
          </div>
          <div className='task-tab' style={{ borderBottom: boardTabActive && '3px solid #1B51BB', color: boardTabActive ? '#1B51BB' : '#8493B2', fontWeight: boardTabActive ? '600' : '500' }} onClick={() => {
            setListTabActive(false);
            setBoardTabActive(true);
            setCalendarTabActive(false);
          }}>
            Board
          </div>
          <div className='task-tab' style={{ borderBottom: CalendarTabActive && '3px solid #1B51BB', color: CalendarTabActive ? '#1B51BB' : '#8493B2', fontWeight: CalendarTabActive ? '600' : '500' }} onClick={() => {
            setListTabActive(false);
            setBoardTabActive(false);
            setCalendarTabActive(true);
          }}>
            Calendar
          </div>
        </div>

        <div className='taskCTA'>
          <div className='date-range'
            onClick={openModal}
          >
            <img src={Sort} alt="" />
            <div className='filter-text'>Date range</div>
          </div>

          {/* <DateRangeFilter /> */}

          <div className='filter-task' onClick={() => setOpenFilterModal(!openFilterModal)}>
            <img src={Filter} alt="" />
            <div className='filter-text'>Filter</div>
          </div>

          <div className='create-task' onClick={() => navigate('/create-task')} >
            <img src={Create} alt="" />
            <div className='btn-text'>Create Task</div>
          </div>

        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onAfterOpen={openModal}
        onAfterClose={closeModal}
        style={customStyles}
      >
        <div className="location-task-data">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="region-text">Regions</div>
            {/* <img
                src={Close}
                alt=""
                onClick={closeModal}
                style={{ cursor: "pointer" }}
              /> */}
          </div>

        </div>
      </Modal>


      {
        openFilterModal && <div className="filter-modal">

        </div>
      }

      {
        boardTabActive && <BoardView />
      }

      {
        CalendarTabActive && <CalendarView />
      }

      {
        listTabActive && <ListViewInTask />
        // listTabActive && <NewTable />
      }
    </>
  )
}
