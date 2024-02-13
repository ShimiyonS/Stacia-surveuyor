import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import IsmartLogo from "../Assets/IsmartLogo.svg"
import OverViewLogo from "../Assets/OverView.png"
import TaskLogo from "../Assets/Task.svg"
import PersonLogo from "../Assets/PersonPage.svg"
import CalenderLogo from "../Assets/Calender.svg"
import MoneyLogo from "../Assets/Money.svg"
import SettingsLogo from "../Assets/Settings.svg"
import LogOutLogo from "../Assets/LogOut.svg"
import { NavLink } from 'react-router-dom'
import "../Styles/Sidebar.css"
import { PageContext } from '../Context/PageContext'
import { RxDashboard } from "react-icons/rx";


export default function Sidebar() {
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
  `

    const SideBarTop = styled.div`
    /* background-color: aquamarine; */
    display: flex;
    flex-direction: column;
    /* align-items: center; */
  `

    const SideBarLinks = styled.div`
    /* background-color: bisque; */
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    gap: 2.5rem;
    margin-top: 1.5rem;
    margin-left: 1rem;
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
            link: '/calendar',
            logo: CalenderLogo,
            page: 'Calendar'
        },
        {
            link: '/reimbursement',
            logo: MoneyLogo,
            page: 'Reimbursement'
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
                                className="nav-link-active" to={data.link}
                                style={{ textDecoration: 'none' }}
                                onClick={() => setPageName(data.page)}
                                onMouseEnter={() => handleHover(index)}
                            >
                                <img src={data.logo} alt="" key={index} style={{ width: '1.7rem', height: '1.7rem' }} />
                                <div className='nav-text'>{data.page}</div>
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
