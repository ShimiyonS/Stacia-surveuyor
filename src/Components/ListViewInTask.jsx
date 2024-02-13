import React, { useState } from 'react'
import "../Styles/TaskListView.css"
import OverallStat from './TaskList/OverallStat'
import TaskTable from './TaskList/TaskTable'

export default function ListViewInTask() {
  const columns = [
    {
      Header: 'ID.no',
      accessor: 'id',
    },
    {
      Header: 'Task',
      accessor: 'task',
    },
    {
      Header: 'Assigned By',
      accessor: 'assigned_by',
    },
    {
      Header: 'Location',
      accessor: 'location',
    },
    {
      Header: 'Due Date',
      accessor: 'due_date',
    },
    {
      Header: 'Status',
      accessor: 'status',
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

  const [data, setData] = useState([
    { id: '10000', task: 'Surveyor task', assigned_by: 'Dilip kumar', location: 'Chennai', due_date: '12 Aug 2022', status: 'Initiated', },
    { id: '10001', task: 'Surveyor task', assigned_by: 'Dilip kumar', location: 'Chennai', due_date: '12 Aug 2022', status: 'Pending', },
    { id: '10002', task: 'Surveyor task', assigned_by: 'Dilip kumar', location: 'Chennai', due_date: '12 Aug 2022', status: 'Initiated', },
    { id: '10003', task: 'Surveyor task', assigned_by: 'Dilip kumar', location: 'Chennai', due_date: '12 Aug 2022', status: 'Completed', },
    { id: '10004', task: 'Surveyor task', assigned_by: 'Dilip kumar', location: 'Chennai', due_date: '12 Aug 2022', status: 'Completed', },
    { id: '10005', task: 'Surveyor task', assigned_by: 'Dilip kumar', location: 'Chennai', due_date: '12 Aug 2022', status: 'Initiated', },
    { id: '10006', task: 'Surveyor task', assigned_by: 'Dilip kumar', location: 'Chennai', due_date: '12 Aug 2022', status: 'Pending', },
    { id: '10007', task: 'Surveyor task', assigned_by: 'Dilip kumar', location: 'Chennai', due_date: '12 Aug 2022', status: 'Initiated', },
    { id: '10008', task: 'Surveyor task', assigned_by: 'Dilip kumar', location: 'Chennai', due_date: '12 Aug 2022', status: 'Completed', },
    { id: '10009', task: 'Surveyor task', assigned_by: 'Dilip kumar', location: 'Chennai', due_date: '12 Aug 2022', status: 'Pending', },
    { id: '10010', task: 'Surveyor task', assigned_by: 'Dilip kumar', location: 'Chennai', due_date: '12 Aug 2022', status: 'Initiated', },

  ])

  // const data = [
  //   { id: '10023451', task: 'Surveyor task', assigned_by: 'Dilip kumar', location: 'Chennai', due_date: '12 Aug 2022', status: 'Initiated', },
  //   { id: '10123451', task: 'Surveyor task', assigned_by: 'Dilip kumar', location: 'Chennai', due_date: '12 Aug 2022', status: 'Completed' },
  //   { id: '10223451', task: 'Surveyor task', assigned_by: 'Dilip kumar', location: 'Chennai', due_date: '12 Aug 2022', status: 'Pending'   },
  //   { id: '10323451', task: 'Surveyor task', assigned_by: 'Dilip kumar', location: 'Chennai', due_date: '12 Aug 2022', status: 'Completed' },
  //   // { id: '104', task: 'Surveyor task', assigned_by: 'Dilip kumar', location: 'Chennai', due_date: '12 Aug 2022', status: 'Pending' },
  //   // { id: '105', task: 'Surveyor task', assigned_by: 'Dilip kumar', location: 'Chennai', due_date: '12 Aug 2022', status: 'Initiated' },
  //   // { id: '105', task: 'Surveyor task', assigned_by: 'Dilip kumar', location: 'Chennai', due_date: '12 Aug 2022', status: 'Completed' },
  //   // { id: '105', task: 'Surveyor task', assigned_by: 'Dilip kumar', location: 'Chennai', due_date: '12 Aug 2022', status: 'Pending' },
  //   // { id: '105', task: 'Surveyor task', assigned_by: 'Dilip kumar', location: 'Chennai', due_date: '12 Aug 2022', status: 'Completed' },
  //   // { id: '105', task: 'Surveyor task', assigned_by: 'Dilip kumar', location: 'Chennai', due_date: '12 Aug 2022', status: 'Completed' },
  //   // { id: '105', task: 'Surveyor task', assigned_by: 'Dilip kumar', location: 'Chennai', due_date: '12 Aug 2022', status: 'Pending' },
  //   // { id: '105', task: 'Surveyor task', assigned_by: 'Dilip kumar', location: 'Chennai', due_date: '12 Aug 2022', status: 'Initiated' },
  //   // { id: '105', task: 'Surveyor task', assigned_by: 'Dilip kumar', location: 'Chennai', due_date: '12 Aug 2022', status: 'Pending' },
  //   // { id: '105', task: 'Surveyor task', assigned_by: 'Dilip kumar', location: 'Chennai', due_date: '12 Aug 2022', status: 'Completed' },
  //   // { id: '105', task: 'Surveyor task', assigned_by: 'Dilip kumar', location: 'Chennai', due_date: '12 Aug 2022', status: 'Pending' },
  //   // { id: '105', task: 'Surveyor task', assigned_by: 'Dilip kumar', location: 'Chennai', due_date: '12 Aug 2022', status: 'Pending' },
  //   // { id: '105', task: 'Surveyor task', assigned_by: 'Dilip kumar', location: 'Chennai', due_date: '12 Aug 2022', status: 'Pending' },
  //   // { id: '105', task: 'Surveyor task', assigned_by: 'Dilip kumar', location: 'Chennai', due_date: '12 Aug 2022', status: 'Pending' },
  //   // { id: '105', task: 'Surveyor task', assigned_by: 'Dilip kumar', location: 'Chennai', due_date: '12 Aug 2022', status: 'Pending' },
  //   // { id: '105', task: 'Surveyor task', assigned_by: 'Dilip kumar', location: 'Chennai', due_date: '12 Aug 2022', status: 'Pending' },
  //   // { id: '105', task: 'Surveyor task', assigned_by: 'Dilip kumar', location: 'Chennai', due_date: '12 Aug 2022', status: 'Pending' },
  // ];


  return (
    <div className="task-list-view">
      <div className='task-list-view1'>
        <OverallStat />
      </div>

      <div className="table-data">
        <div style={{ width: '100%', height: '0.5px', background: '#E1E2E9' }}></div>
        <TaskTable columns={columns} data={data} setData={setData} />
      </div>
    </div>
  )
}
