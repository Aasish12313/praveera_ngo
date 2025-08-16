"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard" },
  { name: "Applications", href: "/admin/applications" },
  { name: "Programs", href: "/admin/program" },
  { name: "Events", href: "/admin/events" },
  { name: "Impact", href: "/admin/impact" },
  { name: "Volunteers", href: "/admin/volunteer" },
  { name: "Gallery", href: "/admin/gallery" },
  { name: "Messages", href: "/admin/contact" },
  { name: "Comments", href: "/admin/comments" },
  { name: "Donations", href: "/admin/donation" },
  { name: "Members", href: "/admin/members" },
];

export default function AdminSidebar({ isOpen, toggleSidebar }) {
  const pathname = usePathname();
  const router = useRouter();
  const [adminEmail, setAdminEmail] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("adminEmail") || "admin@praveera.org";
    setAdminEmail(email);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminEmail");
    router.push("/admin");
  };

  return (
    <>
      {/* Mobile toggle button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-2 bg-white rounded-lg shadow hover:bg-gray-100 transition"
        >
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-40 h-full w-64 bg-[#112B3C] text-white flex flex-col justify-between transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top Section */}
        <div>
          {/* Logo and Name Centered */}
          <div className="flex flex-col items-center p-5 border-b border-gray-700">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-16 h-16 object-contain mb-2"
            />
            <h1 className="text-center text-sm font-bold leading-tight">
              Praveera Socio Culture<br />Welfare Foundation
            </h1>
            <p className="text-xs text-gray-300">Admin Dashboard</p>
            <button
              className="absolute right-4 top-6 md:hidden"
              onClick={toggleSidebar}
            >
              ✖
            </button>
          </div>

          {/* Navigation */}
          <nav className="mt-4 px-3 space-y-1">
            {navItems.map(({ name, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={name}
                  href={href}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? "bg-[#F66B0E] text-white"
                      : "text-gray-300 hover:bg-[#F66B0E]/80 hover:text-white"
                  }`}
                >
                  {name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer / Profile */}
        <div className="border-t border-gray-700 p-4">
          <div className="mb-3">
            <p className="text-xs text-gray-400">Logged in as</p>
            <p className="text-sm font-semibold truncate">{adminEmail}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full text-sm px-3 py-2 bg-red-600 hover:bg-red-500 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
