import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { RiSearchLine } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import { BiSolidPhoneCall } from "react-icons/bi";
import TextEditor from './TextEditor';
import io from "socket.io-client";
import { Jodit } from 'jodit-react';
import AudioMessage from './AudioMessage';
import WaveSurfer from 'wavesurfer.js';
import { AudioVisualizer } from 'react-audio-visualize';
import VoiceMessage from './VoiceMessage';
import AudioWaves from './AudioWaves';



const socket = io('http://localhost:4000');

const SpecificChat = styled.div`
    /* background-color: pink; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
`

const ChatTop = styled.div`
    display: flex;  
    align-items: center;
    justify-content: space-between;
    padding: 0.6rem 0.9rem;
    border-bottom: 1px solid rgba(213, 232, 255, 1);
`

const Username = styled.div`
    color: rgba(27, 36, 54, 1);
    font-size: 1.1rem;
    font-family: EuclidSemibold;
`

const Status = styled.div`
    color: rgba(27, 36, 54, 1);
    font-size: 1rem;
    font-family: EuclidRegular;
    margin-top: 0.2rem;
    display: flex;
    align-items: center;
    column-gap: 0.2rem;
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

const Options = styled.div`
    border: 1px solid rgba(213, 232, 255, 1);
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`
const ChatBox = styled.div`
    width: 100%;
    height: 100%;
    /* background-color: blueviolet; */
    overflow-y: scroll;
    padding: 0 1rem;

    &::-webkit-scrollbar{
        display: none;
    }
`

const Editor = styled.div`
    padding: 0.9rem;
`


const WaveformContianer = styled.div`
  display: flex;  
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100px; 
 width: 100%;
  background: transparent;
`

const PlayButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background: #EFEFEF;
  border-radius: 50%;
  border: none;
  outline: none;
  cursor: pointer;
  padding-bottom: 3px;
  &:hover {
    background: #DDD;
  }
`
const Wave = styled.div`
  width: 100%;
  height: 90px;
`;

export default function IndividualChat() {
    const [messages, setMessages] = useState([]);
    const [audioURL, setAudioURL] = useState('');
    const [input, setInput] = useState('');
    const editor = useRef(null);

    const waveformRef = useRef(null);
    const trackRef = useRef(null);

    console.log("++++++++++++++++", messages);
    console.log(socket);

    useEffect(() => {
        socket.on('message', ({ message, timestamp }) => {
            console.log('Message received:', message);
            setMessages([...messages, { message, timestamp }]);
        });
    }, [messages]);

    const parseImg = (src) => {
        const parts = src.split('/');
        console.log(parts[parts.length - 1]);
    }

    const applyCustomStylesToTables = (htmlContent) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        // const tables = doc.querySelectorAll('table');
        // tables.forEach(table => {
        //     table.style.border = '1px solid blue';
        // });

        // const rows = doc.querySelectorAll('tr');
        // rows.forEach(row => {
        //     row.style.border = '1px solid blue';
        // });

        const cells = doc.querySelectorAll('td, th');
        cells.forEach(cell => {
            cell.style.border = '1px solid red';
        });
        return doc.body.innerHTML;
    };



    // useEffect(() => {
    //     const track = trackRef.current;
    //     const waveformContainer = waveformRef.current;

    //     if (!track || !waveformContainer) return;

    //     const waveform = WaveSurfer.create({
    //         barWidth: 3,
    //         cursorWidth: 1,
    //         // container: waveformContainer,
    //         backend: 'WebAudio',
    //         height: 80,
    //         progressColor: '#2D5BFF',
    //         responsive: true,
    //         waveColor: '#EFEFEF',
    //         cursorColor: 'transparent',
    //     });

    //     waveform.load(track);

    //     return () => {
    //         waveform.destroy();
    //     };
    // }, []);



    return (
        <SpecificChat>
            <ChatTop>
                <div style={{
                    display: 'flex',
                    alignItems: "center",
                    columnGap: '0.8rem'
                }}>
                    <div style={{
                        width: "3.1rem",
                        height: "3.1rem",
                        borderRadius: "50%"
                    }}>
                        <img src="https://i.guim.co.uk/img/media/ec27f69b7e4ac14838e8f71842a4cc6db3b8d69c/112_4_1179_708/master/1179.jpg?width=1200&quality=85&auto=format&fit=max&s=07f0f5c6dfd06c32e23261ab651e1ade"
                            alt="user_pic" style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: '50%',
                                objectFit: "cover"
                            }}
                        />
                    </div>
                    <div>
                        <Username>Batman</Username>
                        <Status><div style={{
                            width: '8px',
                            height: "8px",
                            backgroundColor: "rgba(0, 178, 7, 1)",
                            borderRadius: "50%"
                        }}></div> <div>Active now</div></Status>
                    </div>
                </div>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: "0.9rem"
                }}>
                    <Options>
                        <RiSearchLine color='rgba(132, 147, 178, 1)'
                            size={24}
                        />
                    </Options>
                    <Options>
                        <BiSolidPhoneCall color='rgba(132, 147, 178, 1)'
                            size={24}
                        />
                    </Options>
                    <Options>
                        <BsThreeDots
                            color='rgba(132, 147, 178, 1)'
                            size={24}
                        />
                    </Options>
                </div>
            </ChatTop>
            <ChatBox>
                {/* <VoiceMessage /> */}
                {messages.map(({ message, timestamp }, index) => (
                    message.type === 'audio' ?
                        // <WaveformContianer 
                        // key={index}
                        // >
                        //     <Wave ref={waveformRef} />
                        <div
                            key={index}
                            style={{
                                width: "100%",
                                // backgroundColor: "pink",
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "flex-end",
                                columnGap: "1rem"
                            }}>
                            <div
                            style={{
                                // backgroundColor: 'green',
                                marginTop: '2rem',
                                width: '25%'
                            }}
                            >
                                <AudioWaves
                                blobURL={message.content}
                                />

                                {/* <WaveformContianer ref={waveformRef}>
                                    <Wave />
                                    <audio ref={trackRef} id="track" src={message.content} />
                                </WaveformContianer>                                */}
                                {/* <VoiceMessage /> */}
                                <div style={{
                                    color: "rgba(117, 138, 137, 1)",
                                    fontSize: '0.8rem',
                                    fontFamily: "EuclidRegular",
                                    textAlign: 'end',
                                    marginTop: '0.3rem'
                                }}>{timestamp}</div>
                            </div>
                            <div style={{
                                width: "2.2rem",
                                height: "2.2rem",
                                borderRadius: "50%"
                            }}>
                                <img src="https://i.guim.co.uk/img/media/ec27f69b7e4ac14838e8f71842a4cc6db3b8d69c/112_4_1179_708/master/1179.jpg?width=1200&quality=85&auto=format&fit=max&s=07f0f5c6dfd06c32e23261ab651e1ade"
                                    alt="user_pic" style={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: '50%',
                                        objectFit: "cover"
                                    }}
                                />
                            </div>
                        </div>
                        // </WaveformContianer>

                        : (
                            <div
                                key={index}
                                style={{
                                    width: "100%",
                                    // backgroundColor: "pink",
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "flex-end",
                                    columnGap: "1rem"
                                }}>
                                <div style={{ width: "50%", }}>

                                    <div
                                        className='user-msg'
                                        style={{
                                            backgroundColor: "rgba(232, 239, 255, 1)",
                                            borderTopLeftRadius: '1.1rem',
                                            borderTopRightRadius: '1.1rem',
                                            borderBottomLeftRadius: "1.1rem",
                                            padding: "1rem",
                                            marginTop: "2rem",
                                        }}
                                        key={index} dangerouslySetInnerHTML={{ __html: applyCustomStylesToTables(message.content) }}></div>

                                    <div style={{
                                        color: "rgba(117, 138, 137, 1)",
                                        fontSize: '0.8rem',
                                        fontFamily: "EuclidRegular",
                                        textAlign: 'end',
                                        marginTop: '0.3rem'
                                    }}>{timestamp}</div>
                                </div>

                                <div style={{
                                    width: "2.2rem",
                                    height: "2.2rem",
                                    borderRadius: "50%"
                                }}>
                                    <img src="https://i.guim.co.uk/img/media/ec27f69b7e4ac14838e8f71842a4cc6db3b8d69c/112_4_1179_708/master/1179.jpg?width=1200&quality=85&auto=format&fit=max&s=07f0f5c6dfd06c32e23261ab651e1ade"
                                        alt="user_pic" style={{
                                            width: "100%",
                                            height: "100%",
                                            borderRadius: '50%',
                                            objectFit: "cover"
                                        }}
                                    />
                                </div>
                            </div>
                        )


                ))}

                {/* <AudioMessage /> */}
                {/* <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={{ flex: 1, marginRight: '10px' }}
                /> */}
                {/* <button onClick={sendMessage}>Send</button> */}
            </ChatBox>
            <Editor>
                <TextEditor />
                {/* <JoditEditor 
                    ref={editor}
                    value={input}
                    onChange={html => setInput(html)}
                    config={{}}
                />
                 <button onClick={sendMessage}>Send</button> */}
            </Editor>
        </SpecificChat>
    )
}


