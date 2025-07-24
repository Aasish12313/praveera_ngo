'use client';

import React from 'react';
import Link from 'next/link';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const info = {
  address: '123 Praveera Road, New Delhi, India',
  email: 'contact@praveerafoundation.org',
  phone: ['+91 9876543210', '+91 9988776655'],
  socialLinks: {
    instagram: 'https://instagram.com/praveera',
    facebook: 'https://facebook.com/praveera',
    twitter: 'https://twitter.com/praveera',
    linkedin: 'https://linkedin.com/company/praveera',
  },
};

const Footer = () => {
  return (
    <footer className="bg-[#f0fdf4] text-[#1c1c1c] pt-16 pb-8 border-t border-green-200 mt-24">
      <div className="max-w-[1400px] mx-auto px-6 grid md:grid-cols-4 gap-12">
        {/* Branding & Socials */}
        <div>
          <h2 className="text-3xl font-bold text-green-700 mb-3">
            Praveera Welfare<br />Foundation
          </h2>
          <p className="italic text-gray-600 mb-4">
            "Together, we rise by lifting others."
          </p>
          <div className="flex gap-4">
            {[info.socialLinks.instagram, info.socialLinks.facebook, info.socialLinks.twitter, info.socialLinks.linkedin].map((href, i) =>
              href ? (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-green-100 hover:bg-green-300 text-green-700 rounded-full transition"
                >
                  {
                    [<FaInstagram />, <FaFacebookF />, <FaTwitter />, <FaLinkedinIn />][i]
                  }
                </a>
              ) : null
            )}
          </div>
        </div>

        {/* Quick Links - Split into 2 Columns */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-green-800">Quick Links</h3>
          <div className="grid grid-cols-2 gap-x-8 text-gray-700 text-sm">
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-green-600">Home</Link></li>
              <li><Link href="/about" className="hover:text-green-600">About</Link></li>
              <li><Link href="/programs" className="hover:text-green-600">Programs</Link></li>
              <li><Link href="/impact" className="hover:text-green-600">Impact</Link></li>
            </ul>
            <ul className="space-y-2">
              <li><Link href="/gallery" className="hover:text-green-600">Gallery</Link></li>
              <li><Link href="/donate" className="hover:text-green-600">Donate</Link></li>
              <li><Link href="/volunteer" className="hover:text-green-600">Volunteer</Link></li>
              <li><Link href="/contact" className="hover:text-green-600">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-green-800">Contact</h3>
          <div className="space-y-4 text-gray-700 text-sm">
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-green-600 mt-1" />
              <span>{info.address}</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-green-600" />
              <a href={`mailto:${info.email}`} className="hover:underline">{info.email}</a>
            </div>
            <div className="flex items-start gap-3">
              <FaPhoneAlt className="text-green-600 mt-1" />
              <div className="flex flex-col">
                {info.phone.map((p, i) => (
                  <a key={i} href={`tel:${p}`} className="hover:underline">{p}</a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-green-800">Support Our Mission</h3>
          <p className="text-gray-600 mb-4 text-sm">
            Your contributions help us bring lasting change to communities in need.
          </p>
          <Link
            href="/donate"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg transition text-sm"
          >
            Donate Now
          </Link>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 pt-5 border-t border-green-200 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Praveera Welfare Foundation. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
