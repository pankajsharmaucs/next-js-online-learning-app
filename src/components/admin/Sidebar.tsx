"use client"

import React, { useEffect, useState } from 'react'
import SidebarButton from "@/components/admin/SidebarButton";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const [showSideBar, setshowSideBar] = useState(true); // Set to true initially for preloading
    const [loading, setLoading] = useState(false); // State to track loading status
    const [adminPath, setadminPath] = useState('');
    const router = useRouter();
    const pathname = usePathname();

    // Update adminPath based on pathname
    useEffect(() => {
        setadminPath(pathname);
        setshowSideBar(false); // Hide preloader after some delay
    }, [pathname]);

    // Logout function to invalidate the session/token
    const logout = async () => {
        setLoading(true); // Show loader

        try {
            const baseUrl = window.location.origin;
            const Path = process.env.NEXT_PUBLIC_ADMIN_LOGOUT; // Make sure to set the logout endpoint in the environment variable
            const Url = `${baseUrl}${Path}`;

            await axios.post(Url, {}, { withCredentials: true });
        } catch (error) {
            console.error("Error logging out:", error);
        } finally {
            router.push("/admin/login"); // Redirect to login
            setLoading(false);
        }
    };

    // Only render sidebar if not on login or home page
    if (adminPath === '/admin/login' || adminPath === '/admin') {
        return null; // Do not render sidebar on these pages
    }

    return (
        <>
            {showSideBar ? (
                <></>
            ) : (
                <aside id="sidebar" className="lg:flex w-49 bg-gray-900 text-white flex-col items-center py-8 fixed left-0 top-0 h-full shadow-lg z-50">
                    <h6 className="font-bold mb-10 mt-4 w-100 p-2 text-gray-950 text-center">Admin Panel</h6>
                    <nav className="flex flex-col gap-1 w-full py-4 ps-2 ">
                        <SidebarButton label="Dashboard" icon="FaTachometerAlt" link="/admin/dashboard" />
                        <SidebarButton label="Users" icon="FaUser" link="/admin/users" />
                        <SidebarButton label="Add" icon="FaPlus" link="/admin/add" />
                        <SidebarButton label="Classes" icon="FaChalkboardTeacher" link="/admin/classes" />
                        <SidebarButton label="Subjects" icon="FaBookOpen" link="/admin/subjects" />
                        <SidebarButton label="Settings" icon="FaCog" link="/admin/settings" />
                    </nav>
                    <div className='px-2 w-100 mt-20'>
                        <button
                            onClick={logout}
                            className="px-4 py-1 border border-red-500 text-white rounded-xl hover:bg-red-600 
                            transition-colors duration-200 shadow-md hover:shadow-lg 
                            focus:outline-none focus:ring-2 focus:ring-red-700"
                        >
                            {loading ? (<span>Loading...</span>) : 'Logout'}
                        </button>
                    </div>
                </aside>
            )}
        </>
    );
};

export default Sidebar;
