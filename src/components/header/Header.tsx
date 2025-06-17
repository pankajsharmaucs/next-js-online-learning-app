'use client'

import React, { useEffect, useState } from 'react'
import Preloader from '../preloader/Preloader'
import Sidebar from '../sidebar/Sidebar'
import Link from 'next/link'
import { Class, Subject } from '@/types/add_types';

const Header = () => {

    const [MasterClass, setMasterClass] = useState<Class[]>([]);
    const [MasterSubject, setMasterSubject] = useState<Subject[]>([]);
    const [baseUrl, setBaseUrl] = useState('');


    const MASTER_CLASS = baseUrl + process.env.NEXT_PUBLIC_ADMIN_GET_MASTER_CLASS;
    const MASTER_SUBJECT = baseUrl + process.env.NEXT_PUBLIC_ADMIN_GET_MASTER_SUBJECT;

    const [showPreloader, setShowPreloader] = useState(false);
    const [sidebarOpened, setsidebarOpened] = useState(false);
    const [isSticky, setIsSticky] = useState(false);


    useEffect(() => {
        setBaseUrl(window.location.origin);
        fetchAll();
    }, []);

    const fetchAll = async () => {

        const [mc, ms] = await Promise.all([
            fetch(MASTER_CLASS).then(res => res.json()),
            fetch(MASTER_SUBJECT).then(res => res.json()),
        ]);
        setMasterClass(mc);
        setMasterSubject(ms);

        console.log(ms);

    };



    useEffect(() => {

        setTimeout(() => {
            setShowPreloader(false)
        }, 1500)

    }, [])

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
                <div id="header-sticky" className={`header__area  header__transparent header__padding ${isSticky ? 'sticky' : ''}`} >
                    <div className="container-fluid">
                        <div className="row align-items-center">

                            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-4 p-0">
                                <div className="header__left d-flex">
                                    <div className="logo">
                                        <Link href="/">
                                            <img src="/assets/common/logo.jpg" alt="logo" style={{ width: "60px" }} />
                                        </Link>
                                    </div>
                                    {/* <div className="header__category">
                                        <nav>
                                            <ul>
                                                <li>
                                                    <a
                                                        href="course-grid.html"
                                                        className="cat-menu d-flex align-items-center"
                                                    >
                                                        <div className="cat-dot-icon d-inline-block">
                                                            <svg viewBox="0 0 276.2 276.2">
                                                                <g>
                                                                    <g>
                                                                        <path
                                                                            className="cat-dot"
                                                                            d="M33.1,2.5C15.3,2.5,0.9,17,0.9,34.8s14.5,32.3,32.3,32.3s32.3-14.5,32.3-32.3S51,2.5,33.1,2.5z"
                                                                        />
                                                                        <path
                                                                            className="cat-dot"
                                                                            d="M137.7,2.5c-17.8,0-32.3,14.5-32.3,32.3s14.5,32.3,32.3,32.3c17.8,0,32.3-14.5,32.3-32.3S155.5,2.5,137.7,2.5    z"
                                                                        />
                                                                        <path
                                                                            className="cat-dot"
                                                                            d="M243.9,67.1c17.8,0,32.3-14.5,32.3-32.3S261.7,2.5,243.9,2.5S211.6,17,211.6,34.8S226.1,67.1,243.9,67.1z"
                                                                        />
                                                                        <path
                                                                            className="cat-dot"
                                                                            d="M32.3,170.5c17.8,0,32.3-14.5,32.3-32.3c0-17.8-14.5-32.3-32.3-32.3S0,120.4,0,138.2S14.5,170.5,32.3,170.5z"
                                                                        />
                                                                        <path
                                                                            className="cat-dot"
                                                                            d="M136.8,170.5c17.8,0,32.3-14.5,32.3-32.3c0-17.8-14.5-32.3-32.3-32.3c-17.8,0-32.3,14.5-32.3,32.3    C104.5,156.1,119,170.5,136.8,170.5z"
                                                                        />
                                                                        <path
                                                                            className="cat-dot"
                                                                            d="M243,170.5c17.8,0,32.3-14.5,32.3-32.3c0-17.8-14.5-32.3-32.3-32.3s-32.3,14.5-32.3,32.3    C210.7,156.1,225.2,170.5,243,170.5z"
                                                                        />
                                                                        <path
                                                                            className="cat-dot"
                                                                            d="M33,209.1c-17.8,0-32.3,14.5-32.3,32.3c0,17.8,14.5,32.3,32.3,32.3s32.3-14.5,32.3-32.3S50.8,209.1,33,209.1z    "
                                                                        />
                                                                        <path
                                                                            className="cat-dot"
                                                                            d="M137.6,209.1c-17.8,0-32.3,14.5-32.3,32.3c0,17.8,14.5,32.3,32.3,32.3c17.8,0,32.3-14.5,32.3-32.3    S155.4,209.1,137.6,209.1z"
                                                                        />
                                                                        <path
                                                                            className="cat-dot"
                                                                            d="M243.8,209.1c-17.8,0-32.3,14.5-32.3,32.3c0,17.8,14.5,32.3,32.3,32.3c17.8,0,32.3-14.5,32.3-32.3    S261.6,209.1,243.8,209.1z"
                                                                        />
                                                                    </g>
                                                                </g>
                                                            </svg>
                                                        </div>
                                                        <span>Category</span>
                                                    </a>
                                                    <ul className="cat-submenu">
                                                        <li>
                                                            <a href="course-details.html">English Learning</a>
                                                        </li>
                                                        <li>
                                                            <a href="course-details.html">Web Development</a>
                                                        </li>
                                                        <li>
                                                            <a href="course-details.html">Logo Design</a>
                                                        </li>
                                                        <li>
                                                            <a href="course-details.html">Motion Graphics</a>
                                                        </li>
                                                        <li>
                                                            <a href="course-details.html">Video Edition</a>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div> */}
                                </div>
                            </div>

                            <div className="col-xxl-9 col-xl-9 col-lg-9 col-md-9 col-sm-9 col-8 ">
                                <div className="header__right d-flex justify-content-md-around justify-content-end align-items-center">
                                    <div className="main-menu">
                                        <nav id="mobile-menu" className='d-none d-md-none d-lg-block'>
                                            <ul>
                                                <li>
                                                    <Link href="/">Home</Link>
                                                </li>


                                                <li className="has-dropdown">
                                                    <Link href="classes">Classes</Link>
                                                    <ul className="submenu">
                                                        {
                                                            MasterClass.length ? (
                                                                MasterClass.map((cls: any, index: number) => (
                                                                    <li key={index}>
                                                                        <Link href={`/class/${cls.class_name}`}>{cls.class_name} Class</Link>
                                                                    </li>
                                                                ))
                                                            ) : null
                                                        }
                                                    </ul>
                                                </li>

                                                <li className="has-dropdown">
                                                    <Link href="/subjects">Subject</Link>
                                                    <ul className="submenu">

                                                        {
                                                            MasterSubject.length ? (
                                                                MasterSubject.map((sub: any, index: number) => (
                                                                    <li>
                                                                        <Link href={`/subject/${sub.subject_name.replace(' ', '-').toLowerCase()}`}>{sub.subject_name}</Link>
                                                                    </li>
                                                                ))
                                                            ) : null
                                                        }
                                                    </ul>
                                                </li>

                                                <li>
                                                    <Link href="/blog">Blog</Link>
                                                </li>

                                                <li>
                                                    <Link href="/contact">Contact</Link>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                    <div className="header__search p-relative    d-md-block">
                                        <form action="#" className='d-none d-md-block'>
                                            <input type="text" placeholder="Search..." />
                                            <button type="submit">
                                                <i className="fad fa-search" />
                                            </button>
                                        </form>
                                        <div className="header__cart d-none d-md-none d-lg-block">
                                            <a href="javascript:void(0);" className="cart-toggle-btn">
                                                <div className="header__cart-icon">
                                                    <svg viewBox="0 0 24 24">
                                                        <circle className="st0" cx={9} cy={21} r={1} />
                                                        <circle className="st0" cx={20} cy={21} r={1} />
                                                        <path
                                                            className="st0"
                                                            d="M1,1h4l2.7,13.4c0.2,1,1,1.6,2,1.6h9.7c1,0,1.8-0.7,2-1.6L23,6H6"
                                                        />
                                                    </svg>
                                                </div>
                                                <span className="cart-item">2</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="header__btn ml-10  ">
                                        <Link href="/login" className="e-btn text-white">
                                            Get Start
                                        </Link>
                                    </div>
                                    <div className="sidebar__menu d-xl-none cursor-pointer " onClick={() => setsidebarOpened(true)}>
                                        <div className="sidebar-toggle-btn ml-30" id="sidebar-toggle">
                                            <span className="line" />
                                            <span className="line" />
                                            <span className="line" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/* header area end */}

            <Sidebar openCloseTrigger={sidebarOpened} setsidebarOpened={setsidebarOpened} />
        </>
    )
}

export default Header