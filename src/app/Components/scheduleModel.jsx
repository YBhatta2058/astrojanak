import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SchModel = ({ appointmentId, onClose,handleUpdateAppointment }) => {
    const [newDate, setNewDate] = useState('');
    const [newTime, setNewTime] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          await axios.patch(`/api/appointments/reschedule/${appointmentId}`, {
              date: newDate,
              time: newTime
          });
          handleUpdateAppointment(appointmentId);
      } catch (err) {
          console.log(err)
          setError('Failed to reschedule appointment ' , err);
      }
  };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Reschedule Appointment</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newDate">
                            New Date
                        </label>
                        <input
                            type="date"
                            id="newDate"
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newTime">
                            New Time
                        </label>
                        <input
                            type="time"
                            id="newTime"
                            value={newTime}
                            onChange={(e) => setNewTime(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                            Save
                        </button>
                    </div>
                </form>
            </div>
            
        </div>
    );
};

export default SchModel;
