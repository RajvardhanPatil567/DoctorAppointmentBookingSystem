import mongoose from 'mongoose';
import dotenv from 'dotenv';
import doctorModel from './models/doctorModel.js';
import connectDB from './config/mongodb.js';

dotenv.config();

const showDoctors = async () => {
    try {
        await connectDB();

        console.log('Fetching doctors from "doctors" collection in MongoDB...');
        const doctors = await doctorModel.find({});

        if (doctors.length === 0) {
            console.log('No doctors found in the database.');
        } else {
            console.log(`Found ${doctors.length} doctors:\n`);
            doctors.forEach(doc => {
                console.log(`ID: ${doc._id}`);
                console.log(`Name: ${doc.name}`);
                console.log(`Email: ${doc.email}`);
                console.log(`Password (Hashed): ${doc.password.substring(0, 20)}...`); // Show partial hash
                console.log('-----------------------------------');
            });
        }

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

showDoctors();
