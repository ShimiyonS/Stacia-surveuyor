import React, { useContext, useEffect } from 'react'
import "../Styles/Task/NewTopBar.css"
import SearchBoxIcon from "../Assets/SearchIcon.svg"
import ChatLogo from "../Assets/ChatLogo.svg"
import NotificationLogo from "../Assets/NotificationLogo.svg"
import AppLogo from "../Assets/AppLogo.svg"
import Profile from "../Assets/Profile.svg"
import styled from 'styled-components'
import { PageContext } from '../Context/PageContext'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";


export default function NewTopBar() {

    const { pageName } = useContext(PageContext);
    const location = useLocation();
    const logos = [
        ChatLogo, NotificationLogo, AppLogo, Profile
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

            </div>
            <div className="search-box-container">
                <div className="search-box">
                    <img src={SearchBoxIcon} alt="" />
                    <input type="text" placeholder='search...' className='search-box-style' />
                </div>
                <ProfileBasedLinks>
                    {
                        logos.map((data, index) => (
                            <div className='top-bar-logo'>
                                <img src={data} alt="" />
                            </div>
                        ))
                    }
                </ProfileBasedLinks>
            </div>
        </div>
    )
}
