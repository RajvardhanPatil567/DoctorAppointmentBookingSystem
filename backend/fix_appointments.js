import mongoose from 'mongoose';
import dotenv from 'dotenv';
import doctorModel from './models/doctorModel.js';
import appointmentModel from './models/appointmentModel.js';
import connectDB from './config/mongodb.js';

dotenv.config();

const fixAppointments = async () => {
    try {
        await connectDB();

        const doctors = await doctorModel.find({});
        const appointments = await appointmentModel.find({});

        console.log(`Found ${doctors.length} doctors and ${appointments.length} appointments.`);

        for (const app of appointments) {
            // Check if appointment has docData and name
            if (app.docData && app.docData.name) {
                const doctorName = app.docData.name;

                // Find matching new doctor
                const matchingDoc = doctors.find(d => d.name === doctorName);

                if (matchingDoc) {
                    // Update docId and docData
                    app.docId = matchingDoc._id;
                    app.docData = matchingDoc;

                    // Mark as modified just in case
                    app.markModified('docData');

                    await app.save();
                    console.log(`Updated appointment ${app._id}: Linked to ${matchingDoc.name} (${matchingDoc._id})`);
                } else {
                    console.log(`Could not find matching doctor for appointment ${app._id} (Name: ${doctorName})`);
                }
            }
        }

        console.log('Finished updating appointments.');
        process.exit(0);
    } catch (error) {
        console.error('Error fixing appointments:', error);
        process.exit(1);
    }
};

fixAppointments();
