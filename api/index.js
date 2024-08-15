import express from "express";
import mysql from "mysql";
import personalRouter from './routes/personal.routes.js';
import reviewsRouter from './routes/reviews.routes.js';
import cors from 'cors';
import preturiRouter from "./routes/preturi.routes.js";
import programariRouter from "./routes/programari.route.js";
import path from "path"
import dotenv from "dotenv"

dotenv.config();
const app = express();

app.listen(3000, () => {
    console.log("Server is running on port 3000!!!")
});

const db = mysql.createConnection({
    host: process.env.DB_HOST , 
    user: process.env.DB_USER ,
    password: process.env.DB_PASS ,
    database: process.env.DB_NAME 
});
console.log(process.env.DB_USER)
db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err.message);
        return;
    }
    console.log("Connected to the estyllo database");
});

const __dirname = path.resolve()
app.set('db', db);

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        callback(null, true);
    },
    credentials: true
};
// app.use(express.static(path.join(__dirname,"/client/dist")))
// app.get('*',(req,res)=> {
//     res.sendFile(path.join(__dirname,'client', 'dist', 'index.html'))
// })


app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/personal", personalRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/preturi", preturiRouter);
app.use("/api/appointments", programariRouter);
