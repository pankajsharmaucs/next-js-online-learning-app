'use client'

import React, { useEffect, useRef, useState } from 'react'
import SidebarMenu from './SidebarMenu';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from "next/navigation";

interface OpenCloseType {
    openCloseTrigger: boolean;
    setsidebarOpened: (value: boolean) => void; // function to update sidebar state
}

const Sidebar = ({ openCloseTrigger, setsidebarOpened }: OpenCloseType) => {
    const [loading, setLoading] = useState(false); // State to track loading status
    const router = useRouter();
    const sidebarRef = useRef<HTMLDivElement | null>(null); // Create ref for the sidebar container

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
            setsidebarOpened(false); // Close the sidebar
            router.push("/admin/login"); // Redirect to login
            setLoading(false);
        }
    };

    // Close the sidebar when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setsidebarOpened(false); // Close the sidebar if click is outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setsidebarOpened]);

    return (
        <>
            {/* sidebar area start */}
            <div className={`sidebar__area p-2 ${openCloseTrigger && "sidebar-opened"}`} ref={sidebarRef}>
                <div className="sidebar__wrapper">
                    <div className="sidebar__close" onClick={() => setsidebarOpened(false)}>
                        <button className="sidebar__close-btn" id="sidebar__close-btn">
                            <span>
                                <i className="fal fa-times" />
                            </span>
                            <span>close</span>
                        </button>
                    </div>
                    <div className="sidebar__content">
                        <div className="logo mb-40">
                            <Link href="/" onClick={() => setsidebarOpened(false)}>
                                {/* <img src="/img/logo/logo.png" alt="logo" /> */}
                            </Link>
                        </div>
                        <div className="mobile-menu fix" />

                        <div className="sidebar__content">
                            <SidebarMenu setsidebarOpened={setsidebarOpened} />
                        </div>

                        <button
                            onClick={logout}
                            className="px-4 py-2 bg-red-700 text-white rounded-xl hover:bg-red-700 
                        transition-colors duration-200 shadow-md"
                        >
                            {loading ? (<span>Loading...</span>) : 'Logout'}
                        </button>
                    </div>
                </div>
            </div>

            {/* sidebar area end */}
            <div className="body-overlay" />
            {/* sidebar area end */}
        </>
    );
};

export default Sidebar;
