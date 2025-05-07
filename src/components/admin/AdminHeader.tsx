'use client'

import React, { useEffect, useState } from 'react'
import Preloader from '../preloader/Preloader'
import Link from 'next/link'


const AdminHeader = () => {
    const [showPreloader, setShowPreloader] = useState(false);
    const [sidebarOpened, setsidebarOpened] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

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
                            
                        </div>
                    </div>
                </div>
            </header>
            {/* header area end */}

             
        </>
    )
}

export default AdminHeader