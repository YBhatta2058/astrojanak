// home.jsx
"use client";

import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
import { useState } from 'react';
import Navbar from '../Components/Navbar';
import HeroSection from '../Components/hero';
import ServiceSection from '../Components/service';
import Quote from '../Components/quote';
import Contact from '../Components/contact';

export default function HomePage() {
    return (
        <div>
            <Navbar />
            <main>
                <HeroSection />
                <ServiceSection />
                <Quote />
                <Contact />
            </main>
        </div>
    );
}
