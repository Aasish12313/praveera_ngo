'use client';
import { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import AdminFooter from '../../components/AdminFooter';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="relative h-screen font-sans bg-white">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 block md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Full Page Wrapper with Flex for Desktop */}
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="z-40">
          <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 to-white z-10">
          <main className="px-6 py-6 min-h-full">{children}</main>
          <AdminFooter />
        </div>
      </div>
    </div>
  );
}
