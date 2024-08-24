import express from 'express';
import { approveAppointment,cancelAppointment , getAllAppointments, bookAppointment, getAvailableHours, getStaffAppointments,rescheduleAppointment} from '../controllers/programari.controller.js';

const programariRouter = express.Router();
programariRouter.get('/getAll', getAllAppointments);
programariRouter.get('/getStaffAppointments', getStaffAppointments);

programariRouter.post('/approve/:id', approveAppointment);
programariRouter.post('/cancel/:id', cancelAppointment);

programariRouter.post('/reschedule', rescheduleAppointment);


programariRouter.post('/create', bookAppointment);
programariRouter.get('/available-hours', getAvailableHours );



export default programariRouter;