// StaffAppointments.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import "../styles/program.css"
const StaffAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const staffName = queryParams.get('staff') || ''; // Extract staff name from URL query parameter
    const [staff, setStaffName] = useState('');
    const navigate = useNavigate();
    const [staffList, setStaffList] = useState([]);

    

    useEffect(() => {
        if (staffName) {
            fetchAppointments(staffName);
        }
        fetchStaff();
    }, [staffName]);

    const fetchStaff = async () => {
        try {
            const response = await fetch('https://estyllo.onrender.com/api/personal/getAll');
            const data = await response.json();
            console.log('Staff Data:', data); // Ensure this is correctly formatted
            setStaffList(data);
        } catch (error) {
            console.error('Error fetching staff:', error);
        }
    };
    
    const fetchAppointments = async (staff) => {
        
        try {
            const response = await fetch(`https://estyllo.onrender.com/api/appointments/getStaffAppointments?personal=${staff}`);
            const data = await response.json();
            setAppointments(data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const handleStaffChange = (event) => {
        setStaffName(event.target.value);
    };

    const handleFilter = () => {
        if (staff) {
            navigate(`/admin/appointments?staff=${encodeURIComponent(staff)}`);
        }
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };
    return (
        <div className="programari">
            <h1>Appointments for {staffName}</h1>
            <select onChange={handleStaffChange} value={staffName}>
                <option value="">Select Staff</option>
                {staffList.map((staff) => (
                    <option key={staff.name} value={staff.name}>
                        {staff.name}
                    </option>
                ))}
            </select>
            <button onClick={handleFilter}>Filter</button>
            {appointments.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Personal</th>
                            <th>Date</th>
                            <th>Time</th>
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
                <p>No appointments found for {staffName}</p>
            )}
        </div>
    );
};

export default StaffAppointments;
