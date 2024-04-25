import React, { useState } from 'react'
import styled from 'styled-components'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import TaskOptions from "../Assets/TaskOptions.svg"
import SurveyorImg from "../Assets/SurveyorImg.svg"
import {
    DndContext,
    closestCenter
} from "@dnd-kit/core"

import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy
} from "@dnd-kit/sortable"

const cardColors = [
    '#FCE5DF', '#E6E1FF', '#CDF3E6', '#FEE0FB', '#FBE5CE', '#FADFAB',
];

const textColors = [
    '#CD6F0E', '#4978C1', '#4C9B80', '#B46CAD', '#7768C1', '#9F6161'
];

const TaskData = [
    {
        data: 'Recently Assigned',
        tasks: [
            {
                id: 1,
                profileImg: '',
                color: '#FCE5DF',
                textColor: '#9F6161',
                taskName: 'Farmer survey list task Lorem.....',
                dueDate: '26/11/2023'
            },
            {
                id: 2,
                profileImg: '',
                color: '#E6E1FF',
                textColor: '#7768C1',
                taskName: 'Farmer survey list task Lorem.....',
                dueDate: '28/11/2023'
            },
            {
                id: 3,
                profileImg: '',
                color: '#CDF3E6',
                textColor: '#4C9B80',
                taskName: 'Farmer survey list task Lorem.....',
                dueDate: '28/11/2023'
            },
            {
                id: 4,
                profileImg: '',
                color: '#FBE5CE',
                textColor: '#CD6F0E',
                taskName: 'Farmer survey list task Lorem.....',
                dueDate: '26/12/2023'
            },
            {
                id: 4,
                profileImg: '',
                color: '#FBE5CE',
                textColor: '#CD6F0E',
                taskName: 'Farmer survey list task Lorem.....',
                dueDate: '26/12/2023'
            },
            {
                id: 4,
                profileImg: '',
                color: '#FBE5CE',
                textColor: '#CD6F0E',
                taskName: 'Farmer survey list task Lorem.....',
                dueDate: '26/12/2023'
            },
            {
                id: 3,
                profileImg: '',
                color: '#FEE0FB',
                taskName: 'Farmer survey list task Lorem.....',
                dueDate: '28/12/2023'
            }
        ]
    },
    {
        data: 'Due Next Week',
        tasks: [
            {
                id: 1,
                profileImg: '',
                color: '#FBE5CE',
                taskName: 'Farmer survey list task Lorem.....',
                dueDate: '26/12/2023'
            },
            {
                id: 2,
                profileImg: '',
                color: '#CBDBFD',
                taskName: 'Farmer survey list task Lorem.....',
                dueDate: '28/12/2023'
            },
            {
                id: 3,
                profileImg: '',
                color: '#FEE0FB',
                taskName: 'Farmer survey list task Lorem.....',
                dueDate: '28/12/2023'
            },

        ]
    },
    {
        data: 'Due next week',
        tasks: [
            {
                id: 1,
                profileImg: '',
                color: '#FCE5DF',
                textColor: '#9F6161',
                taskName: 'Farmer survey list task Lorem.....',
                dueDate: '26/11/2023'
            },
            {
                id: 2,
                profileImg: '',
                color: '#E6E1FF',
                textColor: '#7768C1',
                taskName: 'Farmer survey list task Lorem.....',
                dueDate: '28/11/2023'
            },
            {
                id: 3,
                profileImg: '',
                color: '#CDF3E6',
                textColor: '#4C9B80',
                taskName: 'Farmer survey list task Lorem.....',
                dueDate: '28/11/2023'
            },
            {
                id: 4,
                profileImg: '',
                color: '#FBE5CE',
                textColor: '#CD6F0E',
                taskName: 'Farmer survey list task Lorem.....',
                dueDate: '26/12/2023'
            },
            {
                id: 4,
                profileImg: '',
                color: '#FBE5CE',
                textColor: '#CD6F0E',
                taskName: 'Farmer survey list task Lorem.....',
                dueDate: '26/12/2023'
            },
            {
                id: 4,
                profileImg: '',
                color: '#FBE5CE',
                textColor: '#CD6F0E',
                taskName: 'Farmer survey list task Lorem.....',
                dueDate: '26/12/2023'
            },
            {
                id: 3,
                profileImg: '',
                color: '#FEE0FB',
                taskName: 'Farmer survey list task Lorem.....',
                dueDate: '28/12/2023'
            }
        ]
    },
    {
        data: 'Due next week',
        tasks: [
            {
                id: 1,
                profileImg: '',
                color: '#FCE5DF',
                textColor: '#9F6161',
                taskName: 'Farmer survey list task Lorem.....',
                dueDate: '26/11/2023'
            },
            {
                id: 2,
                profileImg: '',
                color: '#E6E1FF',
                textColor: '#7768C1',
                taskName: 'Farmer survey list task Lorem.....',
                dueDate: '28/11/2023'
            },
            {
                id: 3,
                profileImg: '',
                color: '#CDF3E6',
                textColor: '#4C9B80',
                taskName: 'Farmer survey list task Lorem.....',
                dueDate: '28/11/2023'
            },
            {
                id: 4,
                profileImg: '',
                color: '#FBE5CE',
                textColor: '#CD6F0E',
                taskName: 'Farmer survey list task Lorem.....',
                dueDate: '26/12/2023'
            },
        ]
    },

];

const Board1 = styled.div`
    width: 95%;
    min-height: calc(100vh - 140px);
    margin: 0 auto;
    display: flex;
    column-gap: 30px;
    margin-top: 5px;
    color: #323232;
    background-color: #fff;
    overflow-x: scroll;
    padding: 5px;
  `

const TaskCard = styled.div`
    /* background-color: pink; */
    margin-bottom: 14px;
    border-radius: 8px;
    height: 75px;
    padding: 0px 10px;
    display: flex;
    column-gap: 15px;
    align-items: center;
 `

const TaskSection = styled.div`
    height: 100%;
    max-height: 80vh;
    /* height: 100%; */
    min-width: 320px;
    border-radius: 10px;
    /* border: 2px solid var(--border-line-color, #D5E8FF); */
    padding: 0px 15px;
    /* background-color: pink; */
    cursor: pointer;
    overflow-y: scroll;

    &:hover{
    border: 2px solid var(--border-line-color, #D5E8FF);
    }
 `

const SectionLine = styled.div`
        width: 95%;
        margin: 0 auto;
        height: 1px;
        background-color: #D5E8FF;
        margin-top: 15px;
    `

const TaskImgBehind = styled.div`
        width: 48px;
        height: 48px;
        background-color: #fff;
        border-radius: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
    `

const TaskDesc = styled.p`
        
    `

const ThreeDots = styled.div`
        display: flex;
        flex-direction: column;
        gap: 2px;
    `

const ThreeDot = styled.div`
        width: 4px;
        height: 4px;
        background-color: grey;
        border-radius: 3px;
    `

export default function Board() {


    const [cardColor, setCardColor] = useState('');

    return (
        <Board1 className='scroll-tasks'>
            {
                TaskData.map((data, index) => (
                    <TaskSection key={index} className='scroll-tasks'
                        draggable
                    >
                        {/* {setCardColor(cardColors[cardColors.length * Math.random() | 0])} */}
                        <div style={{ position: 'sticky', top: '0', backgroundColor: '#fff', padding: '12px 0px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
                                <h3>{data.data}</h3>
                                <img src={TaskOptions} alt="" />
                            </div>
                            <SectionLine></SectionLine>
                        </div>
                        <div style={{ marginTop: '20px' }}>
                            {
                                data.tasks.map((task) => (
                                    <TaskCard style={{ backgroundColor: cardColors[cardColors.length * Math.random() | 0] }}>
                                        <TaskImgBehind>
                                            <img src={SurveyorImg} alt="" width={'42px'} height={'42px'} />
                                        </TaskImgBehind>
                                        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                                            <div>
                                                <TaskDesc style={{ color: task.textColor, fontWeight: '600' }}>
                                                    {task.taskName}
                                                </TaskDesc>
                                                <TaskDesc style={{ color: task.textColor, }}>
                                                    {task.dueDate}
                                                </TaskDesc>
                                            </div>
                                            <ThreeDots>
                                                <ThreeDot></ThreeDot>
                                                <ThreeDot></ThreeDot>
                                                <ThreeDot></ThreeDot>
                                            </ThreeDots>
                                        </div>
                                    </TaskCard>
                                ))
                            }
                        </div>
                    </TaskSection>
                ))
            }
        </Board1>
    )
}
