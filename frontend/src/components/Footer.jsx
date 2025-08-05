// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import {
//   FaFacebookF,
//   FaInstagram,
//   FaLinkedinIn,
//   FaTwitter,
//   FaEnvelope,
//   FaPhoneAlt,
//   FaMapMarkerAlt,
// } from 'react-icons/fa';

// const info = {
//   address: '123 Praveera Road, New Delhi, India',
//   email: 'contact@praveerafoundation.org',
//   phone: ['+91 9876543210', '+91 9988776655'],
//   socialLinks: {
//     instagram: 'https://instagram.com/praveera',
//     facebook: 'https://facebook.com/praveera',
//     twitter: 'https://twitter.com/praveera',
//     linkedin: 'https://linkedin.com/company/praveera',
//   },
// };

// const Footer = () => {
//   return (
//     <footer className="bg-[#f5f5f5] text-black pt-16 pb-8 border-t border-[#ff4081]">
//       <div className="max-w-[1400px] mx-auto px-6 grid md:grid-cols-4 gap-12">
        
//         {/* Logo, Tagline & Socials */}
//         <div className="flex flex-col">
//           <div className="flex items-center gap-3 mb-3">
//             <Image
//               src="/logo.png"
//               alt="Praveera Logo"
//               width={50}
//               height={50}
//               className="object-contain"
//             />
//             <h2 className="text-3xl font-bold leading-tight">
//               Praveera Welfare Foundation
//             </h2>
//           </div>
//           <p className="italic text-sm mb-4">
//             "Empowering communities through social & cultural initiatives"
//           </p>
//           <div className="flex gap-3 mt-1">
//             {Object.entries(info.socialLinks).map(([key, href]) => (
//               href && (
//                 <a
//                   key={key}
//                   href={href}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="w-10 h-10 flex items-center justify-center bg-[#ff4081] hover:bg-[#ff80ab] text-white rounded-full transition transform hover:scale-110"
//                   aria-label={key}
//                 >
//                   { 
//                     {
//                       instagram: <FaInstagram />,
//                       facebook: <FaFacebookF />,
//                       twitter: <FaTwitter />,
//                       linkedin: <FaLinkedinIn />,
//                     }[key]
//                   }
//                 </a>
//               )
//             ))}
//           </div>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
//           <div className="grid grid-cols-2 gap-x-8 text-sm">
//             <ul className="space-y-2">
//               <li><Link href="/" className="hover:text-[#ff80ab]">Home</Link></li>
//               <li><Link href="/about" className="hover:text-[#ff80ab]">About</Link></li>
//               <li><Link href="/programs" className="hover:text-[#ff80ab]">Programs</Link></li>
//               <li><Link href="/impact" className="hover:text-[#ff80ab]">Impact</Link></li>
//             </ul>
//             <ul className="space-y-2">
//               <li><Link href="/gallery" className="hover:text-[#ff80ab]">Gallery</Link></li>
//               <li><Link href="/donate" className="hover:text-[#ff80ab]">Donate</Link></li>
//               <li><Link href="/volunteer" className="hover:text-[#ff80ab]">Volunteer</Link></li>
//               <li><Link href="/contact" className="hover:text-[#ff80ab]">Contact</Link></li>
//             </ul>
//           </div>
//         </div>

//         {/* Contact Info */}
//         <div>
//           <h3 className="text-xl font-semibold mb-4">Contact</h3>
//           <div className="space-y-4 text-sm">
//             <div className="flex items-start gap-3">
//               <FaMapMarkerAlt className="text-[#ff80ab] mt-1" />
//               <span>{info.address}</span>
//             </div>
//             <div className="flex items-center gap-3">
//               <FaEnvelope className="text-[#ff80ab]" />
//               <a href={`mailto:${info.email}`} className="hover:underline">{info.email}</a>
//             </div>
//             <div className="flex items-start gap-3">
//               <FaPhoneAlt className="text-[#ff80ab] mt-1" />
//               <div className="flex flex-col">
//                 {info.phone.map((p, i) => (
//                   <a key={i} href={`tel:${p}`} className="hover:underline">{p}</a>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Donate CTA */}
//         <div>
//           <h3 className="text-xl font-semibold mb-4">Support Our Mission</h3>
//           <p className="mb-4 text-sm leading-relaxed">
//             Your contribution can help us bring lasting change to communities in need. Every step matters.
//           </p>
//           <Link
//             href="/donate"
//             className="inline-block bg-[#ff4081] hover:bg-[#ff80ab] text-white px-5 py-3 rounded-lg font-semibold transition text-sm"
//           >
//             Donate Now
//           </Link>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="mt-10 pt-5 text-center text-sm bg-[#f5f5f5]">
//         © {new Date().getFullYear()} Praveera Welfare Foundation. All rights reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
    <footer className="bg-white border-t border-pink-400 pt-12 text-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section: Logo & Socials */}
        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-3">
            <Image src="/logo.png" alt="Logo" width={50} height={50} />
            <h2 className="text-2xl font-bold">Praveera Welfare Foundation</h2>
          </div>
          <p className="italic text-sm mt-2">
            "Empowering communities through social & cultural initiatives"
          </p>
          <div className="mt-4 flex justify-center gap-4">
            {Object.entries(info.socialLinks).map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center bg-pink-500 hover:bg-pink-600 text-white rounded-full transition"
                aria-label={key}
              >
                {{
                  instagram: <FaInstagram />,
                  facebook: <FaFacebookF />,
                  twitter: <FaTwitter />,
                  linkedin: <FaLinkedinIn />,
                }[key]}
              </a>
            ))}
          </div>
        </div>

        {/* Middle Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-pink-600">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-pink-500">Home</Link></li>
              <li><Link href="/about" className="hover:text-pink-500">About</Link></li>
              <li><Link href="/programs" className="hover:text-pink-500">Programs</Link></li>
              <li><Link href="/impact" className="hover:text-pink-500">Impact</Link></li>
              <li><Link href="/gallery" className="hover:text-pink-500">Gallery</Link></li>
              <li><Link href="/donate" className="hover:text-pink-500">Donate</Link></li>
              <li><Link href="/volunteer" className="hover:text-pink-500">Volunteer</Link></li>
              <li><Link href="/contact" className="hover:text-pink-500">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4 text-pink-600">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-pink-500 mt-1" />
                <p>{info.address}</p>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-pink-500" />
                <a href={`mailto:${info.email}`} className="hover:underline">{info.email}</a>
              </div>
              <div className="flex items-start gap-3">
                <FaPhoneAlt className="text-pink-500 mt-1" />
                <div className="flex flex-col">
                  {info.phone.map((p, i) => (
                    <a key={i} href={`tel:${p}`} className="hover:underline">{p}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-pink-600">Support Our Mission</h3>
            <p className="mb-4">
              Your donation helps us uplift lives. Every rupee goes toward impactful programs in education, health, and care.
            </p>
            <Link
              href="/donate"
              className="inline-block bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-md font-medium"
            >
              Donate Now
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 mt-12 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Praveera Welfare Foundation. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
