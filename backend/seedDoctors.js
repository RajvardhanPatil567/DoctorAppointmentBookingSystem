import mongoose from 'mongoose';
import dotenv from 'dotenv';
import doctorModel from './models/doctorModel.js';
import connectDB from './config/mongodb.js';

dotenv.config();

// Doctors data from frontend assets
const doctors = [
    {
        name: 'Dr. Richard James',
        email: 'richard.james@prescripto.com',
        password: '$2b$10$abcdefghijklmnopqrstuvwxyz123456', // hashed password: "doctor123"
        image: 'https://res.cloudinary.com/demo/image/upload/doc1.png', // You'll need to upload these
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        },
        date: Date.now(),
        available: true
    },
    {
        name: 'Dr. Emily Larson',
        email: 'emily.larson@prescripto.com',
        password: '$2b$10$abcdefghijklmnopqrstuvwxyz123456',
        image: 'https://res.cloudinary.com/demo/image/upload/doc2.png',
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        },
        date: Date.now(),
        available: true
    },
    {
        name: 'Dr. Sarah Patel',
        email: 'sarah.patel@prescripto.com',
        password: '$2b$10$abcdefghijklmnopqrstuvwxyz123456',
        image: 'https://res.cloudinary.com/demo/image/upload/doc3.png',
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        },
        date: Date.now(),
        available: true
    },
    // Add more doctors as needed...
];

const seedDoctors = async () => {
    try {
        await connectDB();

        // Clear existing doctors
        await doctorModel.deleteMany({});
        console.log('Cleared existing doctors');

        // Insert new doctors
        const result = await doctorModel.insertMany(doctors);
        console.log(`Successfully added ${result.length} doctors to database`);

        // Print the IDs for reference
        result.forEach((doc, index) => {
            console.log(`Doctor ${index + 1}: ${doc.name} - ID: ${doc._id}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Error seeding doctors:', error);
        process.exit(1);
    }
};

seedDoctors();
