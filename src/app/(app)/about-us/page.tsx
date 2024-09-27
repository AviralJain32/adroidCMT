'use client';

import React from 'react';
import Image from 'next/image';
import { FaRegEnvelope, FaPhoneAlt, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TiTick } from 'react-icons/ti';

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900">About Us</h1>
        <p className="mt-4 text-lg text-gray-600">
          Welcome to Adroid CMT, your premier Conference Management Tool!
        </p>
      </header>

      {/* Our Mission Section */}
      <section className="mb-10 bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-gray-800">Our Mission</h2>
        <p className="mt-4 text-gray-700">
          At Adroid CMT, our mission is to streamline the conference management process for organizers and participants alike. We aim to create a user-friendly platform that enhances collaboration, efficiency, and engagement within the academic and professional community.
        </p>
      </section>

      {/* Features Section */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold text-gray-800">Key Features</h2>
        <ul className="mt-4 space-y-4">
          {[
            'User-friendly interface for easy navigation.',
            'Comprehensive dashboard for organizers and participants.',
            'Secure paper submission and review process.',
            'Integrated payment gateway for registration fees.',
            'Real-time notifications and updates for users.',
          ].map((feature, index) => (
            <li key={index} className="flex items-start space-x-2">
              <TiTick className='mt-1 text-green-600'/>
              <p className="text-gray-700">{feature}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Contact Us Section */}
      <section className="mb-10 bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-gray-800">Contact Us</h2>
        <p className="mt-4 text-gray-700">We’d love to hear from you! Feel free to reach out to us through the following channels:</p>
        <div className="mt-4">
          <div className="flex items-center">
            <FaRegEnvelope className="text-gray-600" />
            <span className="ml-2 text-gray-700">info@adroidcmt.com</span>
          </div>
          <div className="flex items-center mt-2">
            <FaPhoneAlt className="text-gray-600" />
            <span className="ml-2 text-gray-700">+1 (123) 456-7890</span>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <Link href="https://facebook.com" target="_blank" className="text-gray-600 hover:text-blue-600">
              <FaFacebookF />
            </Link>
            <Link href="https://twitter.com" target="_blank" className="text-gray-600 hover:text-blue-600">
              <FaTwitter />
            </Link>
            <Link href="https://linkedin.com" target="_blank" className="text-gray-600 hover:text-blue-600">
              <FaLinkedinIn />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <div className="text-center">
        <Link href="/contact">
          <Button className="bg-blue-600 text-white hover:bg-blue-700">
            Get in Touch
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
