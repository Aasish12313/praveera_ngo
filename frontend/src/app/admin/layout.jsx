'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AdminSidebar from '../../components/AdminSidebar';
import AdminFooter from '../../components/AdminFooter';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';

    // Allow access to login page only if not logged in
    if (!isLoggedIn && pathname !== '/admin') {
      router.replace('/admin');
    } else {
      setIsAuthenticated(true);
    }

    setCheckingAuth(false);
  }, [pathname, router]);

  if (checkingAuth) {
    return <div className="text-center p-10">Checking Authentication...</div>;
  }

  // Block rendering for protected pages
  if (!isAuthenticated && pathname !== '/admin') {
    return null;
  }

  // Only render login page without sidebar
  if (pathname === '/admin') {
    return <>{children}</>;
  }

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
