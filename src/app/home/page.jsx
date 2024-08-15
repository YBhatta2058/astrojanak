// home.jsx
"use client";

import Navbar from '../Components/Navbar';
import HeroSection from '../Components/hero';
import ServiceSection from '../Components/service';
import Quote from '../Components/quote';
import Contact from '../Components/contact';
import Footer from '../Components/footer';

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
            <Footer />
        </div>
    );
}
