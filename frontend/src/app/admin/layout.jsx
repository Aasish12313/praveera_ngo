import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import AdminFooter from '../../components/AdminFooter';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-100">
        <main className="flex-grow p-6">{children}</main>
        <AdminFooter />
      </div>
    </div>
  );
}
