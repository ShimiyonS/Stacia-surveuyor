import React from 'react'
import { Chart, ArcElement } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

Chart.register(ArcElement)

const data = {
    labels: ['Completed', 'Pending', 'Initiated'],
    datasets: [
        {
            label: 'task over all stat',
            data: [60, 30, 10],
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
                animateScale: true,
            }
        }
    }

}



export default function TaskDonutChart() {
    return (
        <div className='task-donut-chart'>
            <div className="task-stat-text">Task Statics</div>
            <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', justifyContent: 'space-between', }}>
                <Doughnut data={data} options={options} style={{ width: '50%', height: '100%', padding: '10px' }} />
                <div style={{ width: '50%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', rowGap: '20px' }}>
                    <div className='task-stat-color-box'>
                        <div style={{ width: '15px', height: '10px', backgroundColor: 'rgba(232,99,132,1)', borderRadius: '2px' }}></div>
                        <div>Completed</div>
                    </div>
                    <div className='task-stat-color-box'>
                        <div style={{ width: '15px', height: '10px', backgroundColor: 'rgba(232,211,6,1)', borderRadius: '2px' }}></div>
                        <div>Pending</div>
                    </div>
                    <div className='task-stat-color-box'>
                        <div style={{ width: '15px', height: '10px', backgroundColor: 'rgba(54,162,235,1)', borderRadius: '2px' }}></div>
                        <div>Initiated</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
