import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

export const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { currencySymbol } = useContext(AppContext);
    const [paymentMethod, setPaymentMethod] = useState('razorpay');

    // Get appointment details from navigation state
    const appointmentData = location.state;

    useEffect(() => {
        // Redirect if no appointment data
        if (!appointmentData) {
            navigate('/');
        }
    }, [appointmentData, navigate]);

    const handlePayment = async () => {
        if (paymentMethod === 'razorpay') {
            // Razorpay integration will go here
            alert('Razorpay payment integration coming soon!');
            navigate('/myappointment');
        } else if (paymentMethod === 'stripe') {
            // Stripe integration will go here
            alert('Stripe payment integration coming soon!');
            navigate('/myappointment');
        } else if (paymentMethod === 'cod') {
            // Cash on delivery - direct booking
            alert('Appointment booked successfully! Pay at the clinic.');
            navigate('/myappointment');
        }
    };

    if (!appointmentData) {
        return null;
    }

    return (
        <div className='min-h-[60vh] py-10'>
            <div className='max-w-4xl mx-auto'>
                {/* Appointment Summary */}
                <div className='bg-white border border-gray-300 rounded-lg p-6 mb-6'>
                    <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Appointment Summary</h2>

                    <div className='flex flex-col sm:flex-row gap-4'>
                        <img
                            className='w-32 h-32 object-cover rounded-lg bg-primary'
                            src={appointmentData.docInfo.image}
                            alt={appointmentData.docInfo.name}
                        />

                        <div className='flex-1'>
                            <div className='flex items-center gap-2 mb-2'>
                                <h3 className='text-xl font-medium text-gray-900'>{appointmentData.docInfo.name}</h3>
                                <img className='w-5' src={assets.verified_icon} alt='' />
                            </div>

                            <p className='text-sm text-gray-600 mb-1'>
                                {appointmentData.docInfo.degree} - {appointmentData.docInfo.speciality}
                            </p>

                            <p className='text-sm text-gray-600 mb-1'>
                                <span className='font-medium'>Date:</span> {appointmentData.slotDate}
                            </p>

                            <p className='text-sm text-gray-600 mb-1'>
                                <span className='font-medium'>Time:</span> {appointmentData.slotTime}
                            </p>

                            <p className='text-lg font-semibold text-gray-800 mt-3'>
                                Appointment Fee: {currencySymbol}{appointmentData.docInfo.fees}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Payment Method Selection */}
                <div className='bg-white border border-gray-300 rounded-lg p-6'>
                    <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Select Payment Method</h2>

                    <div className='space-y-3'>
                        {/* Razorpay Option */}
                        <div
                            onClick={() => setPaymentMethod('razorpay')}
                            className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'razorpay'
                                    ? 'border-primary bg-blue-50'
                                    : 'border-gray-300 hover:border-gray-400'
                                }`}
                        >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'razorpay' ? 'border-primary' : 'border-gray-400'
                                }`}>
                                {paymentMethod === 'razorpay' && (
                                    <div className='w-3 h-3 rounded-full bg-primary'></div>
                                )}
                            </div>
                            <div className='flex-1'>
                                <p className='font-medium text-gray-800'>Razorpay</p>
                                <p className='text-sm text-gray-600'>Pay securely with Razorpay</p>
                            </div>
                        </div>

                        {/* Stripe Option */}
                        <div
                            onClick={() => setPaymentMethod('stripe')}
                            className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'stripe'
                                    ? 'border-primary bg-blue-50'
                                    : 'border-gray-300 hover:border-gray-400'
                                }`}
                        >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'stripe' ? 'border-primary' : 'border-gray-400'
                                }`}>
                                {paymentMethod === 'stripe' && (
                                    <div className='w-3 h-3 rounded-full bg-primary'></div>
                                )}
                            </div>
                            <div className='flex-1'>
                                <p className='font-medium text-gray-800'>Stripe</p>
                                <p className='text-sm text-gray-600'>Pay securely with Stripe</p>
                            </div>
                        </div>

                        {/* Cash on Delivery Option */}
                        <div
                            onClick={() => setPaymentMethod('cod')}
                            className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'cod'
                                    ? 'border-primary bg-blue-50'
                                    : 'border-gray-300 hover:border-gray-400'
                                }`}
                        >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cod' ? 'border-primary' : 'border-gray-400'
                                }`}>
                                {paymentMethod === 'cod' && (
                                    <div className='w-3 h-3 rounded-full bg-primary'></div>
                                )}
                            </div>
                            <div className='flex-1'>
                                <p className='font-medium text-gray-800'>Pay at Clinic</p>
                                <p className='text-sm text-gray-600'>Pay when you visit the clinic</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className='flex gap-4 mt-6'>
                        <button
                            onClick={() => navigate(-1)}
                            className='flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors'
                        >
                            Go Back
                        </button>
                        <button
                            onClick={handlePayment}
                            className='flex-1 bg-primary text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors'
                        >
                            Proceed to Pay {currencySymbol}{appointmentData.docInfo.fees}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
