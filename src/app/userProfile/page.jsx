"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";

const MePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/users/me");
        setUserData(response.data.data);
        console.log(response.data);
      } catch (err) {
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-700">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="p-4 bg-gray-100 min-h-screen flex justify-center items-center">
        <div className="container mx-auto bg-white shadow-lg rounded-lg p-6 max-w-4xl">
          <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">
            User Profile
          </h1>
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-2">
                  <span className="font-semibold text-gray-700">Name:</span>
                  <span className="text-gray-900">{userData.user.name}</span>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="font-semibold text-gray-700">Email:</span>
                  <span className="text-gray-900">{userData.user.email}</span>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="font-semibold text-gray-700">Phone:</span>
                  <span className="text-gray-900">{userData.user.phone}</span>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="font-semibold text-gray-700">DOB:</span>
                  <span className="text-gray-900">{new Date(userData.user.dob).toLocaleDateString()}</span>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="font-semibold text-gray-700">Time of Birth:</span>
                  <span className="text-gray-900">{userData.user.timeOfBirth}</span>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="font-semibold text-gray-700">Place of Birth:</span>
                  <span className="text-gray-900">
                    {userData.user.placeOfBirth.province}, {userData.user.placeOfBirth.district}
                  </span>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="font-semibold text-gray-700">Verified:</span>
                  <span className="text-gray-900">{userData.user.isVerified ? "Yes" : "No"}</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-700 mb-4">Kundali Image</h2>
              {userData.kundaliImage ? (
                <img
                  src={userData.kundaliImage}
                  alt="Kundali"
                  className="w-full h-auto rounded-lg"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">No Kundali Image</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MePage;
