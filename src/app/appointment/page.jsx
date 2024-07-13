"use client";
import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link'; // Import Link from Next.js
import Image from 'next/image';

export default function BookingPage() {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [service, setService] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/appointments/book', { date, time, description: service });
            setMessage('Appointment created successfully');
            toast.success("Appointment created. You will be mailed regarding the appointment");
        } catch (error) {
            console.error('Error creating appointment:', error.response.data);
            toast.error("Failed to create appointment");
            setMessage(error.response.data.message || 'Failed to create appointment');
        }
    };

    return (
        <div>
            <Navbar />
            <section className="py-20 h-[100vh] bg-white dark:bg-gray-900 place-items-center">
                <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">
                            Book an Appointment
                        </h1>
                        <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                            Please fill out the form below to book your appointment.
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Date</label>
                                <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div>
                                <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Time</label>
                                <input type="time" id="time" value={time} onChange={(e) => setTime(e.target.value)} className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div>
                                <label htmlFor="service" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Service</label>
                                <input type="text" id="service" value={service} onChange={(e) => setService(e.target.value)} className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Service Name" required />
                            </div>
                            <button type="submit" className="inline-flex items-center px-5 py-3 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800">
                                Book Appointment
                            </button>
                            {message && <p className="text-sm text-gray-900 dark:text-white">{message}</p>}
                        </form>
                        <div className="mt-4">
                            <Link className = "inline-flex items-center px-5 py-3 text-sm font-medium text-center text-white bg-green-400 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800" href="/myAppointmentPage">
                                See all my appointments
                            </Link>
                        </div>
                    </div>
                    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                        <Image width = {400} height = {400} src="https://cdn.britannica.com/72/223172-131-C3F72804/astrology-horoscope-circle.jpg" alt="booking image" className="rounded-lg shadow-md" />
                    </div>
                </div>
            </section>
        </div>
    );
}
