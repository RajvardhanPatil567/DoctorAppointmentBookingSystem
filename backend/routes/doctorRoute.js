import express from 'express';
import { doctorList, addDoctor, changeAvailability } from '../controllers/doctorController.js'; // Added changeAvailability here, need to export it in controller too
import upload from '../middleware/multer.js';

const doctorRouter = express.Router();

doctorRouter.get('/list', doctorList);
doctorRouter.post('/add-doctor', upload.single('image'), addDoctor);
doctorRouter.post('/change-availability', changeAvailability); // Adding this as I implemented it in controller

export default doctorRouter;
