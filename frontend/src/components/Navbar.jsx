'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Heart } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Initiatives', path: '/programs' },
    { name: 'Our Reach', path: '/impact' },
    { name: 'Moments', path: '/gallery' },
    { name: 'Partners & Collaborators', path: '/partners' },
    { name: 'Join the Cause', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-white'
      }`}
    >
      <div className="w-full px-4 md:px-6 lg:px-10 py-1 flex items-center justify-between">
        {/* Logo Only */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo2.png"
            alt="Logo"
            width={150}
            height={150}
            className="object-contain"
          />
        </Link>

        {/* Centered Navigation Menu */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7 xl:gap-9">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`text-[16px] font-semibold border-b-2 transition-all duration-200 ${
                pathname === item.path
                  ? 'text-orange-600 border-orange-600'
                  : 'text-green-900 border-transparent hover:text-orange-600 hover:border-orange-600'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Donate CTA */}
        <Link
          href="/donate"
          className="hidden md:flex items-center bg-blue-600 hover:bg-orange-700 text-white px-4 py-1.5 rounded font-bold text-base shadow transition"
        >
          DONATE NOW <Heart size={16} className="ml-2" />
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-green-900 ml-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="md:hidden bg-white px-6 py-3 space-y-3 shadow border-t border-gray-200">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`block text-[16px] font-semibold ${
                pathname === item.path ? 'text-orange-700' : 'text-green-900'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/donate"
            className="block text-center bg-orange-600 text-white py-2 rounded-lg font-bold text-base mt-2"
            onClick={() => setMenuOpen(false)}
          >
            <Heart size={16} className="inline-block mr-1" />
            Donate Now
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
