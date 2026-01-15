# Doctor Appointment Booking System - Prescripto

A full-stack healthcare platform that allows users to book appointments with doctors, and allows doctors to manage their schedule/dashboard.

## 🚀 Features

### For Patients (Users)
- **Browse Doctors**: Filter by speciality.
- **Book Appointments**: Select available time slots.
- **My Appointments**: View history and cancel upcoming visits.
- **Profile Management**: Update personal details.
- **Payment Integration**: Secure interaction for booking fees (Razorpay).

### For Doctors (New!)
- **Dedicated Login**: Separate authentication flow for doctors.
- **Dashboard**:
    - **Appointment Management**: View all booked appointments and cancel them if necessary.
    - **Profile Control**: Update consulting fees, clinic address, and availability status.

## 🛠️ Tech Stack
- **Frontend**: React, React Router, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **Image Storage**: Cloudinary

## 📦 Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB URI
- Cloudinary Credentials
- Razorpay Credentials (Optional for payment)

### 1. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in `backend/` with:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CURRENCY=USD
```
Start the server:
```bash
npm start server
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```
Start the application:
```bash
npm run dev
```

## 🧪 Testing Credentials & Helper Scripts (Backend)

We have included scripts to help you quickly test the application. Run these in the `backend/` folder.

### 1. Reset & Seed Doctors
Resets the doctor database and creates 3 default doctors with password `doctor123`.
```bash
node seedDoctors.js
```

### 2. View Doctor Credentials
Displays the login email and ID for all doctors in the database.
```bash
node show_doctors.js
```

### 3. Fix Orphaned Appointments
If you reset the doctors, run this to re-link existing appointments to the new doctor IDs.
```bash
node fix_appointments.js
```

## 🔑 Default Doctor Credentials
After seeding, use these to login to the **Doctor Panel**:

**Password for all**: `doctor123`

| Doctor Name | Email | Speciality |
| :--- | :--- | :--- |
| **Dr. Richard James** | `richard.james@prescripto.com` | General Physician |
| **Dr. Emily Larson** | `emily.larson@prescripto.com` | Gynecologist |
| **Dr. Sarah Patel** | `sarah.patel@prescripto.com` | Dermatologist |
