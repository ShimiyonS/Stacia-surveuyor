import React from 'react'
import styled from 'styled-components'
import IsmartLogo from "../Assets/IsmartLogo.svg"
import Search from "../Assets/SearchIcon.svg"
import ChatLogo from "../Assets/ChatLogo.svg"
import NotificationLogo from "../Assets/NotificationLogo.svg"
import AppLogo from "../Assets/AppLogo.svg"
import Profile from "../Assets/Profile.svg"
import { NavLink } from 'react-router-dom'

export default function TopBar() {

    const logos = [
        ChatLogo, NotificationLogo, AppLogo, Profile
    ];

    const TopBar = styled.div`
        background-color: tomato;
        height: 4rem;
        width: calc(100% - 75px);
        margin-left: 75px;
        display: flex;
        align-items: center;        
        justify-content: space-between;
    `

    const TopBarText = styled.div`
        color: #423D57;
        font-size: 26px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    `

    const SearchBox = styled.div`   
        /* background-color: blueviolet; */
        display: flex;
        align-items: center;
        /* justify-content: center; */
        gap: 10px;
        width: 50%;
    `

    const ProfileBasedLinks = styled.div`
        display: flex;
        gap: 25px;
    `

    return (
        <TopBar>
            {/* <div style={{ display: 'flex', alignItems: 'center', columnGap: '30px' }}>
                <img src={IsmartLogo} alt="" />
            </div> */}
            <div style={{ width: '35%', marginRight: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <SearchBox>
                    <img src={Search} alt="" />
                    <input type="text" placeholder='search...' style={{ width: '100%', border: 'none', padding: '5px' }} />
                </SearchBox>
                <ProfileBasedLinks>
                    {
                        logos.map((data, index) => (
                            <div style={{ width: '28px', height: '28px', }}>
                                <img src={data} alt="" style={{ width: '100%', borderRadius: '15px' }} />
                            </div>
                        ))
                    }
                </ProfileBasedLinks>
            </div>
        </TopBar>
    )
}
