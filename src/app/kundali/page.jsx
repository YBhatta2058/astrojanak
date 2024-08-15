"use client"

import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../Components/Navbar';

const RequestKundaliForm = () => {
    const { user } = useAuth();
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!user) {
            setError('You need to be logged in to make a request.');
            return;
        }

        try {
            const response = await axios.post('/api/kundali/request', {
                userId: user._id,
                message,
            });

            setSuccess('Kundali request submitted successfully!');
            setMessage('');
        } catch (err) {
            setError('Failed to submit request. Please try again.');
        }
    };

    return (
        <>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">Request Kundali</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-gray-700 text-sm font-medium mb-2">Message:</label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150 ease-in-out"
                            rows="6"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
                    <button
                        type="submit"
                        className="w-full text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-150 ease-in-out"
                    >
                        Submit Request
                    </button>
                </form>
            </div>
        </div>
        </>
    );
};

export default RequestKundaliForm;
