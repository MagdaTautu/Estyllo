import express from "express";
import mysql from "mysql";
import personalRouter from './routes/personal.routes.js';
import reviewsRouter from './routes/reviews.routes.js';
import cors from 'cors';
import preturiRouter from "./routes/preturi.routes.js";
import programariRouter from "./routes/programari.route.js";

const app = express();

app.listen(3000, () => {
    console.log("Server is running on port 3000!!!")
});

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "estyllo"
});
db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err.message);
        return;
    }
    console.log("Connected to the estyllo database");
});

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
app.use("/api/personal", personalRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/preturi", preturiRouter);
app.use("/api/appointments", programariRouter);