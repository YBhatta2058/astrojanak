// home.jsx
"use client";

import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
import { useState } from 'react';
import Main from '../Components/main';
import Navbar from '../Components/navbar';
import HeroSection from '../Components/hero';
import ServiceSection from '../Components/service';
import Quote from '../Components/quote';
import Contact from '../Components/contact';

export default function HomePage() {
    const router = useRouter();
    const { user } = useAuth();
    const [users, setUsers] = useState(null);
    const [showUser, setShowUser] = useState(false);

    const showAllUsers = async () => {
        try {
            const res = await axios.get('/api/users/getAll');
            if (res.status === 200) {
                setUsers(res.data.data);
                setShowUser(true);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    return (
        <div>
            <Navbar />
            <main>
                {user?.isAdmin && (
                    <button onClick={showAllUsers}>View all users</button>
                )}

                {showUser && users && (
                    users.map((user) => (
                        <div key={user._id}>
                            {user.name}
                        </div>
                    ))
                )}
                <HeroSection />
                <ServiceSection />
                <Quote />
                <Contact />
            </main>
        </div>
    );
}
