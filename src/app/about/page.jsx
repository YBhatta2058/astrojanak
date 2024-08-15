import React from 'react';
import Image from 'next/image';
import astrologerImage from '../../../public/images/astro.png'; // Make sure you have this image in the specified path
import bookImage1 from '../../../public/images/book1.png'; // Ensure you have this image in the specified path
import bookImage2 from '../../../public/images/book2.png'; // Ensure you have this image in the specified path
import bookImage3 from '../../../public/images/book3.jpg'; // Ensure you have this image in the specified path
import Navbar from '../Components/Navbar';
import Footer from '../Components/footer';

const AboutSection = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
        <Navbar />
      <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
        <div className="items-center lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="lg:col-span-1">
            <Image
              src={astrologerImage}
              alt="Astrologer Image"
              width={500}
              height={500}
              className="rounded-lg"
            />
          </div>
          <div className="lg:col-span-1">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">About Our Astrologer</h2>
            <p className="mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              With years of experience and deep knowledge in the field of astrology, our astrologer has guided countless individuals towards understanding their cosmic paths. Through personalized readings and insightful consultations, they offer clarity and direction based on the positions of celestial bodies.
            </p>
            <p className="mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Our astrologer specializes in various aspects of astrology including natal chart interpretations, future projections, and relationship compatibility. They are dedicated to helping you uncover the mysteries of your life through the ancient art of astrology.
            </p>
            <p className="font-light text-gray-500 lg:text-xl dark:text-gray-400">
              Discover how astrology can illuminate your path and provide valuable insights into your life's journey. Let our astrologer be your guide in navigating the stars.
            </p>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Works Published</h2>
          <div className="space-y-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16 p-6 bg-gray-100 rounded-lg dark:bg-gray-800">
              <div className="lg:col-span-1">
                <Image
                  src={bookImage1}
                  alt="Ramayan Bhajanmala"
                  width={400}
                  height={400}
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="lg:col-span-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Ramayan Bhajanmala</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  "Ramayan Bhajanmala" is a profound exploration of the sacred hymns and songs from the Ramayana. This book offers a collection of devotional bhajans that are traditionally sung to honor the epic's divine characters. Each bhajan is accompanied by detailed commentary and explanations, making it accessible for both novices and seasoned devotees.
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  The book not only provides the lyrical content of these bhajans but also delves into their historical and spiritual significance, offering readers a deep understanding of their importance in Hindu rituals and traditions. "Ramayan Bhajanmala" is a must-read for anyone interested in the spiritual and cultural heritage of the Ramayana.
                </p>
              </div>
            </div>
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16 p-6 bg-gray-100 rounded-lg dark:bg-gray-800">
              <div className="lg:col-span-1">
                <Image
                  src={bookImage3}
                  alt="Prarambhik Jyotish Sikshya"
                  width={400}
                  height={400}
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="lg:col-span-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Prarambhik Jyotish Sikshya</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  "Prarambhik Jyotish Sikshya" is an introductory guide to the ancient science of astrology. This book is perfect for beginners who want to delve into the basics of astrology and understand its fundamental principles.
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  The book covers a range of topics including the history of astrology, the zodiac signs, planets, houses, and aspects. It also provides insights into how to interpret natal charts and understand the cosmic influences on human life.
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Written in an accessible and engaging style, "Prarambhik Jyotish Sikshya" aims to make the study of astrology enjoyable and comprehensible. It is a valuable resource for anyone interested in exploring the mysteries of the stars and their impact on our lives.
                </p>
              </div>
            </div>
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16 p-6 bg-gray-100 rounded-lg dark:bg-gray-800">
              <div className="lg:col-span-1">
                <Image
                  src={bookImage2}
                  alt="Social Studies for PCL Nursing"
                  width={400}
                  height={400}
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="lg:col-span-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Social Studies for PCL Nursing</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  "Social Studies for PCL Nursing" is an essential textbook designed for nursing students pursuing a Proficiency Certificate Level (PCL). This comprehensive book covers a wide range of social science topics relevant to the field of nursing, including sociology, psychology, and ethics.
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  The book provides in-depth discussions on the social determinants of health, patient-nurse relationships, community health, and the ethical considerations in nursing practice. It is written in a clear and accessible style, making complex concepts easy to understand for students.
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  "Social Studies for PCL Nursing" aims to equip nursing students with the knowledge and skills necessary to understand and address the social aspects of healthcare, ensuring they can provide holistic and culturally competent care to their patients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default AboutSection;
