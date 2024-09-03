import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "../styles/program.css";

const StaffAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const staffName = queryParams.get('staff') || '';
    const [staff, setStaffName] = useState(staffName);
    const [date, setDate] = useState(queryParams.get('date') || ''); // New state for date filter
    const [staffList, setStaffList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (staff || date) {
            fetchAppointments(staff, date);
        }
        fetchStaff();
    }, [staff, date]);

    const fetchStaff = async () => {
        try {
            const response = await fetch('https://estyllo.onrender.com:3000/api/personal/getAll');
            const data = await response.json();
            setStaffList(data);
        } catch (error) {
            console.error('Error fetching staff:', error);
        }
    };

    const fetchAppointments = async (staff, date) => {
        try {
            let url = `https://estyllo.onrender.com:3000/api/appointments/getStaffAppointments?`;
            const params = [];
            if (staff) params.push(`personal=${staff}`);
            if (date) params.push(`date=${date}`);
            url += params.join('&');

            const response = await fetch(url);
            const data = await response.json();
            setAppointments(data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const handleStaffChange = (event) => {
        setStaffName(event.target.value);
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleFilter = () => {
        const queryParams = new URLSearchParams();
        if (staff) queryParams.append('staff', staff);
        if (date) queryParams.append('date', date);
        navigate(`/admin/appointments?${queryParams.toString()}`);
        if(staff == "")
        navigate('/admin/programari');
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <div className="programari">
            {
                staff ? <h1>Programari pentru {staff}</h1> : (
                    {date} ? <h1> Programari  in data de {date}</h1> : ""
                )
            }
            <select onChange={handleStaffChange} value={staff}>
                <option value="">Selecteaza personal</option>
                {staffList.map((staff) => (
                    <option key={staff.name} value={staff.name}>
                        {staff.name}
                    </option>
                ))}
            </select>
            <input 
                type="date" 
                onChange={handleDateChange} 
                value={date} 
            />
            <button onClick={handleFilter}>Filtreaza</button>
            {appointments.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            

                            <th>Personal</th>
                            <th>Data</th>
                            <th>Ora</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment) => (
                            <tr key={appointment.id}>
                                <td>{appointment.personal}</td>
                                <td>{formatDate(appointment.date)}</td>
                                <td>{appointment.hour}</td>
                                <td>{appointment.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Nu exista programari.</p>
            )}
        </div>
    );
};

export default StaffAppointments;
