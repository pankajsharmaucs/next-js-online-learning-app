'use client'

import React, { useEffect, useState } from 'react'
import Preloader from '../preloader/Preloader'
import Sidebar from './sidebar/Sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import path from 'path'

const AdminHeader = () => {

    const [showPreloader, setShowPreloader] = useState(false);
    const [sidebarOpened, setsidebarOpened] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const pathname = usePathname();
    const [adminPath, setadminPath] = useState('');

    useEffect(() => {

        console.log(pathname);

        setadminPath(pathname)

        setTimeout(() => {
            setShowPreloader(false)
        }, 500)

    }, [pathname])

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 60) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Clean up
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {showPreloader && <Preloader />}

            {/* back to top start */}
            <div className="progress-wrap">
                <svg
                    className="progress-circle svg-content"
                    width="100%"
                    height="100%"
                    viewBox="-1 -1 102 102"
                >
                    <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
                </svg>
            </div>
            {/* back to top end */}

            {/* header area start */}
            <header>
                <div id="header-sticky" className={`header__area  header__transparent p-4 ${isSticky ? 'sticky' : ''}`} >
                    <div className="container-fluid">
                        <div className="row align-items-center">

                            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-4 p-0">
                                <div className="header__left d-flex">
                                    <div className="logo">
                                        <Link href="/">
                                            {/* <img src="/img/logo/logo.png" alt="logo" /> */}
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {
                                adminPath !== '/admin/login' && adminPath !== '/admin' &&

                                <div className="col-xxl-9 col-xl-9 col-lg-9 col-md-9 col-sm-9 col-8 ">
                                    <div className="header__right d-flex  justify-content-end align-items-center">
                                        {/* <div className="main-menu">
                                        <nav id="mobile-menu" className='d-none d-md-none d-lg-block'>
                                            <ul>
                                                <li>
                                                    <Link href="/admin/dashboard">Dashboard</Link>
                                                </li>

                                                <li>
                                                    <Link href="/admin/add">Add</Link>
                                                </li>

                                                <li>
                                                    <Link href="/admin/classes">Classes</Link>
                                                </li>
                                                
                                                <li>
                                                    <Link href="/admin/subjetcs">Subjetcs</Link>
                                                </li>
                                                
                                            </ul>
                                        </nav>
                                    </div> */}
                                        <div className="sidebar__menu cursor-pointer " onClick={() => setsidebarOpened(true)}>
                                            <div className="sidebar-toggle-btn ml-30" id="sidebar-toggle">
                                                <span className="line" />
                                                <span className="line" />
                                                <span className="line" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            }
                        </div>
                    </div>
                </div>
            </header>
            {/* header area end */}

            {
                adminPath !== '/admin/login' && adminPath !== '/admin' &&
                <Sidebar openCloseTrigger={sidebarOpened} setsidebarOpened={setsidebarOpened} />
            }
        </>
    )
}

export default AdminHeader