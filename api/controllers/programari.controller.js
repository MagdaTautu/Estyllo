// Controller functions (programari.controller.js)

export const getAllAppointments = async (req, res, next) => {
    const db = req.app.get('db');

    try {
        const query = `SELECT id, personal, date, hour, status, service, user_email, user_phone,user_name FROM programari ORDER BY date, hour`;
        db.query(query, (err, results) => {
            if (err) {
                console.error("Error fetching appointments:", err.message);
                res.status(500).send("Server error");
                return;
            }
            res.json(results);
        });
    } catch (error) {
        console.error("Error fetching appointments:", error.message);
        res.status(500).send("Failed to fetch appointments");
    }
};

export const bookAppointment = async (req, res, next) => {
    const db = req.app.get('db');
    const { personal, date, hour, service,user_email,user_phone, user_name } = req.body;
    if (!personal || !date || !hour || !service || !user_email || !user_phone || !user_name) {
        res.status(400).send("Personal, date, hour. service are required");
        return;
    }
    try {
        const query = `INSERT INTO programari (personal, date, hour, status, service, user_email,user_phone, user_name) VALUES (?, ?, ?, 'in asteptare', ?, ?,?,?)`;
        await db.query(query, [personal, date, hour, service, user_email,user_phone,user_name]);
        res.status(201).send("Appointment booked successfully");
    } catch (error) {
        console.error("Error booking appointment:", error.message);
        res.status(500).send("Failed to book appointment");
    }
};

export const approveAppointment = async (req, res, next) => {
    const db = req.app.get('db');
    const { id } = req.params;

    if (!id) {
        res.status(400).send("Appointment ID is required");
        return;
    }

    try {
        const query = `UPDATE programari SET status = 'acceptata' WHERE id = ?`;
        await db.query(query, [id]);

        // Optionally, remove the slot from available_hours (not implemented here)
        // await db.query(`DELETE FROM available_hours WHERE date = ? AND hour = ? AND personal = ?`, [date, hour, personal]);

        res.status(200).send("Appointment approved successfully");
    } catch (error) {
        console.error("Error approving appointment:", error.message);
        res.status(500).send("Failed to approve appointment");
    }
};

export const rescheduleAppointment = async (req, res, next) => {
    const db = req.app.get('db');
    const { current_hour, current_date, personal } = req.query; // Using req.query instead of req.params
    const { hour, date } = req.body;
    console.log(current_hour, current_date, hour, date)
    if (!current_hour || !current_date || !personal || !hour || !date) {
        res.status(400).send("All parameters (current_hour, current_date, personal, hour, date) are required");
        return;
    }

    try {
        const query = `UPDATE programari SET hour = ?, date = ? WHERE personal = ? AND hour = ? AND date = ?`;
        await db.query(query, [hour, date, personal, current_hour, current_date]);

        res.status(200).send("Appointment rescheduled successfully");
    } catch (error) {
        console.error("Error rescheduling appointment:", error.message);
        res.status(500).send("Failed to reschedule appointment");
    }
};


export const setPersonal = async (req, res, next) => {
    const db = req.app.get('db'); 
    const { personal, hour,date, serviciu } = req.body;
    if (!personal || !hour || !date || !serviciu) {
        res.status(400).send("All parameters (current_hour, current_date, personal, hour, date) are required");
        return;
    }
    try {
        const query = `UPDATE programari SET personal = ? WHERE hour = ? AND date = ? and service = ?`;
        // const query = `INSERT INTO programari (personal, date, hour, status, service,user_email,user_phone) VALUES (?, ?, ?, 'x' ,?,'a','b')`;

        console.log("Executing query:", query);
console.log("With values:", [personal, date,hour , serviciu]);
        await db.query(query, [personal,hour,date, serviciu]);
        
        res.status(200).send("Appointment rescheduled successfully");
    } catch (error) {
        console.error("Error rescheduling appointment:", error.message);
        res.status(500).send("Failed to reschedule appointment");
    }
};

export const cancelAppointment = async (req, res, next) => {
    const db = req.app.get('db');
    const { id } = req.params;

    if (!id) {
        res.status(400).send("Appointment ID is required");
        return;
    }

    try {
        const query = `DELETE FROM programari WHERE id = ?`;
        await db.query(query, [id]);
        res.status(200).send("Appointment cancelled successfully");
    } catch (error) {
        console.error("Error cancelling appointment:", error.message);
        res.status(500).send("Failed to cancel appointment");
    }
};





export const getAvailableHours = async (req, res, next) => {
    const db = req.app.get('db');
    const { personal, date } = req.query;
    if (!personal || !date) {
        return res.status(400).send("Personal and date are required");
    }

    try {
        const query = `SELECT hour FROM programari WHERE personal = ? AND date = ? AND status = 'acceptata'`;
        db.query(query, [personal, date], (err, results) => {
            if (err) {
                console.error("Error fetching booked hours:", err.message);
                return res.status(500).send("Server error");
            }

            // Ensure bookedHours is defined and mapped correctly
            const bookedHours = results.map(result => result.hour);

            // Generate all possible hours (assuming from 9:00 to 21:00)
            const allHours = [];
            for (let hour = 9; hour <= 21; hour++) {
                allHours.push(`${hour}:00`);
            }

            // Filter out the booked hours
            const availableHours = allHours.filter(hour => !bookedHours.includes(hour));

            res.json({ availableHours });
        });
    } catch (error) {
        console.error("Error fetching available hours:", error.message);
        res.status(500).send("Failed to fetch available hours");
    }
};

export const getService = async (req, res, next) => {
    const db = req.app.get('db');
    const nume = req.query.nume;

    if (!nume) {
        res.status(400).send("Service name is required");
        return;
    }

    const query = `SELECT serviciu FROM personal WHERE nume = ?`; 
    db.query(query, [nume], (err, results) => {
        if (err) {
            console.error("Error executing query:", err.message);
            res.status(500).send("Server error");
            return;
        }
        res.json(results);
    });
};


export const getStaffAppointments = async (req, res, next) => {
    const db = req.app.get('db');
    const { personal, date } = req.query;

    let query = `SELECT id, personal, date, hour, status FROM programari WHERE 1=1`;
    const queryParams = [];

    if (personal) {
        query += ` AND personal = ?`;
        queryParams.push(personal);
    }

    if (date) {
        query += ` AND date = ?`;
        queryParams.push(date);
    }

    query += ` ORDER BY date, hour`;

    try {
        db.query(query, queryParams, (err, results) => {
            if (err) {
                console.error("Error fetching appointments:", err.message);
                res.status(500).send("Server error");
                return;
            }
            res.json(results);
        });
    } catch (error) {
        console.error("Error fetching appointments:", error.message);
        res.status(500).send("Failed to fetch appointments");
    }
};
