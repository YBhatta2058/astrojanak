// page.jsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import Link from 'next/link'

export default function LoginPage() {
    const router = useRouter();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const { dispatch } = useAuth();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoggingIn(true);

        const loadingToastId = toast.loading("Logging in ...");

        const res = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const data = await res.json();
        setIsLoggingIn(false);

        if (res.ok) {
            toast.success("Logged in successfully", { id: loadingToastId });
            dispatch({ type: "LOGIN", payload: data.data });
            if (router) router.push('/');
        } else {
            toast.error(data.error || "Failed to login", { id: loadingToastId });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-gray-900">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoggingIn}
                        className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isLoggingIn ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}`}
                    >
                        {isLoggingIn ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <div className = "mt-4">
                    <p>
                        Don't have an account? <Link href = '/register' className = "text-blue-500">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
