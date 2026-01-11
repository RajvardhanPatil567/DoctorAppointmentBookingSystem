import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { configDotenv } from 'dotenv';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import doctorRouter from './routes/doctorRoute.js';
configDotenv();
//app config
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
connectCloudinary();
//middlewares
app.use(express.json());
app.use(cors());
//api end points
app.use('/api/user', userRouter);
app.use('/api/doctor', doctorRouter);
app.get('/', (req, res) => {
    res.status(200).send('API is Working');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});