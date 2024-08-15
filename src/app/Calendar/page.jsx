// components/Calendar.js
"use client"
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import Navbar from '../Components/Navbar';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
    const [appointments, setAppointments] = useState([]);
    const [view, setView] = useState(Views.MONTH);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await axios.get('/api/appointments/getAll');
                const acceptedAppointments = res.data.data.filter((appointment) => {
                    return appointment.status === 'accepted' || appointment.status === 'rescheduled';
                });

                const formattedAppointments = acceptedAppointments.map(appointment => {
                    const startDate = moment(`${appointment.date} ${appointment.time}`, 'YYYY-MM-DD HH:mm').toDate();
                    const endDate = moment(startDate).add(1, 'hour').toDate();

                    return {
                        title: appointment.userId.name + ": " + appointment.description,
                        start: startDate,
                        end: endDate,
                    };
                });

                setAppointments(formattedAppointments);
            } catch (err) {
                console.error('Failed to fetch appointments', err);
            }
        };

        fetchAppointments();
    }, []);

    return (
        <>
            <Navbar />
            <section className="bg-gray-500 min-h-screen flex items-center justify-center text-white">
                <div className="container mx-auto px-4 py-16">
                    <div className="bg-lightblue-200 dark:bg-gray-800 rounded-lg shadow-md p-4">
                        <h2 className="text-3xl font-extrabold text-white mb-4 dark:text-white">Appointments Calendar</h2>
                        <Calendar
                            localizer={localizer}
                            events={appointments}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 600 }}
                            className="bg-lightblue-300 text-white rounded-lg shadow-lg"
                            view={view}
                            onView={setView}
                            date={date}
                            onNavigate={setDate}
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default MyCalendar;
