import React,{ useState } from 'react'
import styled from 'styled-components'
import TaskPageTopBar from '../Components/TaskPageTopBar'
import Board from '../Components/Board'

const TaskPageContainer = styled.div`
width: calc(100% - 4.2rem);
min-height: calc(100vh - 4rem);
margin-left: 4.2rem;
background-color: #EFF2F4;
`

export default function TaskPage() {
  const [filterType, setFilterType] = useState('');
  const [surveyorId, setSurveyorId] = useState('');

  console.log("TaskPage renders/...");

    return (
        <TaskPageContainer>
            <TaskPageTopBar 
            setFilterType={setFilterType}
            filterType={filterType}
            surveyorId={surveyorId}
            setSurveyorId={setSurveyorId}
            />
        </TaskPageContainer>
    )
}
