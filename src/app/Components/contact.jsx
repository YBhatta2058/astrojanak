
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const {user} = useAuth();

    const handleSubmit = async (e)=>{
        e.preventDefault();
    }

    useEffect(()=>{
        const getData = async ()=>{
            try{
                setName(user.name);
                setEmail(user.email);
            }catch(err){
                setName('')
                setEmail('')
                console.log(err)
            }
        }
        getData();
    },[])

    return (
        <div>
            <section id = "contact" className="bg-white dark:bg-gray-800 flex justify-center">
                <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">
                            Get in Touch
                        </h1>
                        <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                            We'd love to hear from you! Please fill out the form below to send us a message.
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Name</label>
                                <input readOnly type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" required />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Email</label>
                                <input readOnly type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="you@example.com" required />
                            </div>
                            <div>
                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Message</label>
                                <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows="4" className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your message here..." required></textarea>
                            </div>
                            <button type="submit" className="inline-flex items-center px-5 py-3 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800">
                                Send Message
                            </button>
                        </form>
                    </div>
                    
                </div>
            </section>
        </div>
    );
}
