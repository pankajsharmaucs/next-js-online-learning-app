'use client'

import React, { useEffect, useState } from 'react'
import Preloader from '../preloader/Preloader'
import Sidebar from '../sidebar/Sidebar'

const Header = () => {

    const [showPreloader, setShowPreloader] = useState(false);
    const [sidebarOpened, setsidebarOpened] = useState(false);

    useEffect(() => {

        setTimeout(() => {
            setShowPreloader(false)
        }, 1500)

    }, [])

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
                <div id="header-sticky" className="header__area header__transparent header__padding" >
                    <div className="container-fluid">
                        <div className="row align-items-center">

                            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-4 p-0">
                                <div className="header__left d-flex">
                                    <div className="logo">
                                        <a href="index.html">
                                            <img src="/img/logo/logo.png" alt="logo" />
                                        </a>
                                    </div>
                                    <div className="header__category">
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
                                    </div>
                                </div>
                            </div>

                            <div className="col-xxl-9 col-xl-9 col-lg-9 col-md-9 col-sm-9 col-8 ">
                                <div className="header__right d-flex justify-content-end align-items-center">
                                    <div className="main-menu">
                                        <nav id="mobile-menu" className='d-none d-md-none d-lg-block'>
                                            <ul>
                                                <li className="has-dropdown">
                                                    <a href="index.html">Home</a>
                                                    <ul className="submenu">
                                                        <li>
                                                            <a href="index.html">Home Style 1</a>
                                                        </li>
                                                        <li>
                                                            <a href="index-2.html">Home Style 2</a>
                                                        </li>
                                                        <li>
                                                            <a href="index-3.html">Home Style 3</a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className="has-dropdown">
                                                    <a href="course-grid.html">Courses</a>
                                                    <ul className="submenu">
                                                        <li>
                                                            <a href="course-grid.html">Courses</a>
                                                        </li>
                                                        <li>
                                                            <a href="course-list.html">Course List</a>
                                                        </li>
                                                        <li>
                                                            <a href="course-sidebar.html">Course sidebar</a>
                                                        </li>
                                                        <li>
                                                            <a href="course-details.html">Course Details</a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className="has-dropdown">
                                                    <a href="blog.html">Blog</a>
                                                    <ul className="submenu">
                                                        <li>
                                                            <a href="blog.html">Blog</a>
                                                        </li>
                                                        <li>
                                                            <a href="blog-details.html">Blog Details</a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className="has-dropdown">
                                                    <a href="course-grid.html">Pages</a>
                                                    <ul className="submenu">
                                                        <li>
                                                            <a href="about.html">About</a>
                                                        </li>
                                                        <li>
                                                            <a href="instructor.html">Instructor</a>
                                                        </li>
                                                        <li>
                                                            <a href="instructor-details.html">
                                                                Instructor Details
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="event-details.html">Event Details</a>
                                                        </li>
                                                        <li>
                                                            <a href="cart.html">My Cart</a>
                                                        </li>
                                                        <li>
                                                            <a href="wishlist.html">My Wishlist</a>
                                                        </li>
                                                        <li>
                                                            <a href="checkout.html">checkout</a>
                                                        </li>
                                                        <li>
                                                            <a href="sign-in.html">Sign In</a>
                                                        </li>
                                                        <li>
                                                            <a href="sign-up.html">Sign Up</a>
                                                        </li>
                                                        <li>
                                                            <a href="error.html">Error</a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <a href="contact.html">Contact</a>
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
                                        <a href="contact.html" className="e-btn">
                                            Try free
                                        </a>
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