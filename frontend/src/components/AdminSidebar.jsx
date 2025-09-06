'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard, Heart, Folder, Users, Calendar,
  Target, Image, Settings, LogOut, Inbox, MessageSquare, FileInput,
  Menu, X
} from 'lucide-react';
import { useEffect, useState } from 'react';

const navItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: <LayoutDashboard size={18} /> },
  { name: 'Applications', href: '/admin/applications', icon: <Heart size={18} /> },
  { name: 'Program', href: '/admin/programs', icon: <Folder size={18} /> },
  { name: 'Events', href: '/admin/events', icon: <Calendar size={18} /> },
  { name: 'Impact', href: '/admin/impact', icon: <Target size={18} /> },
  { name: 'Volunteers', href: '/admin/volunteer', icon: <Users size={18} /> },
  { name: 'Gallery', href: '/admin/gallery', icon: <Image size={18} /> },
  { name: 'Messages', href: '/admin/contact', icon: <MessageSquare size={18} /> },
  { name: 'Comments', href: '/admin/comments', icon: <FileInput size={18} /> },
  { name: 'Donations', href: '/admin/donation', icon: <Inbox size={18} /> },
  { name: 'Members', href: '/admin/members', icon: <Users size={18} /> },
  { name: 'Partners', href: '/admin/partners', icon: <Folder size={18} /> },

];

export default function AdminSidebar({ isOpen, toggleSidebar }) {
  const pathname = usePathname();
  const router = useRouter();
  const [adminEmail, setAdminEmail] = useState('');

  useEffect(() => {
    const email = localStorage.getItem('adminEmail') || 'admin@gmail.com';
    setAdminEmail(email);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminEmail');
    router.push('/admin');
  };

  return (
    <>
      {/* Mobile Hamburger Icon */}
      <div className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-full shadow-md text-black">
        <button onClick={toggleSidebar} className="text-black">
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-[240px] bg-gradient-to-b from-white to-gray-50 border-r shadow-md flex flex-col justify-between
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo + Title + Close Icon */}
          <div className="relative border-b shadow-sm px-6 py-5 text-center">
            {/* Close Icon (mobile only) */}
            <button
              className="absolute right-4 top-4 md:hidden text-gray-600"
              onClick={toggleSidebar}
            >
              <X size={20} />
            </button>

            {/* Logo */}
            <img
              src="/logo.png"
              alt="Logo"
              className="w-16 h-16 mx-auto object-contain"
            />

            {/* NGO Name */}
            <h1 className="text-lg font-bold text-gray-800 leading-tight mt-3">
              Praveera Socio Culture <br /> Welfare Foundation
            </h1>

            {/* Admin Portal */}
            <p className="text-sm text-gray-500 mt-1">Admin Portal</p>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-auto px-4 pt-6">
            <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">
              Main Navigation
            </p>
            <nav className="space-y-2">
              {navItems.map(({ name, href, icon }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    href={href}
                    key={name}
                    className={`group relative flex items-center px-4 py-2 rounded-lg text-sm font-medium gap-3 transition-all duration-300
                      ${isActive
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                      }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 h-full w-1 rounded-r-full bg-blue-600"></span>
                    )}
                    {icon}
                    <span className="group-hover:scale-105 transition-transform">{name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Footer */}
          <div className="px-4 py-5 border-t bg-white shadow-inner">
            <div className="mb-3">
              <p className="text-sm font-semibold text-gray-800">👤 Admin</p>
              <p className="text-xs text-gray-500 truncate">{adminEmail}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 text-sm text-red-600 font-medium bg-red-50 hover:bg-red-100 rounded-lg gap-2 transition-all"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
