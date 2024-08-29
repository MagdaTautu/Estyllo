import React, { useState } from 'react';
import '../styles/program.css'; // Import your CSS file if necessary

const ScheduleGenerator = () => {
    const [firstDayTeam, setFirstDayTeam] = useState('yellow');
    const [schedule, setSchedule] = useState([]);

    const generateSchedule = (startTeam) => {
        const today = new Date(); // Get current date
        console.log(today.getDate())
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth(); 
        const nextMonth = (currentMonth + 1) % 12; 
        const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

        const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const daysInNextMonth = new Date(nextYear, nextMonth + 1, 0).getDate(); 

        const schedule = [];
        let currentTeam = startTeam;

        const isWeekend = (dayOfWeek, date) => {
            console.log(dayOfWeek, date)
            return dayOfWeek === 6 || dayOfWeek === 0; 
        };

        const dayNames = ['Duminică', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă'];

        const getDayName = (date) => {
            return dayNames[date.getDay()];
        };

        const formatDateForDB = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        const addDaysToSchedule = (year, month, startDay, totalDays) => {
            let day = startDay;
            const date = new Date(year, month, day);
            console.log(formatDateForDB(date))
            while (day <= totalDays) {
                const date = new Date(year, month, day);
                schedule.push({
                    data: formatDateForDB(date),
                    zi: getDayName(date),
                    echipa: currentTeam
                });
                const dayOfWeek = date.getDay();
                if (isWeekend(dayOfWeek, date)) {
                    console.log("weekend:",date, dayOfWeek)
                    if(dayOfWeek === 0 )
                    {
                        var endOfPeriod = day + 1;
                    }
                    else 
                    {
                        var endOfPeriod = day + 2;
                    }
                        

                    if (endOfPeriod > totalDays) {
                        endOfPeriod = totalDays;
                    }

                    for (let d = day + 1; d <= endOfPeriod; d++) {
                        const nextDate = new Date(year, month, d);
                        schedule.push({
                            data: formatDateForDB(nextDate),
                            zi: getDayName(nextDate),
                            echipa: currentTeam
                        });
                    }

                    day = endOfPeriod + 1;
                } else {
                    day++;
                }

                

                if (day <= totalDays) {
                    currentTeam = currentTeam === 'yellow' ? 'red' : 'yellow';
                }
            }
        };

        addDaysToSchedule(currentYear, currentMonth, today.getDate(), daysInCurrentMonth);

        addDaysToSchedule(nextYear, nextMonth, 1, daysInNextMonth);

        setSchedule(schedule);
    };

    const saveSchedule = async () => {
        try {
            const response = await fetch('https://estyllo.onrender.com:443/api/personal/save-schedule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(schedule),
            });
    
            if (response.ok) {
                alert('Schedule saved successfully!');
            } else {
                alert('Failed to save schedule');
            }
        } catch (error) {
            console.error('Error saving schedule:', error);
            alert('Failed to save schedule');
        }
    };

    return (
        <div id="program">
            <div>
                <label>
                    Select Team for First Day:
                    <select value={firstDayTeam} onChange={(e) => setFirstDayTeam(e.target.value)}>
                        <option value="yellow">Yellow</option>
                        <option value="red">Red</option>
                    </select>
                </label>
                <button onClick={() => generateSchedule(firstDayTeam)}>Generate Schedule</button>
                <button onClick={saveSchedule}>Save Schedule</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Zi</th>
                        <th>Echipa</th>
                    </tr>
                </thead>
                <tbody>
                    {schedule.map((entry, index) => (
                        <tr key={index}>
                            <td>{entry.data}</td>
                            <td>{entry.zi}</td>
                            <td>{entry.echipa}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ScheduleGenerator;
