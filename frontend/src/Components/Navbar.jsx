import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets.js';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { DoctorContext } from '../context/DoctorContext';

export const Navbar = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const { token, setToken, userData } = useContext(AppContext);
    const { dToken, setDToken } = useContext(DoctorContext);

    const logout = () => {
        setToken('');
        localStorage.removeItem('token');
        setDToken('');
        localStorage.removeItem('dToken');
        navigate('/login');
    };

    return (
        <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
            <img onClick={() => navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt="logo" />
            <ul className='hidden md:flex gap-6 font-medium text-gray-600'>
                <NavLink to='/' className='flex flex-col items-center'>
                    <li className='py-1'>HOME</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/doctors' className='flex flex-col items-center'>
                    <li className='py-1'>ALL DOCTORS</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center'>
                    <li className='py-1'>ABOUT</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center'>
                    <li className='py-1'>CONTACT</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                {/* Doctor Admin Link - Only visible if no regular user logged in */}
                {
                    !token && !dToken &&
                    <NavLink to='/doctor-login' className='flex flex-col items-center border px-2 py-0.5 rounded-full border-gray-500'>
                        <li className='py-1'>Doctor Panel</li>
                    </NavLink>
                }
            </ul>
            <div className='flex gap-4 items-center'>
                {token ? (
                    <div className='relative group flex items-center gap-3 cursor-pointer'>
                        <img className='w-10 rounded-full' src={userData?.image || assets.profile_pic} alt='' />
                        <img className='w-2.5' src={assets.dropdown_icon} alt='' />
                        <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                            <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                                <p onClick={() => navigate('/myprofile')} className='hover:text-black cursor-pointer'>MyProfile</p>
                                <p onClick={() => navigate('/myappointment')} className='hover:text-black cursor-pointer'>MyAppointments</p>
                                <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                            </div>
                        </div>
                    </div>
                ) : dToken ? (
                    <div className='relative group flex items-center gap-3 cursor-pointer'>
                        <img className='w-10 rounded-full' src={assets.profile_pic} alt='' />
                        <img className='w-2.5' src={assets.dropdown_icon} alt='' />
                        <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                            <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                                <p onClick={() => navigate('/doctor-dashboard')} className='hover:text-black cursor-pointer'>Dashboard</p>
                                <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Create Account</button>
                )}
                <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="menu" />
                {/* mobile menu */}
                <div className={`${showMenu ? 'fixed w-full h-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                    <div className='flex justify-between items-center p-4'>
                        <img src={assets.logo} alt="logo" className='w-32' />
                        <img onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="close" className='w-8 cursor-pointer' />
                    </div>
                    <div className='justify-between text-center flex flex-col gap-2 mt-5 px-5 font-medium text-lg text-gray-600 '>
                        <NavLink to='/' onClick={() => setShowMenu(false)}>HOME</NavLink>
                        <NavLink to='/doctors' onClick={() => setShowMenu(false)}>ALL DOCTORS</NavLink>
                        <NavLink to='/about' onClick={() => setShowMenu(false)}>ABOUT</NavLink>
                        <NavLink to='/contact' onClick={() => setShowMenu(false)}>CONTACT</NavLink>
                        {!token && (
                            <button onClick={() => { setShowMenu(false); navigate('/login'); }} className='bg-primary text-white px-8 py-3 rounded-full font-light'>Create Account</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
