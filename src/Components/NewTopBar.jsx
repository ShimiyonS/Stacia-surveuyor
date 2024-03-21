import React, { useContext, useEffect } from 'react'
import "../Styles/Task/NewTopBar.css"
import SearchBoxIcon from "../Assets/SearchIcon.svg"
import ChatLogo from "../Assets/ChatLogo.svg"
import NotificationLogo from "../Assets/NotificationLogo.svg"
import AppLogo from "../Assets/AppLogo.svg"
import Profile from "../Assets/Profile.svg"
import styled from 'styled-components'
import { PageContext } from '../Context/PageContext'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";


export default function NewTopBar({ pageName }) {

    // const { pageName } = useContext(PageContext);
    const location = useLocation();
    const logos = [
        {
            logo: ChatLogo,
            path: "",
        },
        {
            logo: NotificationLogo,
            path: "/notifications",
        },
        {
            logo: AppLogo,
            path: "",
        },
        {
            logo: Profile,
            path: "",
        },
    ];

    const ProfileBasedLinks = styled.div`
    display: flex;
    gap: 25px;
`

    const navigate = useNavigate();
    const id = location.pathname.split('/');
    console.log(id[id.length - 1]);

    return (
        <div className="new-top-bar">
            <div className="page-active-title">
                {location.pathname === "/" && 'Dashboard'}
                {location.pathname === "/surveyor-tasks" && 'Surveyor Tasks'}
                {location.pathname === `/surveyor-tasks/specific-task/${id[id.length - 1]}` && (
                    <div style={{ display: 'flex', alignItems: 'center', columnGap: '1rem', cursor: 'pointer' }}>
                        <IoIosArrowBack onClick={() => navigate(-1)} />
                        <div>Task</div>
                    </div>
                )}
                {location.pathname === "/profile" && 'Profile'}
                {location.pathname === "/create-task" && 'Create Task'}
                {location.pathname === "/create-task/excel-view" && 'Create Task'}
                {location.pathname === "/calendar" && 'Calendar'}
                {location.pathname === "/create-task/calendar" && 'Calendar'}
                {location.pathname === "/notifications" && 'Notification'}
                
            </div>
            <div className="search-box-container">
                <div className="search-box">
                    <img src={SearchBoxIcon} alt="" />
                    <input type="text" placeholder='search...' className='search-box-style' />
                </div>

                <ProfileBasedLinks>
                    {
                        logos.map(({ path, logo }, index) => (
                            <Link className='top-bar-logo'
                            to={path}
                            >
                                <img src={logo} alt="" />
                            </Link>
                        ))
                    }
                </ProfileBasedLinks>
            </div>
        </div>
    )
}
