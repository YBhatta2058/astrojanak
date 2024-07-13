"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import SchModel from '../Components/scheduleModel';

export default function ViewAppointmentsPage() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [schModel,setSchModel] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await axios.get('/api/appointments/getAll');
                const updatedResponse = res.data.data.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt))
                console.log("The updated response is ")
                console.log(updatedResponse)
                console.log("The real response is")
                console.log(res.data.data)
                setAppointments(updatedResponse);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch appointments');
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    const handleAccept = async (appointmentId) => {
        try {
            await axios.patch(`/api/appointments/accept/${appointmentId}`);
            setAppointments(appointments.map(appointment => 
                appointment._id === appointmentId ? { ...appointment, status: 'accepted' } : appointment
            ));
        } catch (err) {
            console.error('Failed to accept appointment', err);
        }
    };

    const handleReschedule = async (appointmentId) => {
        setSelectedAppointment(appointmentId);
        setSchModel(true);
    };

    const handleReject = async (appointmentId) => {
        try {
            await axios.post(`/api/appointments/${appointmentId}/reject`);
            setAppointments(appointments.map(appointment => 
                appointment._id === appointmentId ? { ...appointment, status: 'rejected' } : appointment
            ));
        } catch (err) {
            console.error('Failed to reject appointment', err);
        }
    };

    const handleUpdateAppointment = (updatedAppointment) => {
        setAppointments(appointments.map(appointment => 
            appointment._id === updatedAppointment._id ? updatedAppointment : appointment
        ));
        handleCloseModal();
    };

    const handleCloseModal = () => {
        setSchModel(false);
        setSelectedAppointment(null);
    };

    return (
        <div>
            <Navbar />
            <section className="py-20 h-[100vh] bg-white dark:bg-gray-900 place-items-center">
                <div className="max-w-screen-xl mx-auto px-4">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
                        View All Appointments
                    </h1>
                    {loading ? (
                        <p className="text-gray-900 dark:text-white">Loading...</p>
                    ) : error ? (
                        <p className="text-red-500 dark:text-red-400">{error}</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            User Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Description
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Date & Time
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Created At
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.map(appointment => (
                                        <tr key={appointment._id} className="bg-white dark:bg-gray-800">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {appointment.userId.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {appointment.description}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {appointment.status}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {new Date(appointment.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {appointment.status === 'pending' && (
                                                    <div className="space-x-2">
                                                        <button onClick={() => handleAccept(appointment._id)} className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                                                            Accept
                                                        </button>
                                                        <button onClick={() => handleReschedule(appointment._id)} className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                                            Reschedule
                                                        </button>
                                                        <button onClick={() => handleReject(appointment._id)} className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                                                            Reject
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                            
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {schModel && <SchModel appointmentId={selectedAppointment} handleUpdateAppointment = {handleUpdateAppointment}  onClose={handleCloseModal} />}
                </div>
            </section>
        </div>
    );
}
