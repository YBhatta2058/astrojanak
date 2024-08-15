"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import Navbar from '../Components/Navbar';

const KundaliRequestsPage = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState({});

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('/api/kundali/getAll');
                setRequests(response.data.data);
            } catch (err) {
                setError('Failed to fetch kundali requests.');
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    const handleFileChange = (event, requestId) => {
        setSelectedFiles({
            ...selectedFiles,
            [requestId]: event.target.files[0]
        });
    };

    const handleUpload = async (requestId) => {
        const file = selectedFiles[requestId];
        if (!file) {
            toast.error("Please select a file to upload");
            return;
        }

        const formData = new FormData();
        formData.append('kundaliImage', file);
        formData.append('requestId', requestId);

        try {
            const toastId = toast.loading("Uploading kundali...");
            const response = await axios.post('/api/kundali/uploadKundali', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.message === "success") {
                toast.success("Kundali uploaded successfully", { id: toastId });
                // Optionally, update the request status or reload the requests
            } else {
                toast.error("Failed to upload kundali", { id: toastId });
            }
        } catch (err) {
            console.error(err);
            toast.error("An error occurred while uploading the kundali", { id: toastId });
        }
    };

    return (
        <>
            <Navbar />
            <Toaster />
            <div className="p-4 bg-gray-100 min-h-screen">
                <div className="container mx-auto bg-white shadow-lg rounded-lg p-6">
                    <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">Kundali Requests</h1>
                    {loading ? (
                        <div className="text-center text-gray-700">Loading...</div>
                    ) : error ? (
                        <div className="text-center text-red-500">{error}</div>
                    ) : requests.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Message</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {requests.map((request) => (
                                        <tr key={request._id} className="hover:bg-gray-50 transition-colors duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.user.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(request.createdAt).toLocaleString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.requestMessage}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <label className="flex items-center space-x-2">
                                                    <span className="text-gray-700">Upload Kundali:</span>
                                                    <input
                                                        type="file"
                                                        className="border border-gray-300 rounded-lg py-1 px-2"
                                                        onChange={(event) => handleFileChange(event, request._id)}
                                                    />
                                                </label>
                                                <button
                                                    onClick={() => handleUpload(request._id)}
                                                    className="bg-purple-500 text-white px-4 py-2 rounded-lg ml-4"
                                                >
                                                    Upload
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center text-gray-700">No kundali requests available</div>
                    )}
                </div>
            </div>
        </>
    );
};

export default KundaliRequestsPage;
