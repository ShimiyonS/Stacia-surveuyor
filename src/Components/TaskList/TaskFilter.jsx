import React, { useContext, useState } from 'react'
import SelectBySurveyor from '../Board/SelectBySurveyor'
import SurveyorFilter from './SurveyorFilter';
import { PageContext } from '../../Context/PageContext';

export default function TaskFilter({ setFilterType, filterType, setSurveyorId, surveyorId }) {
    const [selectedID, setSelectedID] = useState('');
    const [selectedIUsers, setSelectedUsers] = useState(null);
    const [type, setType] = useState('');
    const [pending, setPending] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [initiated, setInitiated] = useState(false);

    const { taskListStatus, setTaskListStatus, unassigned, setUnassigned, listDateFilter, setListDateFilter } = useContext(PageContext);

    const handleSelectStatus = (filterType) => {
        if (taskListStatus.includes(filterType)) {
            setTaskListStatus(taskListStatus.filter((filter) =>
                filter !== filterType
            ));
        } else {
            setTaskListStatus([...taskListStatus, filterType])
        }
    };

    const handleSelectDateFilter = (dateType) => {
        if (listDateFilter.includes(dateType)) {
            setListDateFilter(listDateFilter.filter((filter) =>
                filter !== dateType
            ));
        } else {
            setListDateFilter([...listDateFilter, dateType])
        }
    }


    return (
        <div>
            <div style={{
                fontSize: "1.1rem",
                fontFamily: "EuclidMedium",
                textAlign: "center",
                color: 'rgba(28, 29, 34, 1)'
            }}>Filter</div>

            {/* quick filter */}
            <div style={{
                fontSize: "1rem",
                fontFamily: "EuclidMedium",
                color: 'rgba(28, 29, 34, 1)',
                marginTop: '1rem'
            }}>Quick Filter</div>

            {/* status btns */}

            <div className='filter-status-box'>
                <div className='list-filter-status-btn'
                    onClick={() => {
                        setPending(true);
                        setFilterType('pending');
                        setCompleted(false);
                        setInitiated(false);
                        handleSelectStatus('pending');
                    }}
                    style={{
                        backgroundColor: taskListStatus.includes("pending") ? 'rgba(27, 81, 187, 1)' : 'transparent',
                        color: taskListStatus.includes("pending") ? '#fff' : 'rgba(131, 137, 140, 1)'
                    }}
                >
                    Pending tasks
                </div>
                <div className='list-filter-status-btn'
                    onClick={() => {
                        setPending(false);
                        setFilterType('completed');
                        setCompleted(true);
                        setInitiated(false);
                        handleSelectStatus('completed');
                    }}
                    style={{
                        backgroundColor: taskListStatus.includes("completed") ? 'rgba(27, 81, 187, 1)' : 'transparent',
                        color: taskListStatus.includes("completed") ? '#fff' : 'rgba(131, 137, 140, 1)'
                    }}
                >
                    Completed tasks
                </div>
                <div className='list-filter-status-btn'
                    onClick={() => {
                        setFilterType('initiated');
                        setPending(false);
                        setCompleted(false);
                        setInitiated(true);
                        handleSelectStatus('initiated');
                    }}
                    style={{
                        backgroundColor: taskListStatus.includes("initiated") ? 'rgba(27, 81, 187, 1)' : 'transparent',
                        color: taskListStatus.includes("initiated") ? '#fff' : 'rgba(131, 137, 140, 1)'
                    }}
                >
                    Initiated tasks
                </div>
            </div>

            {/* member */}


            <div style={{
                fontSize: "1rem",
                fontFamily: "EuclidMedium",
                color: 'rgba(28, 29, 34, 1)',
                marginTop: '1rem'
            }}>Member</div>

            <SurveyorFilter
                setSelectedID={setSelectedID}
                setSelectedUsers={setSelectedUsers}
                setType={setType}
                setSurveyorId={setSurveyorId}
                surveyorId={surveyorId}
            />

            <div className='task-filter-box'>
                <input
                    type='checkbox'
                />
                <div className='filter-text'>TLM Tasks</div>
            </div>
            <div className='task-filter-box'>
                <input
                    type='checkbox'
                />
                <div className='filter-text'>Bookmarks</div>
            </div>

            {/* date range */}

            <div style={{
                fontSize: "1rem",
                fontFamily: "EuclidMedium",
                color: 'rgba(28, 29, 34, 1)',
                marginTop: '1rem'
            }}>Date range</div>

            <div>
                <div className='task-filter-box'>
                    <div style={{
                        border: '1px solid #e3e3e3',
                        width: '1.2rem',
                        height: '1.2rem',
                        borderRadius: '0.3rem',
                        backgroundColor: listDateFilter.includes('notAssigned') ? 'blue' : 'transparent',
                    }}
                        onClick={() => handleSelectStatus('notAssigned')
                        }
                    >

                    </div>
                    <div className='filter-text'

                    >Unassigned</div>
                </div>
                <div className='task-filter-box'>
                    <div style={{
                        border: '1px solid #e3e3e3',
                        width: '1.2rem',
                        height: '1.2rem',
                        borderRadius: '0.3rem',
                        backgroundColor: listDateFilter.includes('overdue') ? 'blue' : 'transparent',
                    }}
                        onClick={() => handleSelectDateFilter('overdue')}

                    >

                    </div>
                    <div className='filter-text'
                    >Over due</div>
                </div>
                <div className='task-filter-box'>
                    <div style={{
                        border: '1px solid #e3e3e3',
                        width: '1.2rem',
                        height: '1.2rem',
                        borderRadius: '0.3rem',
                        backgroundColor: listDateFilter.includes('day') ? 'blue' : 'transparent',
                    }}
                        onClick={() => handleSelectDateFilter('day')}

                    >

                    </div>
                    <div className='filter-text'
                    >Due next day</div>
                </div>
                <div className='task-filter-box'>
                    <div style={{
                        border: '1px solid #e3e3e3',
                        width: '1.2rem',
                        height: '1.2rem',
                        borderRadius: '0.3rem',
                        backgroundColor: listDateFilter.includes('week') ? 'blue' : 'transparent',
                    }}
                        onClick={() => handleSelectDateFilter('week')}

                    >

                    </div>
                    <div className='filter-text'
                    >Due next week</div>
                </div>
                <div className='task-filter-box'>
                    <div style={{
                        border: '1px solid #e3e3e3',
                        width: '1.2rem',
                        height: '1.2rem',
                        borderRadius: '0.3rem',
                        backgroundColor: listDateFilter.includes('month') ? 'blue' : 'transparent',
                    }}
                        onClick={() => handleSelectDateFilter('month')}
                    >

                    </div>
                    <div className='filter-text'

                    >Due next month</div>
                </div>
            </div>
        </div>
    )
}
