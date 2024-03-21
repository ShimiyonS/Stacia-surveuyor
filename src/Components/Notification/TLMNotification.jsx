import React from 'react'
import styled from 'styled-components'
import { IoDocumentText } from "react-icons/io5";


export default function TLMNotification() {
    const TaskNotification = styled.div`
    /* background-color: aquamarine; */
    margin-bottom: 2rem;
    `
    const Task = styled.div`
        color: rgba(27, 36, 54, 1);
        font-size: 1.6rem;
        font-family: EuclidMedium;
    `

    const TLMNotificationCard = styled.div`
        background-color: rgba(245, 249, 255, 1);
        display: flex;
        padding: 1rem 1rem 1.5rem 2.5rem;
        border-radius: 1rem;
        margin-top: 1rem;
    `

    const TaskTitle = styled.div`
        color: rgba(27, 36, 54, 1);
        font-size: 1.7rem;
        font-family: EuclidMedium;
    `

    const TaskDesc = styled.p`
        color: rgba(132, 147, 178, 1);
        font-family: EuclidMedium;
        margin-top: 0.8rem;
    `

    return (
        <TaskNotification>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <Task>TLM</Task>
                <div style={{
                    fontSize: '1rem',
                    color: "rgba(132, 147, 178, 1)"
                }}>See More</div>
            </div>

            {/* task notifications */}

            <TLMNotificationCard>
                <div
                    style={{
                        // backgroundColor: 'red',
                        display: "flex",
                        alignItems: "center",
                        columnGap: "2rem",
                        width: "80%",
                    }}
                >
                    <div style={{
                        width: "3rem",
                        height: "2.5rem",
                        borderRadius: "0.2rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(89, 53, 245, 1)"
                    }}>
                        <IoDocumentText
                            size={24}
                            color='#fff'
                        />

                    </div>

                    {/* task details */}

                    <div style={{
                        // backgroundColor: 'pink'
                    }}>
                        <TaskTitle>Lorem Ipsum is simply dummy</TaskTitle>
                        <TaskDesc>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse voluptas explicabo reiciendis sunt iste provident eaque, delectus mollitia corporis nesciunt doloremque pariatur quaerat cumque quos illo quam optio at vero?</TaskDesc>
                    </div>
                </div>
                <div style={{
                    // backgroundColor: "green",
                    width: '20%',
                    display: 'flex',
                    alignItems: "flex-end",
                    justifyContent: "flex-end"
                }}>
                    <div style={{
                        color: "rgba(132, 147, 178, 1)",
                        fontFamily: "EuclidMedium",
                        fontSize: '1rem'
                    }}>26 Dec - 03;26 pm</div>
                </div>
            </TLMNotificationCard>
        </TaskNotification>
    )
}
