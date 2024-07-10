// "use client";

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function Page() {
//     const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', dob: '', timeOfBirth: '', placeOfBirth: '' });
//     const [message, setMessage] = useState('');
//     const [isRegistering, setIsRegistering] = useState(false);
//     const router = useRouter();

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsRegistering(true);

//         const res = await fetch('/api/users/signup', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(form),
//         });

//         const data = await res.json();
//         setIsRegistering(false);

//         if (res.ok) {
//             setMessage('User registered successfully!');
//             router.push('/login');
//         } else {
//             setMessage(data.error);
//         }
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
//                 <h1 className="text-2xl font-bold mb-6 text-gray-900">Register</h1>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                         <label htmlFor="name" className="block text-gray-700">Name:</label>
//                         <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300" />
//                     </div>
//                     <div>
//                         <label htmlFor="email" className="block text-gray-700">Email:</label>
//                         <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300" />
//                     </div>
//                     <div>
//                         <label htmlFor="password" className="block text-gray-700">Password:</label>
//                         <input type="password" id="password" name="password" value={form.password} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300" />
//                     </div>
//                     <div>
//                         <label htmlFor="phone" className="block text-gray-700">Phone:</label>
//                         <input type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300" />
//                     </div>
//                     <div>
//                         <label htmlFor="dob" className="block text-gray-700">Date of Birth:</label>
//                         <input type="date" id="dob" name="dob" value={form.dob} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300" />
//                     </div>
//                     <div>
//                         <label htmlFor="timeOfBirth" className="block text-gray-700">Time of Birth:</label>
//                         <input type="time" id="timeOfBirth" name="timeOfBirth" value={form.timeOfBirth} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300" />
//                     </div>
//                     <div>
//                         <label htmlFor="placeOfBirth" className="block text-gray-700">Place of Birth:</label>
//                         <input type="text" id="placeOfBirth" name="placeOfBirth" value={form.placeOfBirth} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300" />
//                     </div>
//                     <button type="submit" disabled={isRegistering} className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isRegistering ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}`}>
//                         {isRegistering ? 'Registering...' : 'Register'}
//                     </button>
//                 </form>
//                 {message && <p className="mt-4 text-center text-red-600">{message}</p>}
//             </div>
//         </div>
//     );
// }
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', dob: '', timeOfBirth: '', province: '', district: '' });
    const [message, setMessage] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        // Fetch provinces
        fetch('https://kaalvairab.github.io/nepal-address/data/provinces.json')
            .then(response => response.json())
            .then(data => setProvinces(data.provinces))
            .catch(error => console.error('Error fetching provinces:', error));

        // Fetch districts
        fetch('https://kaalvairab.github.io/nepal-address/data/districts.json')
            .then(response => response.json())
            .then(data => setDistricts(data.districts))
            .catch(error => console.error('Error fetching districts:', error));
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsRegistering(true);

        const res = await fetch('/api/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });

        const data = await res.json();
        setIsRegistering(false);

        if (res.ok) {
            setMessage('User registered successfully!');
            router.push('/login');
        } else {
            setMessage(data.error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-gray-900">Register</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-gray-700">Name:</label>
                        <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700">Email:</label>
                        <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700">Password:</label>
                        <input type="password" id="password" name="password" value={form.password} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300" />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-gray-700">Phone:</label>
                        <input type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300" />
                    </div>
                    <div>
                        <label htmlFor="dob" className="block text-gray-700">Date of Birth:</label>
                        <input type="date" id="dob" name="dob" value={form.dob} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300" />
                    </div>
                    <div>
                        <label htmlFor="timeOfBirth" className="block text-gray-700">Time of Birth:</label>
                        <input type="time" id="timeOfBirth" name="timeOfBirth" value={form.timeOfBirth} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300" />
                    </div>
                    <div>
                        <label htmlFor="province" className="block text-gray-700">Province:</label>
                        <select id="province" name="province" value={form.province} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300">
                            <option value="">Select Province</option>
                            {provinces.map((province) => (
                                <option key={province} value={province}>
                                    {province}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="district" className="block text-gray-700">District:</label>
                        <select id="district" name="district" value={form.district} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300">
                            <option value="">Select District</option>
                            {districts.map((district) => (
                                <option key={district} value={district}>
                                    {district}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" disabled={isRegistering} className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isRegistering ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}`}>
                        {isRegistering ? 'Registering...' : 'Register'}
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-red-600">{message}</p>}
            </div>
        </div>
    );
}