"use client"

import React, { useEffect, useState } from 'react'
import SidebarButton from "@/components/admin/SidebarButton";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { FaSignOutAlt } from 'react-icons/fa';

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
                <aside
                    id="sidebar"
                    className="lg:flex w-59 bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white flex-col items-center py-8 fixed 
                    left-0 top-0 h-full shadow-lg z-50 rounded-10 relative overflow-hidden"
                >
                    <h5 className="font-bold mb-10 mt-4 w-100 p-2 text-gray-950 text-center">Admin Panel</h5>
                    <nav className="flex flex-col gap-1 w-full pt-4 pb-1 ps-2 ">
                        <SidebarButton label="Dashboard" icon="FaTachometerAlt" link="/admin/dashboard" />
                        <SidebarButton label="Users" icon="FaUser" link="/admin/users" />
                        <SidebarButton label="Master" icon="FaPlus" link="/admin/master" />
                        <SidebarButton label="Add" icon="FaPlus" link="/admin/add" />
                        <SidebarButton label="Blog" icon="FaPlus" link="/admin/blog" />
                        <SidebarButton label="Settings" icon="FaCog" link="/admin/settings" />
                    </nav>

                    <div className='w-full px-2'>
                        <div className='w-full p-2 flex items-center rounded  hover:bg-gray-600 transition-colors duration-200  '>
                            <FaSignOutAlt />
                            <button
                                onClick={logout}
                                className="ps-3 text-red-400 rounded-xl border-b-2 border-transparent 
                                           hover:border-red-600focus:outline-none"
                            >
                                {loading ? (<span>Logging out...</span>) : 'Logout'}
                            </button>
                        </div>
                    </div>

                    <div className="mt-100 ms-3 justify-center w-full pointer-events-auto">
                        <a href="tel:+918800637982"
                            className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white font-semibold py-2 px-4 rounded-xl shadow-lg hover:shadow-xl active:translate-y-1 active:shadow-none transition-all duration-150"
                        >
                            Developer Support
                        </a>
                    </div>

                    
                </aside>
            )}
        </>
    );
};

export default Sidebar;
