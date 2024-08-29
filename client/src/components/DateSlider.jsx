import React, { useState } from 'react';
import '../styles/slider.css';

const DateSlider = ({ highlightedDates, selectedPersonal, setNextPage, selectedService, setDate, setHour }) => {
    const dates = getDatesForNext10Days();
    
    const [translateX, setTranslateX] = useState(0);
    const [selectedDate, setSelectedDate] = useState(null);
    const [availableHours, setAvailableHours] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);
    const [user_email, setUserEmail] = useState(null);
    const [user_phone, setUserPhone] = useState(null);
    const [user_service, setUserService] = useState(null);

    const handleNext = () => {
        if (translateX !== -150 * (dates.length - 1)) {
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
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const formatHighlightedDates = (dates) => {
        return dates.map(date => {
            const formattedDate = new Date(date);
            const year = formattedDate.getFullYear();
            const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
            const day = String(formattedDate.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        });
    };
    const formattedHighlightedDates = formatHighlightedDates(highlightedDates);

    const handleDateClick = async (dateStr) => {
        setSelectedDate(dateStr);

        const formattedDateStr = formatDateToYYYYMMDD(dateStr);
        try {
            const response = await fetch(`https://estyllo.onrender.com:443/api/appointments/available-hours?personal=${selectedPersonal}&date=${formattedDateStr}`);
            const data = await response.json();
            console.log("Available hours:", data);

            setAvailableHours(data.availableHours);
        } catch (error) {
            console.error('Error fetching available hours:', error);
        }
    };

    const [visibleContactForm, setVisibleContactForm] = useState("");
    const handleBookAppointment = async (e) => {
        e.preventDefault();
        if (!user_email) {
            alert("Pentru rezervare, completeaza datele de contact!");
        } else {
            const appointment = {
                personal: selectedPersonal,
                date: selectedDate,
                hour: selectedTime,
                status: 'in asteptare',
                user_email: user_email,
                user_phone: user_phone,
                service: user_service,
            };

            try {
                const response = await fetch('https://estyllo.onrender.com:443/api/appointments/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(appointment),
                });

                if (response.ok) {
                    alert('Rezervare finalizata cu succes!');
                    setNextPage(true);
                    setDate(selectedDate);
                    setHour(selectedTime);
                } else {
                    alert('Rezervare nereusita! Incearca din nou!');
                }
            } catch (error) {
                console.error('Error booking appointment:', error);
            }
        }
    };

    const handleSetVisibleContactForm = () => {
        setVisibleContactForm(prev => (prev === "" ? "visible" : ""));
    };

    const handleChange = (e) => {
        const { value, name } = e.target;
        if (name === "user_email") {
            setUserEmail(value);
        } else if (name === "user_phone") {
            setUserPhone(value);
        } else if (name === "user_name") {
            // handle name change...
        }
        setUserService(selectedService);
    };

    return (
        <div id='slider'>
            <div className="slider-container">
                <div className="slider" style={{ transform: `translateX(${translateX}px)` }}>
                    <ul className="slider-list">
                        {dates.map((dateObj, index) => {
                            const isHighlighted = formattedHighlightedDates.includes(dateObj.dateStr);
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
                <button className="prev" onClick={handlePrev} disabled={translateX === 0}></button>
                <button className="next" onClick={handleNext} disabled={translateX === -150 * (dates.length - 1)}></button>
            </div>

            {selectedDate && (
                <div className="hours-container">
                    <h3>Available Hours on {selectedDate}:</h3>
                    <div className="hours-list">
                        {availableHours.map((hour, index) => (
                            <span 
                                key={index} 
                                className={`hour-item ${selectedTime === hour ? 'active-hour' : ''}`} 
                                onClick={() => setSelectedTime(hour)}
                            >
                                {hour}
                            </span>
                        ))}
                    </div>
                    <button onClick={handleSetVisibleContactForm} className="rezervare" disabled={!selectedTime}>
                        Rezerva in data de {selectedDate} la ora {selectedTime}
                    </button>
                    <form className={`${visibleContactForm}`} onSubmit={handleBookAppointment}>
                        <p>Completeaza informatiile de contact</p>
                        <div>
                            <label>Nume</label>
                            <input type="text" name="user_name" onChange={handleChange} />
                        </div>
                        <div>
                            <label>Email</label>
                            <input type="email" name="user_email" onChange={handleChange} />
                        </div>
                        <div>
                            <label>Telefon</label>
                            <input type="tel" name="user_phone" onChange={handleChange} />
                        </div>
                        <input type="submit" value="Rezerva" className='send' />
                    </form>
                </div>
            )}  
        </div>
    );
};

const getDatesForNext10Days = () => {
    const dates = [];
    const today = new Date();

    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();
    const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Get remaining days of the current month
    for (let i = currentDay; i <= daysInCurrentMonth; i++) {
        const date = new Date(currentYear, currentMonth, i);
        const day = date.getDate();
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const monthName = date.toLocaleDateString('en-US', { month: 'short' });
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Months are 0-based
        const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        dates.push({ day, dayName, monthName, dateStr });
    }

    // Get the next 10 days of the next month
    const nextMonth = (currentMonth + 1) % 12;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

    for (let i = 1; i <= 10; i++) {
        const date = new Date(nextYear, nextMonth, i);
        const day = date.getDate();
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const monthName = date.toLocaleDateString('en-US', { month: 'short' });
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Months are 0-based
        const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        dates.push({ day, dayName, monthName, dateStr });
    }

    return dates;
};

export default DateSlider;
