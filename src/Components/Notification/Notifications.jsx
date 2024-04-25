import React from 'react'
import styled from 'styled-components';
import TaskNotification from './TaskNotification';
import TLMNotification from './TLMNotification';
import CalendarNotification from './CalendarNotification';
import RMNotification from './RMNotification';
import "../../Styles/Notification/Notification.css";
import StackedCards from './StackedCards';

const NotificationPageContainer = styled.div`
width: calc(100% - 4.2rem);
max-height: calc(100vh - 4rem);
height: calc(100vh - 4rem);
margin-left: 4.2rem;
background-color: rgba(239, 242, 244, 1);
padding: 1rem;
/* display: flex; */
`;

const NotificationInnerLayer = styled.div`
    height: 100%;
    width: 100%;
    background-color: rgba(255, 255, 255, 1);
    padding: 1.5rem 3rem;
    overflow-y: scroll;
    &::-webkit-scrollbar{
      display: none;  
    }
`



export default function Notifications() {
  const cards = [
    "Card 1", "Card 2", "Card 3", "Card 4", "Card 5"
  ];

  return (
    <NotificationPageContainer>
      <NotificationInnerLayer>
        <TaskNotification />
        <TLMNotification />
        <CalendarNotification />
        <RMNotification />
        {/* <StackedCards /> */}
      </NotificationInnerLayer>
    </NotificationPageContainer>
  )
}
