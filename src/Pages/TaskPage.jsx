import React from 'react'
import styled from 'styled-components'
import TaskPageTopBar from '../Components/TaskPageTopBar'
import Board from '../Components/Board'

export default function TaskPage() {
    const TaskPageContainer = styled.div`
    width: calc(100% - 4.2rem);
    min-height: calc(100vh - 4rem);
    margin-left: 4.2rem;
    background-color: #EFF2F4;
  `
    return (
        <TaskPageContainer>
            <TaskPageTopBar />
        </TaskPageContainer>
    )
}
