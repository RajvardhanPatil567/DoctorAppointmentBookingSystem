import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Myprofile } from './pages/Myprofile';
import { MyAppointment } from './pages/MyAppointment';
import { Doctor } from './pages/Doctor';
import { Navbar } from './Components/Navbar';
import { Appointment } from './pages/Appointment';
import { Footer } from './Components/Footer';

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/doctors" element={<Doctor/>} />
         <Route path="/doctors/:speciality" element={<Doctor />} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/myprofile" element={<Myprofile/>} />
        <Route path="/myappointment" element={<MyAppointment/>} />  
       <Route path="/appointment/:docId" element={<Appointment />} /> {/* ✅ Fixed */}
      </Routes>
      <Footer/>

    </div>
  );
};

export default App;