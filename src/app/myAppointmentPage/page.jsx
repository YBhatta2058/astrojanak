"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '../Components/navbar';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';

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
            setAppointments(res.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            toast.error("Failed to fetch appointments");
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
            <section className="py-20 h-[100vh] bg-white dark:bg-gray-900">
                <div className="max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:py-16 lg:grid-cols-12 lg:pt-28">
                    <div className="mr-auto lg:col-span-7">
                        <h1 className="max-w-2xl mb-8 text-4xl font-extrabold tracking-tight md:text-5xl xl:text-6xl dark:text-white">
                            My Appointments
                        </h1>
                        {loading ? (
                            <div className="flex justify-center items-center">
                                <p className="text-lg text-gray-900 dark:text-white">Loading...</p>
                            </div>
                        ) : (
                            <ul className="space-y-4">
                                {appointments ? appointments.map((appointment) => (
                                    <li key={appointment.id} className="p-6 border rounded-lg shadow-md bg-gray-100 dark:bg-gray-800">
                                        <p className="text-lg text-gray-900 dark:text-white">
                                            <span className="font-semibold">Date:</span> {fixDate(appointment.date)}
                                        </p>
                                        <p className="text-lg text-gray-900 dark:text-white">
                                            <span className="font-semibold">Time:</span> {appointment.time}
                                        </p>
                                        <p className="text-lg text-gray-900 dark:text-white">
                                            <span className="font-semibold">Service:</span> {appointment.description}
                                        </p>
                                        <p className="text-lg text-gray-900 dark:text-white">
                                            <span className="font-semibold">Status:</span> {appointment.status}
                                        </p>
                                        <button 
                                            className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                                            onClick={() => deleteAppointment(appointment._id)}>
                                            Delete Appointment
                                        </button>
                                    </li>
                                )) : <>
                                    <div className = "text-white  p-2 text-3xl">No appointments found...
                                    </div>
                                    <div><Link className = "text-white bg-blue-500 p-2 hover:bg-blue-700" href = "/appointment">Book Appointment</Link></div>
                                </>}
                            </ul>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
