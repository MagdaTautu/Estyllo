import React, { useState } from 'react';
import '../styles/program.css'; // Import your CSS file if necessary

const ScheduleGenerator = () => {
    const [firstDayTeam, setFirstDayTeam] = useState('yellow');
    const [schedule, setSchedule] = useState([]);

    const generateSchedule = (startTeam) => {
        const daysInMonth = 31; // For August
        const schedule = [];
        let currentTeam = startTeam;
        
        const isWeekend = (day) => {
            const date = new Date(2024, 7, day);
            const dayOfWeek = date.getDay(); // 0 for Sunday, 6 for Saturday
            return dayOfWeek === 6 || dayOfWeek === 0; // Saturday or Sunday
        };
        
        const getDayName = (day) => {
            const date = new Date(2024, 7, day);
            const dayNames = ['Duminică', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă'];
            return dayNames[date.getDay()];
        };
        
        const formatDateForDB = (date) => {
            return date.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
        };
        
        let day = 1;
        while (day <= daysInMonth) {
            const date = new Date(2024, 7, day);
            schedule.push({
                data: formatDateForDB(date),
                zi: getDayName(day),
                echipa: currentTeam
            });
        
           
            if (isWeekend(day)) {
                let endOfPeriod = day + 2;
                if (endOfPeriod > daysInMonth) {
                    endOfPeriod = daysInMonth;
                }
        
                for (let d = day + 1; d <= endOfPeriod; d++) {
                    const nextDate = new Date(2024, 7, d);
                    schedule.push({
                        data: formatDateForDB(nextDate), // Adjust field name to match backend
                        zi: getDayName(d),         // Adjust field name to match backend
                        echipa: currentTeam          // Adjust field name to match backend
                    });
                }
        
                day = endOfPeriod + 1;
            } else {
                day++;
            }
        
            // Switch team after the period
            if (day <= daysInMonth) {
                currentTeam = currentTeam === 'yellow' ? 'red' : 'yellow';
            }
        }
        
        setSchedule(schedule);
    };
    
    
    const saveSchedule = async () => {
        try {
            console.log(schedule)
            const response = await fetch('https://estyllo.onrender.com/api/personal/save-schedule', {
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
                            <td>{entry.data}</td>  {/* Adjust field name to match backend */}
                            <td>{entry.zi}</td>    {/* Adjust field name to match backend */}
                            <td>{entry.echipa}</td> {/* Adjust field name to match backend */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ScheduleGenerator;
