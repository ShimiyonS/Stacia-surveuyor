import React from 'react'
import TaskDonutChart from './TaskDonutChart'
import TargetYearlyTask from './TargetYearlyTask'
import RegionWiseTask from './RegionWiseTask'

export default function OverallStat() {
    return (
        <div className="task-over-all-stat">
            {/* task stat donut chart */}
            <TaskDonutChart />

            {/* target yearly tasks */}

            <TargetYearlyTask />    

            {/* region wise stat */}

            <RegionWiseTask />

        </div>
    )
}
