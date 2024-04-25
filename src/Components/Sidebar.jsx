import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import IsmartLogo from "../Assets/IsmartLogo.svg"
import OverViewLogo from "../Assets/OverView.png"
import TaskLogo from "../Assets/Task.svg"
import PersonLogo from "../Assets/PersonPage.svg"
import CalenderLogo from "../Assets/Calender.svg"
import RMLogo from "../Assets/RMLogo.png"
import FormsLogo from "../Assets/FormsLogo.png"
import ChatLogo from "../Assets/Chat.png"
import TodoLogo from "../Assets/TodoLogo.png"
import MoneyLogo from "../Assets/Money.svg"
import SettingsLogo from "../Assets/Settings.svg"
import LogOutLogo from "../Assets/LogOut.svg"
import { NavLink } from 'react-router-dom'
import "../Styles/Sidebar.css"
import { PageContext } from '../Context/PageContext'
import { RxDashboard } from "react-icons/rx";

const SideNavBar = styled.div`
/* background-color: pink; */
background-color: #fff;
/* width: 4.2rem; */
min-height: 100vh;
position: fixed;
top: 0;
left: 0;
display: flex;
flex-direction: column;
justify-content: space-between;
z-index: 100;
overflow-x: hidden;
transition: all 0.3s ease;
`

const SideBarTop = styled.div`
/* background-color: aquamarine; */
display: flex;
flex-direction: column;
/* align-items: center; */
`

const SideBarLinks = styled.div`
/* background-color: red; */
display: flex;
flex-direction: column;
/* align-items: center; */
gap: 2.5rem;
margin-top: 1.5rem;
margin-left: 1rem;

/* @media only screen and (min-width: 481px) and (max-width: 768px) {
    background-color: chartreuse;
}


@media only screen and (min-width: 769px) and (max-width: 1024px) {
    background-color: pink;
}

@media only screen and (min-width: 1025px) and (max-width: 1200px) {
    background-color: cadetblue;
}

@media only screen and (min-width: 1201px) {
    background-color: coral;
} */




/* @media (max-width: 786px) {
 background-color: pink;
} */
`

const SideBarBottom = styled.div`
/* background-color: aquamarine; */
display: flex;
flex-direction: column;
margin-left: 1rem;
/* align-items: center; */
/* justify-content: center; */
/* gap: 25px; */
`


export default function Sidebar() {
    const logos = [
        {
            link: '/',
            logo: OverViewLogo,
            page: 'Dashboard'
        },
        {
            link: '/surveyor-tasks',
            logo: TaskLogo,
            page: 'Task'
        },
        {
            link: '/profile',
            logo: PersonLogo,
            page: 'Profile'
        },
        {
            link: '/forms',
            logo: FormsLogo,
            page: 'Forms'
        },
        {
            link: '/calendar',
            logo: CalenderLogo,
            page: 'Calendar'
        },
        {
            link: '/chat',
            logo: ChatLogo,
            page: 'Chat'
        },
        {
            link: '/reimbursement',
            logo: RMLogo,
            page: 'Reimbursement'
        },
        {
            link: '/todo',
            logo: TodoLogo,
            page: 'Todo'
        },
    ];

    const { setPageName } = useContext(PageContext);
    const [isHovered, setIsHovered] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleHover = (index) => {
        setIsHovered(true);
        setHoveredIndex(index);
    };

    const handleLeave = () => {
        setIsHovered(false);
        setHoveredIndex(null);
    };

    const sidebarWidth = isHovered ? '14rem' : '4.2rem';

    return (
        <SideNavBar style={{ width: sidebarWidth }} onMouseLeave={handleLeave} >
            <SideBarTop>
                <div className="i-smart-logo">
                    <img src={IsmartLogo} alt="" />
                </div>
                <SideBarLinks>
                    {
                        logos.map((data, index) => (
                            <NavLink
                                // className="nav-link-active"
                                to={data.link}
                                className={({ isActive }) => (
                                    isActive ? 'nav-link-active active' : 'nav-link-active inactive'
                                )}
                                onClick={() => setPageName(data.page)}
                                onMouseEnter={() => handleHover(index)}
                            >
                                <img src={data.logo} alt="" key={index} style={{ width: '1.625rem', height: '1.625rem' }} />
                                {/* <div className='nav-text active'>{data.page}</div> */}
                                {data.page}
                            </NavLink>
                        ))
                    }
                </SideBarLinks>
            </SideBarTop>

            <SideBarBottom>
                <div className='side-bar-bottom-logo'>
                    <img src={SettingsLogo} alt="" />
                    <div>Settings</div>
                </div>
                <div className='side-bar-bottom-logo'>
                    <img src={LogOutLogo} alt="" />
                    <div>Logout</div>
                </div>
            </SideBarBottom>
        </SideNavBar>
    )
}
