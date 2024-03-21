import React from 'react'
import styled from 'styled-components'
import { IoDocumentText } from "react-icons/io5";
import { BsFillSendFill } from "react-icons/bs";


export default function RMNotification() {
    const TaskNotification = styled.div`
    /* background-color: aquamarine; */
    margin-bottom: 2rem;
    `
    const Task = styled.div`
        color: rgba(27, 36, 54, 1);
        font-size: 1.6rem;
        font-family: EuclidMedium;
    `

    const TaskNotificationCard = styled.div`
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
        margin-top: 0.8rem;
        display: flex;
        column-gap: 1.5rem;
    `

    const Decline = styled.div`
        border: 1px solid rgba(27, 81, 187, 1);
        color: rgba(27, 81, 187, 1);
        font-family: EuclidMedium;
        padding: 0.8rem 1.5rem;
        border-radius: 0.5rem;
    `
    const Approve = styled.div`
        background-color: rgba(27, 81, 187, 1);
        color: #fff;
        font-family: EuclidMedium;
        padding: 0.8rem 1.5rem;
        display: flex;
        align-items: center;
        border-radius: 0.5rem;
    `

    return (
        <TaskNotification>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <Task>Reimbursement</Task>
                <div style={{
                    fontSize: '1rem',
                    color: "rgba(132, 147, 178, 1)"
                }}>See More</div>
            </div>

            {/* task notifications */}

            <TaskNotificationCard>
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
                        width: "3.5rem",
                        height: "3.5rem",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(89, 53, 245, 1)"
                    }}>
                        <img
                            src={"https://cdn.mos.cms.futurecdn.net/5vPndSdDicde7EwTyAtqjk.jpg"}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: "100%"
                            }}
                        />

                    </div>

                    {/* task details */}

                    <div style={{
                        // backgroundColor: 'pink'
                    }}>
                        <TaskTitle>Batman</TaskTitle>
                        <TaskDesc>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: 'center',
                                    columnGap: '0.4rem'
                                }}
                            >
                                <div style={{
                                    color: "rgba(132, 147, 178, 1)",
                                    fontSize: "1.1rem",
                                    fontFamily: "EuclidMedium"
                                }}>Bill ID:</div>
                                <div style={{
                                    color: "rgba(27, 36, 54, 1)",
                                    fontSize: "1.1rem",
                                    fontFamily: "EuclidMedium"
                                }}>Rm124</div>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: 'center',
                                    columnGap: '0.4rem'
                                }}
                            >
                                <div style={{
                                    color: "rgba(132, 147, 178, 1)",
                                    fontSize: "1.1rem",
                                    fontFamily: "EuclidMedium"
                                }}>Initiated On:</div>
                                <div style={{
                                    color: "rgba(27, 36, 54, 1)",
                                    fontSize: "1.1rem",
                                    fontFamily: "EuclidMedium"
                                }}>19/03/2024</div>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: 'center',
                                    columnGap: '0.4rem'
                                }}
                            >
                                <div style={{
                                    color: "rgba(132, 147, 178, 1)",
                                    fontSize: "1.1rem",
                                    fontFamily: "EuclidMedium"
                                }}>Bill Amount:</div>
                                <div style={{
                                    color: "rgba(27, 36, 54, 1)",
                                    fontSize: "1.1rem",
                                    fontFamily: "EuclidMedium"
                                }}>270</div>
                            </div>

                        </TaskDesc>
                    </div>
                </div>
                <div style={{
                    // backgroundColor: "green",
                    width: '20%',
                    display: 'flex',
                    flexDirection: "column",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    rowGap: "1.5rem"
                }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        columnGap: "1rem"
                    }}>
                        <Decline>Decline</Decline>
                        <Approve>
                        <BsFillSendFill style={{
                            marginRight: '1rem'
                        }} />
                        Approve
                        </Approve>
                    </div>
                    <div style={{
                        color: "rgba(132, 147, 178, 1)",
                        fontFamily: "EuclidMedium",
                        fontSize: '1rem'
                    }}>26 Dec - 03:26 pm</div>
                </div>
            </TaskNotificationCard>
        </TaskNotification>
    )
}
