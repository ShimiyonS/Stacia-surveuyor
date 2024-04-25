import React, { useEffect, useState } from 'react'
import { Chart, ArcElement } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import axios from 'axios'



export default function TaskDonutChart() {
    const [taskStat, setTaskStat] = useState(null);
    const [loading, setLoading] = useState(true);

    Chart.register(ArcElement)

    const data = {
        labels: ['Completed', 'Pending', 'Initiated'],
        datasets: [
            {
                label: 'task over all stat',
                data: [
                    loading ? 0 : taskStat.completedCount,
                    loading ? 0 : taskStat.pendingCount,
                    loading ? 0 : taskStat.initiatedCount],
                borderColor: ['rgba(255,206,86,0.2)'],
                backgroundColor: ['rgba(232,99,132,1)',
                    'rgba(232,211,6,1)',
                    'rgba(54,162,235,1)',
                ],
                pointBackgroundColor: 'rgba(255,206,86,0.2)',
            }
        ]
    }

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Doughnut Chart',
                color: 'blue',
                font: {
                    size: 25
                },
                padding: {
                    top: 30,
                    bottom: 30
                },
                responsive: true,
                animation: {
                    duration: 0
                }
            }
        }

    };


    const getTaskStat = async () => {
        try {
            const res = await axios.get('http://192.168.0.115:8001/task/managers/660aa4d54a8e525d204aaa77');
            setTaskStat(res.data.stats);
            setLoading(false);
            console.log(res.data.stats);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        getTaskStat();
    }, []);

    return (
        <div className='task-donut-chart'>
            <div className="task-stat-text">Task Statics</div>
            {
                loading ? <div>loading...</div> : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', justifyContent: 'space-between', }}>
                        <Doughnut data={data} options={options} style={{ width: '50%', height: '100%', padding: '10px' }} />
                        <div style={{ width: '50%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', rowGap: '20px' }}>
                            <div className='task-stat-color-box'>
                                <div style={{ width: '15px', height: '10px', backgroundColor: 'rgba(232,99,132,1)', borderRadius: '2px' }}></div>
                                <div>Completed</div>
                                <div
                                    style={{
                                        marginLeft: '1rem'
                                    }}
                                >{taskStat.completedCount}</div>
                            </div>
                            <div className='task-stat-color-box'>
                                <div style={{ width: '15px', height: '10px', backgroundColor: 'rgba(232,211,6,1)', borderRadius: '2px' }}></div>
                                <div>Pending</div>
                                <div
                                    style={{
                                        marginLeft: '2.5rem'
                                    }}
                                >{taskStat.pendingCount}</div>
                            </div>
                            <div className='task-stat-color-box'>
                                <div style={{ width: '15px', height: '10px', backgroundColor: 'rgba(54,162,235,1)', borderRadius: '2px' }}></div>
                                <div>Initiated</div>
                                <div
                                    style={{
                                        marginLeft: '2.5rem'
                                    }}
                                >{taskStat.initiatedCount}</div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
