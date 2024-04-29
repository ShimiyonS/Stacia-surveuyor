import React, { useContext, useEffect, useState } from 'react'
import "../Styles/TaskListView.css"
import OverallStat from './TaskList/OverallStat'
import TaskTable from './TaskList/TaskTable'
import axios from 'axios';
import { PageContext } from '../Context/PageContext';
import { MdStar } from "react-icons/md";

export default function ListViewInTask({ filterType, surveyorId }) {
  const columns = [
    {
      Header: 'ID.no',
      accessor: '_id',
    },
    {
      Header: 'Task',
      accessor: 'taskName',
    },
    {
      Header: 'Assigned By',
      accessor: 'surveyorDetails.fullName',
    },
    {
      Header: 'Location',
      accessor: 'location',
    },
    {
      Header: 'Due Date',
      accessor: 'dueDate',
    },
    {
      Header: 'Status',
      accessor: 'status',
    },
    {
      Header: '',
      accessor: 'isBookmarked',
      Cell: ({row}) => {
        return row.original.isBookMarked &&  <MdStar />
      }
    },
    {
      Header: '',
      accessor: 'options',
      // Cell: () => (
      //   <div style={{ textAlign: 'center' }}>
      //     <span>⋮</span> {/* Vertical ellipsis icon or any other icon */}
      //   </div>
      // ),
      id: 'optionsColumn',
    },
  ];


  const [taskList, setTaskList] = useState(null);
  const [loading, setLoading] = useState(true);
  const { unassigned, taskListStatus, listDateFilter } = useContext(PageContext);

  const getTaskListView = async () => {
    // console.log("iiiiii",surveyorId[0])
    try {
      // if (filterType) {
      // const res = await axios.get(`http://192.168.0.115:8001/task/managers/660aa4d54a8e525d204aaa77?status=${filterType}&?surveyorIds=${surveyorId}`);
      const res = await axios.get(`http://192.168.0.115:8001/task/managers/660aa4d54a8e525d204aaa77`, {
        params: {
          status: taskListStatus,
          surveyorIds: surveyorId,
          dateQuery: listDateFilter
        }
      });
      console.log(res.data.success);
      if (res.data.success) {
        console.log(res.data.data);
        setTaskList(res.data.data);
        setLoading(false);  
      }else{
        setLoading(true);
      }
      
      // } else {
      //   const res = await axios.get('http://192.168.0.115:8001/task/managers/660aa4d54a8e525d204aaa77');
      //   console.log(res.data.data);
      //   setTaskList(res.data.data);
      //   setLoading(false);
      // }
      // setTaskList(res.data.data);
      // setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getTaskListView();
    console.log("list view component renders", filterType);
  }, [taskListStatus, surveyorId, listDateFilter]);

  // console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&", taskListStatus);
  // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%", listDateFilter);


  return (
    <div className="task-list-view">
      <div className='task-list-view1'>
        <OverallStat />
      </div>

      <div className="table-data">
        <div style={{ width: '100%', height: '0.5px', background: '#E1E2E9' }}></div>
        {
          loading
            ? (
              <div>Loading...</div>
            )
            :
            (
              <TaskTable columns={columns} data={taskList} setData={setTaskList} />
            )
        }
      </div>
    </div>
  )
}
