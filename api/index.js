import express from "express";
import mysql from "mysql";
import personalRouter from './routes/personal.routes.js';
import reviewsRouter from './routes/reviews.routes.js';
import cors from 'cors';
import preturiRouter from "./routes/preturi.routes.js";
import programariRouter from "./routes/programari.route.js";
import path from "path";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();

const db = mysql.createPool({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection((err, conn) => {
    if (err) {
        console.error("Error connecting to the database:", err.message);
        return;
    }
    console.log("Connected successfully to estyllo database");
});

const __dirname = path.resolve();
app.set('db', db);

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        callback(null, true);
    },
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// API routes
app.use("/api/personal", personalRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/preturi", preturiRouter);
app.use("/api/appointments", programariRouter);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// Catch-all handler for any requests not handled by the API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.listen(3000, () => {
    console.log("Server is running on port 3000!!!");
});
