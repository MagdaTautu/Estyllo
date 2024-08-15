import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Programari = () => {
    const [appointments, setAppointments] = useState([]);
    const [staffName, setStaffName] = useState('');
    const [staffList, setStaffList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAppointments();
        fetchStaff();

    }, []);
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
    

    const fetchAppointments = async () => {
        try {
            const response = await fetch('https://estyllo.onrender.com/api/appointments/getAll');
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
        if (staffName) {
            navigate(`/admin/appointments?staff=${encodeURIComponent(staffName)}`);
        }
    };
    const handleApprove = async (id) => {
        try {
            const response = await fetch(`https://estyllo.onrender.com/api/appointments/approve/${id}`, {
                method: 'POST',
            });

            if (response.ok) {
                fetchAppointments(); // Refresh the list after approval
            } else {
                alert('Failed to approve appointment.');
            }
        } catch (error) {
            console.error('Error approving appointment:', error);
        }
    };

    const handleCancel = async (id) => {
        try {
            const response = await fetch(`https://estyllo.onrender.com/api/appointments/cancel/${id}`, {
                method: 'POST',
            });

            if (response.ok) {
                fetchAppointments(); // Refresh the list after cancellation
            } else {
                alert('Failed to cancel appointment.');
            }
        } catch (error) {
            console.error('Error canceling appointment:', error);
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
        <div className='programari'>
            <h1>All Appointments</h1>
            <select onChange={handleStaffChange} value={staffName}>
                <option value="">Select Staff</option>
                {staffList.map((staff) => (
                    <option key={staff.name} value={staff.name}>
                        {staff.name}
                    </option>
                ))}
            </select>
            <button onClick={handleFilter}>Filter</button>
            <table>
                <thead>
                    <tr>
                        <th>Personal</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td>{appointment.personal}</td>
                            <td>{formatDate(appointment.date)}</td>
                            <td>{appointment.hour}</td>
                            <td>{appointment.status}</td>
                            <td>
                                {appointment.status === 'pending' && (
                                    <>
                                        <button onClick={() => handleApprove(appointment.id)}>Approve</button>
                                        <button onClick={() => handleCancel(appointment.id)}>Cancel</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Programari;
