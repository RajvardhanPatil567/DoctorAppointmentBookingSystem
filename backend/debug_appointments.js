import mongoose from 'mongoose';
import dotenv from 'dotenv';
import doctorModel from './models/doctorModel.js';
import appointmentModel from './models/appointmentModel.js';
import connectDB from './config/mongodb.js';

dotenv.config();

const checkData = async () => {
    try {
        await connectDB();

        const doctors = await doctorModel.find({});
        console.log('--- Current Doctors ---');
        doctors.forEach(d => console.log(`${d.name}: ${d._id}`));

        const appointments = await appointmentModel.find({});
        console.log('\n--- Existing Appointments ---');
        appointments.forEach(a => {
            console.log(`Appt ID: ${a._id}, Doc ID: ${a.docId}, For Doctor: ${a.docData?.name}`);
            const matchingDoc = doctors.find(d => d._id.toString() === a.docId.toString());
            if (matchingDoc) {
                console.log(`   -> MATCHES Current Doctor: ${matchingDoc.name}`);
            } else {
                console.log(`   -> ORPHANED (Doc ID not found in Doctors)`);
            }
        });

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkData();
