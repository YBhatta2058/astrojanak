'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';

const Page = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/users/getAll');
      if (res && res.data) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users
    .filter(user => 
      user.name.toLowerCase().includes(search.toLowerCase()) &&
      (!filterDate || new Date(user.createdAt).toDateString() === new Date(filterDate).toDateString())
    );

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 min-h-screen p-4">
        <div className="container mx-auto bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold text-purple-700 mb-6">User List</h1>
          <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-1/2 p-2 border rounded-lg mb-2 md:mb-0"
            />
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full md:w-1/3 p-2 border rounded-lg"
            />
            <button
              onClick = {()=>{
                setFilterDate('');
                setSearch('')
              }}
              className="w-full md:w-1/3 p-2 border rounded-lg"
            >Reset</button>
          </div>
          {filteredUsers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <div key={user._id} className="border rounded-lg p-5 bg-gray-50 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h2 className="text-xl font-semibold text-purple-800 mb-3">{user.name}</h2>
                  <p className="text-gray-700 mb-2"><strong>Email:</strong> {user.email}</p>
                  <p className="text-gray-700 mb-2"><strong>Phone:</strong> {user.phone}</p>
                  <p className="text-gray-700 mb-2"><strong>Date of Birth:</strong> {new Date(user.dob).toLocaleDateString()}</p>
                  <p className="text-gray-700 mb-2"><strong>Time of Birth:</strong> {user.timeOfBirth}</p>
                  <p className="text-gray-700 mb-2"><strong>Place of Birth:</strong> {user.placeOfBirth.province}, {user.placeOfBirth.district}</p>
                  <p className="text-gray-700 mb-2"><strong>Verified:</strong> {user.isVerified ? 'Yes' : 'No'}</p>
                  <p className="text-gray-700 mb-2"><strong>Admin:</strong> {user.isAdmin ? 'Yes' : 'No'}</p>
                  <p className="text-gray-500 text-sm">Account Created: {new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-700 text-center">No users to display</div>
          )}
        </div>
      </div>
    </>
  )
}

export default Page;
