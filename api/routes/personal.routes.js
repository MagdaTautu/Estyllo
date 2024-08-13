import express from 'express';
import { getPersonal, getTeam, saveSchedule,getSchedule, getAll } from '../controllers/personal.controller.js';


const personalRouter = express.Router();

personalRouter.get('/getPersonal', getPersonal);
personalRouter.get('/getAll', getAll);
personalRouter.get('/getTeam', getTeam);


personalRouter.post('/save-schedule', saveSchedule);
personalRouter.get('/get-schedule', getSchedule);




export default personalRouter;
