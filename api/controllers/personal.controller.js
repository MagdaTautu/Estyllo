export const getAll = async (req, res, next) => {
    const db = req.app.get('db');
    try {
        const staffQuery = 'SELECT DISTINCT nume FROM personal'; 
        db.query(staffQuery, (err, results) => {
            if (err) {
                console.error('Error fetching staff:', err.message);
                res.status(500).send('Server error');
                return;
            }
            
            // Map the results to the expected format
            const staffList = results.map(row => ({ name: row.nume }));
            res.json(staffList);
        });
    } catch (error) {
        console.error('Error fetching staff:', error.message);
        res.status(500).send('Failed to fetch staff');
    }
};



export const getPersonal = async (req, res, next) => {
    const db = req.app.get('db');
    const service_name = req.query.service;

    if (!service_name) {
        res.status(400).send("Service name is required");
        return;
    }

    const query = `SELECT nume FROM personal WHERE serviciu = ?`; 
    db.query(query, [service_name], (err, results) => {
        if (err) {
            console.error("Error executing query:", err.message);
            res.status(500).send("Server error");
            return;
        }
        res.json(results);
    });
};


export const getTeam = async (req, res, next) => {
    const db = req.app.get('db');
    const person = req.query.person;

    if (!person) {
        res.status(400).send("Person name is required");
        return;
    }

    const query = `SELECT echipa FROM personal WHERE nume = ?`; 
    db.query(query, [person], (err, results) => {
        if (err) {
            console.error("Error executing query:", err.message);
            res.status(500).send("Server error");
            return;
        }
        res.json(results);
    });
};



export const getSchedule = async (req, res, next) => {
    const db = req.app.get('db');
    let team = req.query.team;
    if(team === "galbena") team = "yellow"
    else if (team === "rosie") team="red"
    console.log(team)
    if (!team) {
        res.status(400).send("Team name is required");
        return;
    }

    const query = `SELECT data,zi FROM program WHERE echipa = ?`; 
    db.query(query, [team], (err, results) => {
        if (err) {
            console.error("Error executing query:", err.message);
            res.status(500).send("Server error");
            return;
        }
        res.json(results);
    });
};

export const saveSchedule = async (req, res, next) => {
    const db = req.app.get('db');
    const schedule = req.body;

    console.log('Received schedule:', schedule); // Log the received schedule

    if (!schedule) {
        console.error('Schedule is undefined');
        return res.status(400).send('Invalid schedule format');
    }

    // Check if the schedule is an array
    if (!Array.isArray(schedule)) {
        console.error('Invalid schedule format:', schedule);
        return res.status(400).send('Invalid schedule format');
    }

    try {
        const insert = async (table, data) => {
            const query = `
                INSERT INTO ${table} (data, zi, echipa)
                VALUES (?, ?, ?)
            `;
            for (const entry of data) {
                if (entry.data && entry.zi && entry.echipa) {
                    await db.query(query, [entry.data, entry.zi, entry.echipa]);
                } else {
                    console.error('Invalid entry:', entry);
                    throw new Error('Invalid entry in data array');
                }
            }
        };

        await insert('program', schedule);
        res.status(200).send('Schedule saved successfully');
    } catch (error) {
        console.error('Error saving schedule:', error);
        res.status(500).send('Failed to save schedule');
    }
};
