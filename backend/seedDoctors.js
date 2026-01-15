import mongoose from 'mongoose';
import dotenv from 'dotenv';
import doctorModel from './models/doctorModel.js';
import connectDB from './config/mongodb.js';
import bcrypt from 'bcrypt';

dotenv.config();

const doctors = [
    {
        name: 'Dr. Richard James',
        email: 'richard.james@prescripto.com',
        password: 'doctor123',
        image: 'https://res.cloudinary.com/demo/image/upload/doc1.png',
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: { line1: '17th Cross, Richmond', line2: 'Circle, Ring Road, London' },
        available: true,
        date: Date.now()
    },
    {
        name: 'Dr. Emily Larson',
        email: 'emily.larson@prescripto.com',
        password: 'doctor123',
        image: 'https://res.cloudinary.com/demo/image/upload/doc2.png',
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        address: { line1: '27th Cross, Richmond', line2: 'Circle, Ring Road, London' },
        available: true,
        date: Date.now()
    },
    {
        name: 'Dr. Sarah Patel',
        email: 'sarah.patel@prescripto.com',
        password: 'doctor123',
        image: 'https://res.cloudinary.com/demo/image/upload/doc3.png',
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address: { line1: '37th Cross, Richmond', line2: 'Circle, Ring Road, London' },
        available: true,
        date: Date.now()
    },
    {
        name: 'Dr. Christopher Lee',
        email: 'christopher.lee@prescripto.com',
        password: 'doctor123',
        image: 'https://res.cloudinary.com/demo/image/upload/doc4.png',
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 40,
        address: { line1: '47th Cross, Richmond', line2: 'Circle, Ring Road, London' },
        available: true,
        date: Date.now()
    },
    {
        name: 'Dr. Jennifer Garcia',
        email: 'jennifer.garcia@prescripto.com',
        password: 'doctor123',
        image: 'https://res.cloudinary.com/demo/image/upload/doc5.png',
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' },
        available: true,
        date: Date.now()
    },
    {
        name: 'Dr. Andrew Williams',
        email: 'andrew.williams@prescripto.com',
        password: 'doctor123',
        image: 'https://res.cloudinary.com/demo/image/upload/doc6.png',
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' },
        available: true,
        date: Date.now()
    },
    {
        name: 'Dr. Christopher Davis',
        email: 'christopher.davis@prescripto.com',
        password: 'doctor123',
        image: 'https://res.cloudinary.com/demo/image/upload/doc7.png',
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: { line1: '17th Cross, Richmond', line2: 'Circle, Ring Road, London' },
        available: true,
        date: Date.now()
    },
    {
        name: 'Dr. Timothy White',
        email: 'timothy.white@prescripto.com',
        password: 'doctor123',
        image: 'https://res.cloudinary.com/demo/image/upload/doc8.png',
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        address: { line1: '27th Cross, Richmond', line2: 'Circle, Ring Road, London' },
        available: true,
        date: Date.now()
    },
    {
        name: 'Dr. Ava Mitchell',
        email: 'ava.mitchell@prescripto.com',
        password: 'doctor123',
        image: 'https://res.cloudinary.com/demo/image/upload/doc9.png',
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address: { line1: '37th Cross, Richmond', line2: 'Circle, Ring Road, London' },
        available: true,
        date: Date.now()
    },
    {
        name: 'Dr. Jeffrey King',
        email: 'jeffrey.king@prescripto.com',
        password: 'doctor123',
        image: 'https://res.cloudinary.com/demo/image/upload/doc10.png',
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 40,
        address: { line1: '47th Cross, Richmond', line2: 'Circle, Ring Road, London' },
        available: true,
        date: Date.now()
    },
    {
        name: 'Dr. Zoe Kelly',
        email: 'zoe.kelly@prescripto.com',
        password: 'doctor123',
        image: 'https://res.cloudinary.com/demo/image/upload/doc11.png',
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' },
        available: true,
        date: Date.now()
    },
    {
        name: 'Dr. Patrick Harris',
        email: 'patrick.harris@prescripto.com',
        password: 'doctor123',
        image: 'https://res.cloudinary.com/demo/image/upload/doc12.png',
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' },
        available: true,
        date: Date.now()
    },
    {
        name: 'Dr. Chloe Evans',
        email: 'chloe.evans@prescripto.com',
        password: 'doctor123',
        image: 'https://res.cloudinary.com/demo/image/upload/doc13.png',
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: { line1: '17th Cross, Richmond', line2: 'Circle, Ring Road, London' },
        available: true,
        date: Date.now()
    },
    {
        name: 'Dr. Ryan Martinez',
        email: 'ryan.martinez@prescripto.com',
        password: 'doctor123',
        image: 'https://res.cloudinary.com/demo/image/upload/doc14.png',
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        address: { line1: '27th Cross, Richmond', line2: 'Circle, Ring Road, London' },
        available: true,
        date: Date.now()
    },
    {
        name: 'Dr. Amelia Hill',
        email: 'amelia.hill@prescripto.com',
        password: 'doctor123',
        image: 'https://res.cloudinary.com/demo/image/upload/doc15.png',
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address: { line1: '37th Cross, Richmond', line2: 'Circle, Ring Road, London' },
        available: true,
        date: Date.now()
    }
];

const seedDoctors = async () => {
    try {
        await connectDB();

        // Clear existing doctors
        await doctorModel.deleteMany({});
        console.log('Cleared existing doctors');

        // Hash passwords
        const salt = await bcrypt.genSalt(10);
        const doctorsWithHashedPasswords = await Promise.all(doctors.map(async (doc) => {
            const hashedPassword = await bcrypt.hash(doc.password, salt);
            return { ...doc, password: hashedPassword };
        }));

        // Insert new doctors
        const result = await doctorModel.insertMany(doctorsWithHashedPasswords);
        console.log(`Successfully added ${result.length} doctors to database`);

        // Print the IDs for reference
        // result.forEach((doc, index) => {
        //     console.log(`Doctor ${index + 1}: ${doc.name} - ID: ${doc._id}`);
        // });

        process.exit(0);
    } catch (error) {
        console.error('Error seeding doctors:', error);
        process.exit(1);
    }
};

seedDoctors();
