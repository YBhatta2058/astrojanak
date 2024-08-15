import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between lg:space-x-12">
          <div className="lg:w-1/3 mb-8 lg:mb-0">
            <h3 className="text-2xl font-semibold mb-4">About Us</h3>
            <p className="text-gray-400 leading-relaxed">
              I am dedicated to providing top-notch astrological services and insights.
            </p>
          </div>
          
          <div className="lg:w-1/3 mb-8 lg:mb-0">
            <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:underline">Home</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:underline">About</Link></li>
              <li><Link href="/#services" className="text-gray-400 hover:underline">Services</Link></li>
              <li><Link href="/#contact" className="text-gray-400 hover:underline">Contact</Link></li>
            </ul>
          </div>
          
          <div className="lg:w-1/3">
            <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-400 leading-relaxed">
              Email: <Link href="mailto:bhattajanak7@gmail.com" className="text-gray-400 hover:underline">bhattajanak7@gmail.com</Link><br />
              Phone: <Link href="tel:+9779841811153" className="text-gray-400 hover:underline">+91 8197310214</Link><br />
              Address: Chandragiri-13, Kathmandu, Nepal
            </p>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Dr. Janak Raj Bhatta. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
