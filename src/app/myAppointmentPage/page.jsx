"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { FaCalendarAlt, FaClock, FaClipboardList, FaTrash } from 'react-icons/fa';

export default function MyAppointmentsPage() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fixDate = (date) => {
        const dateObj = new Date(date);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return dateObj.toLocaleDateString('en-US', options);
    };

    const fetchAppointments = async () => {
        try {
            const res = await axios.get('/api/appointments/myappointments');
            const sortedAppointments = res.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setAppointments(sortedAppointments);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            toast.error("Failed to fetch appointments");
        } finally {
            setLoading(false);
        }
    };

    const deleteAppointment = async (appointmentId) => {
        try {
            await axios.delete(`/api/appointments/delete/${appointmentId}`);
            toast.success("Appointment deleted successfully");
            fetchAppointments();
        } catch (error) {
            console.error('Error deleting appointment:', error);
            toast.error("Failed to delete appointment");
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    return (
        <div>
            <Navbar />
            <section className="py-20 min-h-[100vh] bg-white dark:bg-gray-900">
                <div className="max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:py-16">
                    <div className="mr-auto lg:col-span-7">
                        <h1 className="max-w-2xl mb-8 text-4xl font-extrabold tracking-tight md:text-5xl xl:text-6xl dark:text-white">
                            My Appointments
                        </h1>
                        {loading ? (
                            <div className="flex justify-center items-center">
                                <div className="loader"></div>
                            </div>
                        ) : appointments.length > 0 ? (
                            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {appointments.map((appointment) => {
                                    const isExpired = new Date(appointment.date) < new Date(); // Check if appointment date is in the past
                                    return (
                                        <li key={appointment._id} className={`p-6 border rounded-lg shadow-md ${isExpired ? 'bg-gray-200 dark:bg-gray-700' : 'bg-gray-100 dark:bg-gray-800'} transition-transform transform hover:scale-105`}>
                                            <div className="flex items-center mb-4">
                                                <FaCalendarAlt className="text-gray-600 dark:text-gray-300 mr-2" />
                                                <p className="text-lg text-gray-900 dark:text-white">
                                                    <span className="font-semibold">Date:</span> {fixDate(appointment.date)} {isExpired && <span className="text-red-600">(Expired)</span>}
                                                </p>
                                            </div>
                                            <div className="flex items-center mb-4">
                                                <FaClock className="text-gray-600 dark:text-gray-300 mr-2" />
                                                <p className="text-lg text-gray-900 dark:text-white">
                                                    <span className="font-semibold">Time:</span> {appointment.time}
                                                </p>
                                            </div>
                                            <div className="flex items-center mb-4">
                                                <FaClipboardList className="text-gray-600 dark:text-gray-300 mr-2" />
                                                <p className="text-lg text-gray-900 dark:text-white">
                                                    <span className="font-semibold">Service:</span> {appointment.description}
                                                </p>
                                            </div>
                                            <div className="flex items-center mb-4">
                                                <p className="text-lg text-gray-900 dark:text-white">
                                                    <span className="font-semibold">Status:</span> {isExpired ? "Expired" : appointment.status}
                                                </p>
                                            </div>
                                            {!isExpired && appointment.status === 'pending' && (
                                                <button 
                                                    className="mt-4 flex items-center bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
                                                    onClick={() => deleteAppointment(appointment._id)}>
                                                    <FaTrash className="mr-2" /> Delete Appointment
                                                </button>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        ) : (
                            <div className="text-center">
                                <p className="text-lg text-gray-900 dark:text-white mb-4">No appointments found...</p>
                                <Link className="text-white bg-blue-500 p-2 hover:bg-blue-700 rounded" href="/appointment">Book Appointment</Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            {/* <Footer /> */}
            
        </div>
    );
}
