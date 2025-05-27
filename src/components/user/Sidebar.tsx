"use client"

import React, { useEffect, useState } from 'react'
import SidebarButton from "@/components/user/SidebarButton";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';

const Sidebar = () => {
    const [showSideBar, setshowSideBar] = useState(true); // Set to true initially for preloading
    const [loading, setLoading] = useState(false); // State to track loading status
    const [userPath, setUserPath] = useState('');
    const router = useRouter();
    const pathname = usePathname();

    // Update userPath based on pathname
    useEffect(() => {
        setUserPath(pathname);
        setshowSideBar(false); // Hide preloader after some delay
    }, [pathname]);

    // Logout function to invalidate the session/token
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

    // Only render sidebar if not on login or home page
    if (userPath === '/user/login' || userPath === '/user') {
        return null; // Do not render sidebar on these pages
    }

    return (
        <>
            {showSideBar ? (
                <></>
            ) : (
                <aside id="sidebar" className="lg:flex w-70 bg-gradient-to-b bg-white  flex-col  py-8 fixed left-0 top-0 
                        h-full shadow-lg z-50 rounded-10 relative overflow-hidden" >
                    <div className='px-3 mt-4' >
                        <div className="flex justify-start align-center w-100 text-blue-800  p-2 rounded ">
                            <FaTachometerAlt className='text-3xl me-3' />
                            <h5 className='pt-1'>User Dashboard</h5>
                        </div>
                        <div className='my-3 text-gray-400 text-sm'>MENU</div>
                    </div>

                    <nav className="flex flex-col gap-2 w-full  pb-1 px-4 ">
                        <SidebarButton label="Dashboard" icon="FaTachometerAlt" link="/user/dashboard" />
                        <SidebarButton
                            label="Subscribed"
                            icon="FaBookOpen"
                            dropdownItems={[
                                { label: 'All Classes', link: '/user/classes' },
                                { label: 'All Subjects Course', link: '/user/subjects' },
                            ]}
                        />
                        <SidebarButton label="Settings" icon="FaCog" link="/user/settings" />
                    </nav>

                    <div className='w-full px-4 mt-1'>
                        <div onClick={logout} className='cursor-pointer w-full p-2 flex items-center rounded bg-blue-50 text-blue-800 transition-colors duration-200  '>
                            <FaSignOutAlt />
                            <button
                                className="ps-3 text-red-400 rounded-xl border-b-2 border-transparent hover:border-red-600focus:outline-none">
                                {loading ? (<span>Logging out...</span>) : 'Logout'}
                            </button>
                        </div>
                    </div>

                </aside>
            )}
        </>
    );
};

export default Sidebar;
