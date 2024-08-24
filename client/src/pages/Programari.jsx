import React, {useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/programari.css";
import emailjs from '@emailjs/browser';
const Programari = () => {
    const [appointments, setAppointments] = useState([]);
    const [Appointment, setAppointment] = useState();
    const [staffName, setStaffName] = useState('');
    const [filterDate, setFilterDate] = useState(''); // New state for date filter
    const [staffList, setStaffList] = useState([]);
    const navigate = useNavigate();
    
    
    const fetchStaff = async () => {
        try {
            const response = await fetch('https://estyllo.onrender.com:443/api/personal/getAll');
            const data = await response.json();
            setStaffList(data);
        } catch (error) {
            console.error('Error fetching staff:', error);
        }
    };

    const fetchAppointments = async () => {
        try {
            const response = await fetch('https://estyllo.onrender.com:443/api/appointments/getAll');
            const data = await response.json();
            setAppointments(data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const handleStaffChange = (event) => {
        setStaffName(event.target.value);
    };

    const handleFilterDateChange = (event) => {
        setFilterDate(event.target.value);
    };

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedHour, setSelectedHour] = useState(null);

    const handleDateChange = (event) => {
        setSelectedDate((event.target.value));
    };

    const handleHourChange = (event) => {
        setSelectedHour((event.target.value));
    };
    const handleFilter = () => {
        const queryParams = new URLSearchParams();
        if (staffName) queryParams.append('staff', staffName);
        if (filterDate) queryParams.append('date', filterDate);
        navigate(`/admin/appointments?${queryParams.toString()}`);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleApprove = async (id) => {
        try {
            const response = await fetch(`https://estyllo.onrender.com:443/api/appointments/approve/${id}`, {
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
    const sendEmail = (appointment) => {
        
        const templateParams = {
            user_name: appointment.user_name,
            service: appointment.service,
            data: formatDate(appointment.date),
            hour: appointment.hour,
            user_email: appointment.user_email 
        };
        console.log(templateParams)
        emailjs
            .send('service_v4k6okq', 'template_q93al0u', templateParams, {
            publicKey: 'x4jYf-9vgr8qSIvl5',
            })
            .then(
            () => {
            },
            (error) => {
                console.log('FAILED...', error.text);
            },
            );
        };
    const handleCancel = async (id, appointment) => {
    console.log(appointment)
        setAppointment(appointment)
        sendEmail(appointment)

        try {
            const response = await fetch(`https://estyllo.onrender.com:443/api/appointments/cancel/${id}`, {
                method: 'POST',
            });

            if (response.ok) {
                alert('Appointment canceled successfully.');

                fetchAppointments(); 
            } else {
                alert('Failed to cancel appointment.');
            }
        } catch (error) {
            console.error('Error canceling appointment:', error);
        }
    };
    

    const [visible,setVisible] = useState("")
    const [availableHours, setAvailableHours] = useState([]);
    const [availableDates, setAvailableDates] = useState([]);
    const [team, setTeam] = useState("");

    const handleSetVisible = () => {
        if(visible === "")
            setVisible("visible")
        else setVisible("")
    }

    const formatDateToYYYYMMDD = (dateStr) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
    
        return `${year}-${month}-${day}`;
    };
    const fetchTeam = async (person) => {
        try {
          const response = await fetch(
            `https://estyllo.onrender.com:443/api/personal/getTeam?person=${person}`
          );
          const data = await response.json();
          const echipa = data.map((team) => team.echipa);
           return echipa
        } catch (error) {
          console.error("Error fetching personal:", error);
        }
      };
      const handleGetDates = async (echipa) => {

        try {
          const response = await fetch(
            `https://estyllo.onrender.com:443/api/personal/get-schedule?team=${echipa}`
          );
          const data = await response.json();
    
          const formattedDates = data.map((item) => {
            const [year, month, day] = item.data.split("T")[0].split("-");
            return `${year}-${parseInt(month, 10)}-${parseInt(day, 10)}`;
          });
          return formattedDates
    
        } catch (error) {
          console.error("Error fetching schedule:", error);
        }
      };
      const [selectedPersonal, setPersonal] = useState("")
      const [current_date, setCurrentDate] = useState("")
      const [current_hour, setCurrentHour] = useState("")
    const handleReschedule = async ( date,personal, current_date, current_hour) => {

        const echipa = await fetchTeam(personal)
        setTeam(echipa)

        const availableDates = await handleGetDates(echipa);
        
        setAvailableDates(availableDates)
        
        setPersonal(personal)
        setCurrentDate(current_date)
        setCurrentHour(current_hour)
    };
    

    const makeReschedule = async (e) => {
        const formatedDate = formatDateToYYYYMMDD(current_date)
        e.preventDefault()
        console.log(selectedPersonal, formatDateToYYYYMMDD(current_date), current_hour)
        const newAppointment = {
            hour: selectedHour,
            date: selectedDate
        };
        try {
            const response = await fetch(`https://estyllo.onrender.com:443/api/appointments/reschedule?current_hour=${current_hour}&current_date=${formatedDate}&personal=${selectedPersonal}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newAppointment),
            });

            if (response.ok) {
                alert('Rezervare actualizata cu succes!');
                window.location.reload();

               
            } else {
                alert('Rezervare nereusita! Incearca din nou!');
            }
        } catch (error) {
            console.error('Error booking appointment:', error);
        }
    }
    useEffect(() => {
        handleGetHours(selectedDate);
    }, [selectedDate]);
    useEffect(() => {
        fetchAppointments(); 
        fetchStaff();
        const intervalId = setInterval(() => {
            fetchStaff();
            fetchAppointments();
        }, 5000); 
        return () => clearInterval(intervalId);
    }, []); 
    const handleGetHours = async (date) => {
        const formatedDate = formatDateToYYYYMMDD(date)

        try {
            const response = await fetch(`https://estyllo.onrender.com:443/api/appointments/available-hours?personal=Gina&date=${formatedDate}`);
            const data = await response.json();
            
            setAvailableHours(data.availableHours);
        } catch (error) {
            console.error('Error fetching available hours:', error);
        }
    }
    return (
        <div className='programari'>
            <h1>Toate programarile</h1>
            <select onChange={handleStaffChange} value={staffName}>
                <option value="">Selecteaza personal</option>
                {staffList.map((staff) => (
                    <option key={staff.name} value={staff.name}>
                        {staff.name}
                    </option>
                ))}
            </select>
            <input 
                type="date" 
                onChange={handleFilterDateChange} 
                value={filterDate} 
            />
            <button onClick={handleFilter}>Filtreaza</button>
            <table>
                <thead>
                    <tr>
                        <th>Personal</th>
                        <th>Data</th>
                        <th>Ora</th>
                        <th>Serviciu</th>
                        <th>Actiuni</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td>{appointment.personal}</td>
                            <td>{formatDate(appointment.date)}</td>
                            <td>{appointment.hour}</td>
                            <td><b>{appointment.service}</b></td>
                            <td className='actions'>
                                {appointment.status === 'in asteptare' && (
                                    <>
                                        <button className='approve' onClick={() => handleApprove(appointment.id)}>Accepta</button>
                                        <button className='cancel' onClick={() => {handleCancel(appointment.id, appointment);}}>Anuleaza</button>
                                    </>
                                )}
                                {appointment.status === 'acceptata' && (
                                    
                                    <>
                                        <p>Acceptata</p>
                                        <button className='cancel' onClick={() => handleCancel(appointment.id, appointment)}>Anuleaza</button>
                                        <button className='reschedule' onClick={() => {handleSetVisible(), handleReschedule(selectedDate?selectedDate:appointment.date, appointment.personal, appointment.date, appointment.hour)}}>Modifica</button>
                                    </>
                                )}
                            </td>

                            
                        </tr>
                    ))}
                </tbody>
            </table>
            <form onSubmit={(e)=>{makeReschedule(e)}} className={`${visible}` }>
                <div>
                    <label htmlFor="data">Schimba data</label>
                    <select onChange={handleDateChange} value={selectedDate}>
                    <option value="">Selecteaza data</option>
                    {availableDates.map((date,index) => (
                        <option key={index} value={availableDates[index]}>
                           {availableDates[index]}
                        </option>
                    ))}
            </select>
                </div>
                <div>
                    <label htmlFor="ora" >Schimba ora</label>
                    <select onChange={handleHourChange} value={selectedHour}>
                        <option value="">Selecteaza ora</option>
                        {availableHours.map((hour, index) => (
                            <option key={index} value={hour}>
                                {availableHours[index]}
                            </option>
                        ))}
                    </select>
                </div>
              
                <input type="submit" value="Reprogrameaza" className='send' />
                
            </form>
        </div>
    );
};

export default Programari;
