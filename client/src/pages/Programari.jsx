import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/programari.css";
import emailjs from '@emailjs/browser';

const Programari = () => {
  const form = useRef();
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [staffList, setStaffList] = useState([]);
  const [staffName, setStaffName] = useState("");
  // New state to toggle between active and expired views
  const [showExpired, setShowExpired] = useState(false);

  // ... (other states and functions remain unchanged)

  const formatDateToYYYYMMDD = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

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
      // Add a selectedStaff property to each appointment
      setAppointments(data.map(appointment => ({
        ...appointment,
        selectedStaff: '',
      })));
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleStaffChange = (event, appointmentId) => {
    setStaffName(event.target.value);
    const newStaffName = event.target.value;
    setAppointments(prevAppointments =>
      prevAppointments.map(appointment =>
        appointment.id === appointmentId
          ? { ...appointment, selectedStaff: newStaffName }
          : appointment
      )
    );
  };

  const handleFilterDateChange = (event) => {
    setFilterDate(event.target.value);
  };

  const handleFilter = () => {
    const queryParams = new URLSearchParams();
    if (filterDate) queryParams.append('date', filterDate);
    if (staffName) queryParams.append('staff', staffName);
    console.log(queryParams);
    navigate(`/admin/appointments?${queryParams.toString()}`);
  };

  // Approve, cancel, and other handlers remain unchanged...
  const handleApprove = async (id, appointment) => {
    try {
      const response = await fetch(`https://estyllo.onrender.com:443/api/appointments/approve/${id}`, {
        method: 'POST',
      });
      if (response.ok) {
        const templateParams = {
          user_name: appointment.user_name, 
          user_email: appointment.user_email,
          service: appointment.service,
          data: formatDate(appointment.date),
          hour: appointment.hour,
        };
        emailjs
          .send('service_0lyo23b', 'template_ezzw8se', templateParams, {
            publicKey: 'LkSgC9hGnj0Ums7Ga',
          })
          .then(
            () => {},
            (error) => { console.log('FAILED...', error.text); }
          );
        fetchAppointments(); 
      } else {
        alert('Failed to approve appointment.');
      }
    } catch (error) {
      console.error('Error approving appointment:', error);
    }
  };

  const handleCancel = async (id, appointment) => {
    try {
      const response = await fetch(`https://estyllo.onrender.com:443/api/appointments/cancel/${id}`, {
        method: 'POST',
      });
      if (response.ok) {
        alert('Rezervare anulată cu succes.');
        fetchAppointments();
      } else {
        alert('Failed to cancel appointment.');
      }
    } catch (error) {
      console.error('Error canceling appointment:', error);
    }
  };

  const handleStaffSelect = async (appointment) => {
    const appointmentDetails = {
      personal: appointment.selectedStaff,
      hour: appointment.hour,
      date: formatDateToYYYYMMDD(appointment.date),
      serviciu: appointment.service
    };
    try {
      const response = await fetch(`https://estyllo.onrender.com:443/api/appointments/setPersonal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentDetails),
      });
      if (response.ok) {
        fetchAppointments();
      } else {
        console.error("Failed to update appointment:", response.statusText);
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  // Reschedule-related states and functions...
  const [selectedPersonal, setPersonal] = useState("");
  const [current_date, setCurrentDate] = useState("");
  const [current_hour, setCurrentHour] = useState("");
  const [visible, setVisible] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  const handleHourChange = (event) => {
    setSelectedHour(event.target.value);
  };
  const handleSetVisible = () => {
    setVisible(visible === "" ? "visible" : "");
  };
  const handleReschedule = async (date, personal, current_date, current_hour) => {
    setPersonal(personal);
    setCurrentDate(formatDateToYYYYMMDD(current_date));
    setCurrentHour(current_hour);
  };
  const availableHours = ["9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00"];
  const [availableDates, setAvailableDates] = useState([]);
  const todayObj = new Date();
  const generateDates = () => {
    const datesArray = [];
    for (let i = 0; i <= 14; i++) {
      const date = new Date();
      date.setDate(todayObj.getDate() + i);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      datesArray.push(`${day}-${month}-${year}`);
    }
    setAvailableDates(datesArray);
  };

  useEffect(() => {
    fetchAppointments();
    fetchStaff();
    generateDates();
    const intervalId = setInterval(() => {
      fetchAppointments();
      fetchStaff();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const makeReschedule = async (e) => {
    e.preventDefault();
    const formatedDate = formatDateToYYYYMMDD(selectedDate);
    if (!formatedDate) {
      alert('Invalid date selected. Please try again.');
      return;
    }
    const newAppointment = {
      hour: selectedHour,
      date: formatedDate,
    };
    try {
      const response = await fetch(`https://estyllo.onrender.com:443/api/appointments/reschedule?current_hour=${current_hour}&current_date=${current_date}&personal=${selectedPersonal}`, {
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
  };

  // ----------------------------------------------------------------
  // Filter appointments into active and expired (for accepted ones)
 // Today's date (with time set to 0 for accurate comparison)
const today = new Date();
today.setHours(0, 0, 0, 0);

const activeAppointments = appointments
  .filter(app => {
    const appDate = new Date(app.date);
    appDate.setHours(0, 0, 0, 0);
    return appDate >= today; // Active appointments: today or later
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date)); // Descending order

const expiredAppointments = appointments
  .filter(app => {
    const appDate = new Date(app.date);
    appDate.setHours(0, 0, 0, 0);
    return appDate < today && app.status === "acceptata";
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date)); // Descending order
  // ----------------------------------------------------------------

  return (
    <div className='programari'>
      <div className="header">
        {/* Toggle Button to switch between views */}
        <h1>{showExpired ? "Programări Expirate" : "Toate programările"}</h1>
        <div>
          <button onClick={() => setShowExpired(!showExpired)}>
            {showExpired ? "Arată programări active" : "Arată programări expirate"}
          </button>
          {/* Existing filter/select elements (if needed) */}
          <select onChange={handleStaffChange} value={staffName}>
            <option value="Niciun personal selectat">Selectează personal</option>
            {staffList.map((staff) => (
              <option key={staff.name} value={staff.name}>
                {staff.name}
              </option>
            ))}
          </select>
          <input type="date" onChange={handleFilterDateChange} value={filterDate} />
          <button onClick={handleFilter}>Filtrează</button>
        </div>
      </div>

      {showExpired ? (
        // Expired Appointments Table (only accepted appointments that are expired)
        <table>
          <thead>
            <tr>
              <th>Personal</th>
              <th>Data</th>
              <th>Ora</th>
              <th>Serviciu</th>
              <th>Telefon</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {expiredAppointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.personal}</td>
                <td>{formatDate(appointment.date)}</td>
                <td>{appointment.hour}</td>
                <td>{appointment.service}</td>
                <td>{appointment.user_phone}</td>
                <td>{appointment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        // Active (non-expired) Appointments Table
        <table>
          <thead>
            <tr>
              <th>Personal</th>
              <th>Data</th>
              <th>Ora</th>
              <th>Serviciu</th>
              <th>Telefon</th>
              <th>Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {activeAppointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>
                  {appointment.personal}
                  {appointment.status === "acceptata" && (
                    <>
                      <select
                        onChange={(event) => handleStaffChange(event, appointment.id)}
                        value={appointment.selectedStaff}
                      >
                        <option value="">Selectează personal</option>
                        {staffList.map((staff) => (
                          <option key={staff.name} value={staff.name}>
                            {staff.name}
                          </option>
                        ))}
                      </select>
                      <button onClick={() => handleStaffSelect(appointment)}>Actualizează</button>
                    </>
                  )}
                </td>
                <td>{formatDate(appointment.date)}</td>
                <td>{appointment.hour}</td>
                <td><b>{appointment.service}</b></td>
                <td>{appointment.user_phone}</td>
                <td className='actions'>
                  {appointment.status === 'in asteptare' && (
                    <>
                      <button className='approve' onClick={() => handleApprove(appointment.id, appointment)}>Acceptă</button>
                      <button className='cancel' onClick={() => handleCancel(appointment.id, appointment)}>Anulează</button>
                    </>
                  )}
                  {appointment.status === 'acceptata' && (
                    <>
                      <p>Acceptată</p>
                      <button className='cancel' onClick={() => handleCancel(appointment.id, appointment)}>Anulează</button>
                      <button className='reschedule' onClick={() => { handleSetVisible(); handleReschedule(selectedDate ? selectedDate : appointment.date, appointment.personal, appointment.date, appointment.hour); }}>
                        Modifică
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Reschedule form remains unchanged */}
      <form onSubmit={(e) => { makeReschedule(e); }} className={`${visible}`}>
        <div>
          <label htmlFor="data">Schimbă data</label>
          <select onChange={handleDateChange} value={selectedDate || ""}>
            <option value="">Selectează data</option>
            {availableDates.map((date, index) => (
              <option key={index} value={date}>{date}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="ora">Schimbă ora</label>
          <select onChange={handleHourChange} value={selectedHour || ""}>
            <option value="">Selectează ora</option>
            {availableHours.map((hour, index) => (
              <option key={index} value={hour}>{hour}</option>
            ))}
          </select>
        </div>
        <input type="submit" value="Reprogramează" className='send' />
      </form>
    </div>
  );
};

export default Programari;
