import Image from 'next/image';
import React from 'react';
import bg from '../../../public/bg.png'
import kundali from '../../../public/images/kundali.jpg'


const ServiceSection = () => {
    return (
        <section className="bg-gray-50 dark:bg-gray-800">
            <div className="max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:py-24 lg:px-6">
                {/* First Row - Services Provided */}
                <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
                    <div className="text-gray-500 sm:text-lg dark:text-gray-400">
                        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Discover Your Cosmic Path</h2>
                        <p className="mb-8 font-light lg:text-xl">Explore the ancient art of astrology with personalized insights and guidance. Gain clarity about your life's journey and uncover hidden potentials.</p>
                        {/* List of Services */}
                        <ul role="list" className="pt-8 space-y-5 border-t border-gray-200 my-7 dark:border-gray-700">
                            <li className="flex space-x-3">
                                {/* Icon */}
                                <svg className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">Personalized Astrology Readings</span>
                            </li>
                            <li className="flex space-x-3">
                                {/* Icon */}
                                <svg className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">Future Projections and Insights</span>
                            </li>
                            <li className="flex space-x-3">
                                {/* Icon */}
                                <svg className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">Astrological Guidance</span>
                            </li>
                        </ul>
                        <p className="mb-8 font-light lg:text-xl">Embark on a journey of self-discovery and cosmic understanding with our astrology services.</p>
                    </div>
                    <div className = "">
                        <Image alt = "kundali" className = "flex h-90" src = {kundali} width = "500" height = "500" /> 
                    </div>
                </div>
                {/* Second Row - Astrology Details */}
                <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
                    <Image alt = "kundali" src = {bg} width = "500" height = "400" /> 
                    <div className="text-gray-500 sm:text-lg dark:text-gray-400">
                        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Understand Your Cosmic Influence</h2>
                        <p className="mb-8 font-light lg:text-xl">Astrology reveals patterns and potentials in your life. Gain insights into your personality, relationships, and future paths based on celestial influences.</p>
                        {/* List */}
                        <ul role="list" className="pt-8 space-y-5 border-t border-gray-200 my-7 dark:border-gray-700">
                            <li className="flex space-x-3">
                                {/* Icon */}
                                <svg className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">Astrological Charts and Interpretations</span>
                            </li>
                            <li className="flex space-x-3">
                                {/* Icon */}
                                <svg className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">Zodiac Sign Characteristics</span>
                            </li>
                            <li className="flex space-x-3">
                                {/* Icon */}
                                <svg className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">Planetary Influences</span>
                            </li>
                            <li className="flex space-x-3">
                                {/* Icon */}
                                <svg className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">Astrological Guidance for Life Decisions</span>
                            </li>
                        </ul>
                        <p className="font-light lg:text-xl">Understand the cosmic influences that shape your life's journey and decisions with our astrology services.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceSection;
