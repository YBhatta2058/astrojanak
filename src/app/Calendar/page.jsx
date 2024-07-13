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
                const formattedAppointments = acceptedAppointments.map(appointment => ({
                    title: appointment.userId.name + ": " + appointment.description,
                    start: new Date(appointment.date),
                    end: new Date(appointment.date), // Assuming appointments have no duration
                }));
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
            <div className="bg-white rounded-lg shadow-md p-4">
                <Calendar
                    localizer={localizer}
                    events={appointments}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 600 }}
                    className="bg-white text-black rounded-lg shadow-lg"
                    view={view}
                    onView={setView}
                    date={date}
                    onNavigate={setDate}
                />
            </div>
        </>
    );
};

export default MyCalendar;
