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
      <div className="w-full px-4 md:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo and NGO Name */}
        <Link href="/" className="flex items-center gap-3 min-w-0">
          <Image
            src="/logo.png"
            alt="Praveera Logo"
            width={50}
            height={50}
            className="object-contain flex-shrink-0"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-bold text-green-900 whitespace-nowrap">
              Praveera Socio Cultural Welfare Foundation
            </span>
          </div>
        </Link>

        {/* Nav + Donate + Mobile Menu */}
        <div className="flex items-center justify-end flex-grow">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7 xl:gap-9">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`text-[15px] font-medium border-b-2 transition-all duration-200 ${
                  pathname === item.path
                    ? 'text-orange-700 border-orange-700'
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
            className="hidden md:flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 ml-5 rounded-lg font-semibold text-sm shadow transition"
          >
            <Heart size={16} className="mr-2" />
            Donate
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-green-900 ml-4"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="md:hidden bg-white px-6 py-4 space-y-4 shadow border-t border-gray-200">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`block text-base font-medium ${
                pathname === item.path ? 'text-orange-700' : 'text-green-900'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/donate"
            className="block text-center bg-blue-600 text-white py-2 rounded-lg font-semibold mt-2"
            onClick={() => setMenuOpen(false)}
          >
            <Heart size={16} className="inline-block mr-1" />
            Donate
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
