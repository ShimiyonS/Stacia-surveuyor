import React, { useState } from 'react'
import styled from 'styled-components';
import { RiSearchLine } from "react-icons/ri";
import { IoFilterOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import { BiSolidPhoneCall } from "react-icons/bi";
import IndividualChat from '../Components/Chat/IndividualChat';
import "../Styles/Chat/Chat.css";
import TextEditor from '../Components/Chat/TextEditor';

const ChatPageContainer = styled.div`
    width: calc(100% - 4.2rem);
    max-height: calc(100vh - 4rem);
    height: calc(100vh - 4rem);
    margin-left: 4.2rem;
    background-color: rgba(239, 242, 244, 1);
    padding: 1rem 1.5rem;
    /* display: flex; */
  `;

const ChatInnerLayer = styled.div`
    height: 100%;
    width: 100%;
    background-color: rgba(255, 255, 255, 1);
    overflow-y: scroll;
    display: flex;
    &::-webkit-scrollbar{
    display: none;  
    }
    `;


const ChatLeft = styled.div`
        height: 100%;
        width: 30%;
        border-right: 1px solid rgba(87, 87, 87, 0.1);
        -webkit-box-shadow: 1px 0 1px 0 #dddddd;
        -moz-box-shadow: 1px 0 1px 0 #dddddd;
        box-shadow: 1px 0 1px 0 #dddddd;
        padding: 1.5rem 2rem;
    `

const ChatRight = styled.div`
        width: 70%;
        height: 100%;
        /* background-color: burlywood; */
    `

const Search = styled.div`
        width: 100%;
        border: 1px solid rgba(232, 232, 232, 1);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.7rem;
        border-radius: 2rem;
        color: rgba(132, 147, 178, 1);
        font-family: EuclidRegular;
    `

const AllChats = styled.div`
        /* background-color: pink; */
        margin-top: 1rem;
    `

const ChatBox = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
margin-top: 1.5rem;
`

const Username = styled.div`
color: rgba(27, 36, 54, 1);
font-size: 1.1rem;
font-family: EuclidSemibold;
`

const LastMsg = styled.div`
color: rgba(132, 147, 178, 1);
font-size: 0.9rem;
font-family: EuclidMedium;
margin-top: 0.5rem;
`

const TimeSent = styled.div`
color: rgba(132, 147, 178, 1);
font-size: 0.8rem;
font-family: EuclidMedium;
`

const MsgCount = styled.div`
background-color: rgba(27, 81, 187, 1);
width: 1.2rem;
height: 1.2rem;
border-radius: 50%;
color: #fff;
display: flex;
align-items: center;
justify-content: center;
font-family: EuclidMedium;
font-size: 0.8rem;
margin-top: 0.7rem;
`




const ChatTemplate = ({ uname, uimg, msg }) => {

    return (
        <ChatBox>
            <div style={{
                display: 'flex',
                alignItems: "center",
                columnGap: '0.8rem'
            }}>
                <div style={{
                    width: "3.2rem",
                    height: "3.2rem",
                    borderRadius: "50%"
                }}>
                    <img src={uimg}
                        alt="user_pic" style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: '50%',
                            objectFit: "cover"
                        }}
                    />
                </div>
                <div>
                    <Username>{uname}</Username>
                    <LastMsg>{msg}</LastMsg>
                </div>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
            }}>
                <TimeSent>04:05 PM</TimeSent>
                <MsgCount>1</MsgCount>
            </div>
        </ChatBox>
    )
}



export default function Chat() {

    const [msg, setMsg] = useState("");
    return (
        <ChatPageContainer>
            <ChatInnerLayer>
                <ChatLeft>
                    <div style={{
                        display: 'flex',
                        alignItems: "center",
                        columnGap: "0.5rem",
                        justifyContent: 'center',
                    }}>
                        <Search>
                            <div style={{
                                display: 'flex',
                                alignItems: "center",
                                columnGap: "1rem"
                            }}>
                                <RiSearchLine color='rgba(132, 147, 178, 1)'
                                    size={24}
                                />
                                <div>Search people or messages</div>
                            </div>
                            <IoFilterOutline color='rgba(132, 147, 178, 1)'
                                size={24}

                            />
                        </Search>
                        <BsThreeDotsVertical
                            color='rgba(132, 147, 178, 1)'
                            size={26}
                        />
                    </div>
                    <AllChats>
                        <div style={{
                            color: "rgba(32, 32, 32, 1)",
                            fontFamily: "EuclidBold"
                        }}>Chats</div>
                        <ChatTemplate uname="Batman" uimg="https://i.guim.co.uk/img/media/ec27f69b7e4ac14838e8f71842a4cc6db3b8d69c/112_4_1179_708/master/1179.jpg?width=1200&quality=85&auto=format&fit=max&s=07f0f5c6dfd06c32e23261ab651e1ade" msg="They think I'm hiding in the shadows"
                        />

                        <ChatTemplate
                            uname="Home lander" uimg="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0_J3hLu5jOSj2zA79gBkHNFokj-CQv2iJpA&usqp=CAU" msg=" I'm stronger, I'm smarter, I'm better!"
                        />
                        <ChatTemplate
                            uname="Heisenberg" uimg="https://hips.hearstapps.com/esquire/assets/16/26/1467224019-54d447ac41a88-walterdef.jpg" msg="I am the one who knocks"
                        />
                    </AllChats>
                </ChatLeft>

                <ChatRight>
                    <IndividualChat />
                </ChatRight>
            </ChatInnerLayer>
        </ChatPageContainer>
    )
}

