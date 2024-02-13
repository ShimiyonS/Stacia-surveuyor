import React from 'react'
import { Chart, ArcElement } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

Chart.register(ArcElement)

const data = {
    labels: ['Completed', 'Target',],
    datasets: [
        {
            label: 'task over all stat',
            data: [100, 60],
            // borderColor: ['rgba(255,206,86,0.2)'],
            backgroundColor: ['rgba(232,99,132,1)', '#E8EFFF'
            ],
            // pointBackgroundColor: 'rgba(255,206,86,0.2)',
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


export default function TargetYearlyTask() {
  return (
    <div className='task-donut-chart'>
            <div className="task-stat-text">Target yearly tasks </div>
            <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', justifyContent: 'space-between', }}>
                <Doughnut data={data} options={options} style={{ width: '50%', height: '100%', padding: '10px' }} />
                <div style={{ width: '50%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', rowGap: '20px' }}>
                    <div className='task-stat-color-box'>
                        <div style={{ width: '15px', height: '10px', backgroundColor: 'rgba(232,99,132,1)', borderRadius: '2px' }}></div>
                        <div>Completed</div>
                    </div>
                    <div className='task-stat-color-box'>
                        <div style={{ width: '15px', height: '10px', backgroundColor: '#E8EFFF', borderRadius: '2px' }}></div>
                        <div>Target</div>
                    </div>
                </div>
            </div>
        </div>
  )
}
