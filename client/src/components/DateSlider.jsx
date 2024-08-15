import React, { useState } from 'react';
import '../styles/slider.css'; // Import the CSS for the slider

const DateSlider = ({ highlightedDates, selectedPersonal }) => {
    const dates = getAugustDates();
    const [translateX, setTranslateX] = useState(0);
    const [selectedDate, setSelectedDate] = useState(null);
    const [availableHours, setAvailableHours] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);

    const handleNext = () => {
        if (translateX !== -3000) {
            setTranslateX(translateX - 150);
        }
    };

    const handlePrev = () => {
        if (translateX !== 0) {
            setTranslateX(translateX + 150);
        }
    };
    const formatDateToYYYYMMDD = (dateStr) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure month is two digits
        const day = String(date.getDate()).padStart(2, '0'); // Ensure day is two digits
    
        return `${year}-${month}-${day}`;
    };
    const handleDateClick = async (dateStr) => {
        setSelectedDate(dateStr);

        // Fetch available hours for the selected date and personal
        const formattedDateStr = formatDateToYYYYMMDD(dateStr);
        try {
            const response = await fetch(`https://estyllo.onrender.com/api/appointments/available-hours?personal=${selectedPersonal}&date=${formattedDateStr}`);
            const data = await response.json();
            console.log(data)

            setAvailableHours(data.availableHours);
        } catch (error) {
            console.error('Error fetching available hours:', error);
        }
    };

    const handleBookAppointment = async () => {
        const appointment = {
            personal: selectedPersonal,
            date: selectedDate,
            hour: selectedTime,
            status: 'pending',
        };

        try {
            const response = await fetch('https://estyllo.onrender.com/api/appointments/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(appointment),
            });

            if (response.ok) {
                alert('Appointment booked successfully!');
                // Update UI as needed, like redirecting to a confirmation page
            } else {
                alert('Failed to book appointment.');
            }
        } catch (error) {
            console.error('Error booking appointment:', error);
        }
    };

    return (
        <div id='slider'>
            <div className="slider-container">
                <div className="slider" style={{ transform: `translateX(${translateX}px)` }}>
                    <ul className="slider-list">
                        {dates.map((dateObj, index) => {
                            const isHighlighted = highlightedDates.includes(dateObj.dateStr);

                            return (
                                <li 
                                    key={index} 
                                    className={`slider-item ${isHighlighted ? 'highlighted' : ''} ${selectedDate === dateObj.dateStr ? 'active' : ''}`}
                                    onClick={() => handleDateClick(dateObj.dateStr)} 
                                >
                                    <div className="date-info">
                                        <span className="span day-name">{dateObj.dayName}</span>
                                        <span className="span day-number">{dateObj.day}</span>
                                        <span className="span month-name">{dateObj.monthName.trim()}</span>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <div className="buttons"> 
                <button className="prev" onClick={handlePrev}></button>
                <button className="next" onClick={handleNext}></button>
            </div>

            {/* Display available hours if a date is selected */}
            {selectedDate && (
                <div className="hours-container">
                    <h3>Available Hours on {selectedDate}:</h3>
                    <div className="hours-list">
                        {availableHours.map((hour, index) => (
                            <span 
                                key={index} 
                                className={`hour-item ${selectedTime === hour ? 'active' : ''}`} 
                                onClick={() => setSelectedTime(hour)}
                            >
                                {hour}
                            </span>
                        ))}
                    </div>
                    <button onClick={handleBookAppointment} disabled={!selectedTime}>Rezerva in data de {selectedDate} la ora {selectedTime}</button>
                </div>
            )}
        </div>
    );
};


const getAugustDates = () => {
    const dates = [];
    const year = new Date().getFullYear();
    const month = 7; // August (months are 0-indexed in JavaScript Date object)
    const today = new Date();
    const startDay = today.getDate();

    for (let day = startDay; day <= 31; day++) {
        const date = new Date(year, month, day);
        const dateStr = `${year}-${month + 1}-${day}`; // Format as YYYY-M-D
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const monthName = date.toLocaleDateString('en-US', { month: 'short' });
        dates.push({ day, dayName, monthName, dateStr });
    }

    for (let day = 1; day < startDay; day++) {
        const date = new Date(year, month, day);
        const dateStr = `${year}-${month + 1}-${day}`; // Format as YYYY-M-D
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const monthName = date.toLocaleDateString('en-US', { month: 'short' });
        dates.push({ day, dayName, monthName, dateStr });
    }
    
    return dates;
};

export default DateSlider;
