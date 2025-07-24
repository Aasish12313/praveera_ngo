'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, Heart } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Impact', path: '/impact' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact Us', path: '/contact' },
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
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 py-3 flex items-center justify-between">
        {/* Logo + Title */}
        <Link href="/" className="flex items-center space-x-4">
          <Image
            src="/logo.png"
            alt="Praveera Foundation Logo"
            width={70}
            height={70}
            className="object-contain"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-[20px] sm:text-[22px] md:text-[24px] font-extrabold text-green-900">
              Praveera Welfare
            </span>
            <span className="text-sm text-pink-600 font-medium tracking-wide">
              Empowering Lives with Compassion
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`text-base font-medium border-b-2 transition-all duration-200 ${
                pathname === item.path
                  ? 'text-orange-700 border-orange-700'
                  : 'text-green-900 border-transparent hover:text-orange-600 hover:border-orange-600'
              }`}
            >
              {item.name}
            </Link>
          ))}

          {/* Dropdown */}
          <div className="relative group">
            <button className="flex items-center text-green-900 hover:text-orange-600 font-medium transition">
              More <ChevronDown size={16} className="ml-1" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg hidden group-hover:block z-30">
              <Link
                href="/volunteer"
                className="block px-4 py-2 text-sm text-green-900 hover:bg-orange-50 rounded"
              >
                Volunteer
              </Link>
              <Link
                href="/careers"
                className="block px-4 py-2 text-sm text-green-900 hover:bg-orange-50 rounded"
              >
                Careers
              </Link>
            </div>
          </div>
        </nav>

        {/* Donate CTA Button */}
        <Link
          href="/donate"
          className="hidden md:flex items-center bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-full font-semibold shadow transition"
        >
          <Heart size={18} className="mr-2" />
          Donate
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-green-900"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
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
            href="/volunteer"
            className="block text-base font-medium text-green-800 hover:text-orange-600"
            onClick={() => setMenuOpen(false)}
          >
            Volunteer
          </Link>
          <Link
            href="/careers"
            className="block text-base font-medium text-green-800 hover:text-orange-600"
            onClick={() => setMenuOpen(false)}
          >
            Careers
          </Link>
          <Link
            href="/donate"
            className="block text-center bg-orange-600 text-white py-2 rounded-md font-semibold mt-2"
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
