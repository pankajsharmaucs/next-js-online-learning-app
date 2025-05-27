'use client';

import React, { useState } from 'react';
import { FaBars, FaSignOutAlt } from 'react-icons/fa';
import SidebarButton from '../SidebarButton'; // adjust path if needed
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const sidebarItems = [
  {
    label: 'Home',
    icon: 'FaHome',
    link: '/',
  },

  {
    label: 'Dashboard',
    icon: 'FaTachometerAlt',
    link: '/user/dashboard',
  },

  {
    label: 'Subscribed',
    icon: 'FaBookOpen',
    dropdownItems: [
      { label: 'All Classes', link: '/user/classes' },
      { label: 'Add Subjects', link: '/user/subjects' },
    ],
  },
  {
    label: 'Settings',
    icon: 'FaCog',
    link: '/settings',
  },
];

const HeaderWithSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const logout = async () => {
    setLoading(true); // Show loader
    try {
      const baseUrl = window.location.origin;
      const Path = process.env.NEXT_PUBLIC_USER_LOGOUT;
      const Url = `${baseUrl}${Path}`;
      await axios.post(Url, {}, { withCredentials: true });
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      router.push("/login"); // Redirect to login
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <header className="flex justify-between items-center bg-blue-600 text-white px-4 py-3 shadow-md">
        <Link href="/user/dashboard">
          <div className="text-lg font-bold">User Dashboard</div>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white text-3xl"
        >
          <FaBars className='text-3xl' />
        </button>
      </header>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-white/30 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="p-4 flex flex-col gap-2">
          {sidebarItems.map((item, index) => (
            <SidebarButton
              key={index}
              label={item.label}
              icon={item.icon as any}
              link={item.link}
              setSidebarOpen={setSidebarOpen}
              dropdownItems={item.dropdownItems}
            />
          ))}

          {/* Logout Button */}
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-2 mt-1 text-red-600 bg-red-100  hover:bg-red-200 rounded transition"
          >
            <FaSignOutAlt />
            {loading ? "Logging Out...": 'Logout' }
          </button>

        </div>
      </aside>
    </>
  );
};

export default HeaderWithSidebar;
