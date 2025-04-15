'use client'

import React, { useEffect, useState } from 'react'
import Preloader from '../preloader/Preloader'
import Sidebar from '../sidebar/Sidebar'
import Link from 'next/link'

const Header = () => {

    const [showPreloader, setShowPreloader] = useState(false);
    const [sidebarOpened, setsidebarOpened] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

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

            <>
                {/* header area start */}
                <header>
                    <div
                        id="header-sticky"
                        className="header__area header__padding-2 header__shadow"
                    >
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-2 col-sm-4 col-6">
                                    <div className="header__left d-flex">
                                        <div className="logo">
                                            <a href="index.html">
                                                <img src="/img/logo/logo.png" alt="logo" />
                                            </a>
                                        </div>
                                        <div className="header__category d-none d-lg-block">
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
                                <div className="col-xxl-9 col-xl-9 col-lg-8 col-md-10 col-sm-8 col-6">
                                    <div className="header__right d-flex justify-content-end align-items-center">
                                        <div className="main-menu main-menu-2">
                                            <nav id="mobile-menu">
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
                                        <div className="header__btn header__btn-2 ml-50 d-none d-sm-block">
                                            <a href="sign-up.html" className="e-btn">
                                                Sign up
                                            </a>
                                        </div>
                                        <div className="sidebar__menu d-xl-none">
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
                {/* cart mini area start */}
                <div className="cartmini__area">
                    <div className="cartmini__wrapper">
                        <div className="cartmini__title">
                            <h4>Shopping cart</h4>
                        </div>
                        <div className="cartmini__close">
                            <button type="button" className="cartmini__close-btn">
                                <i className="fal fa-times" />
                            </button>
                        </div>
                        <div className="cartmini__widget">
                            <div className="cartmini__inner">
                                <ul>
                                    <li>
                                        <div className="cartmini__thumb">
                                            <a href="#">
                                                <img src="/img/course/sm/cart-1.jpg" alt="" />
                                            </a>
                                        </div>
                                        <div className="cartmini__content">
                                            <h5>
                                                <a href="#">Strategy law and organization Foundation </a>
                                            </h5>
                                            <div className="product-quantity mt-10 mb-10">
                                                <span className="cart-minus">-</span>
                                                <input className="cart-input" type="text" defaultValue={1} />
                                                <span className="cart-plus">+</span>
                                            </div>
                                            <div className="product__sm-price-wrapper">
                                                <span className="product__sm-price">$46.00</span>
                                            </div>
                                        </div>
                                        <a href="#" className="cartmini__del">
                                            <i className="fal fa-times" />
                                        </a>
                                    </li>
                                    <li>
                                        <div className="cartmini__thumb">
                                            <a href="#">
                                                <img src="/img/course/sm/cart-2.jpg" alt="" />
                                            </a>
                                        </div>
                                        <div className="cartmini__content">
                                            <h5>
                                                <a href="#">Fundamentals of music theory Learn new</a>
                                            </h5>
                                            <div className="product-quantity mt-10 mb-10">
                                                <span className="cart-minus">-</span>
                                                <input className="cart-input" type="text" defaultValue={1} />
                                                <span className="cart-plus">+</span>
                                            </div>
                                            <div className="product__sm-price-wrapper">
                                                <span className="product__sm-price">$32.00</span>
                                            </div>
                                        </div>
                                        <a href="#" className="cartmini__del">
                                            <i className="fal fa-times" />
                                        </a>
                                    </li>
                                    <li>
                                        <div className="cartmini__thumb">
                                            <a href="#">
                                                <img src="/img/course/sm/cart-3.jpg" alt="" />
                                            </a>
                                        </div>
                                        <div className="cartmini__content">
                                            <h5>
                                                <a href="#">Strategy law and organization Foundation </a>
                                            </h5>
                                            <div className="product-quantity mt-10 mb-10">
                                                <span className="cart-minus">-</span>
                                                <input className="cart-input" type="text" defaultValue={1} />
                                                <span className="cart-plus">+</span>
                                            </div>
                                            <div className="product__sm-price-wrapper">
                                                <span className="product__sm-price">$62.00</span>
                                            </div>
                                        </div>
                                        <a href="#" className="cartmini__del">
                                            <i className="fal fa-times" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="cartmini__checkout">
                                <div className="cartmini__checkout-title mb-30">
                                    <h4>Subtotal:</h4>
                                    <span>$113.00</span>
                                </div>
                                <div className="cartmini__checkout-btn">
                                    <a href="cart.html" className="e-btn e-btn-border mb-10 w-100">
                                        {" "}
                                        <span /> view cart
                                    </a>
                                    <a href="checkout.html" className="e-btn w-100">
                                        {" "}
                                        <span /> checkout
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="body-overlay" />
                {/* cart mini area end */}
                {/* sidebar area start */}
                <div className="sidebar__area">
                    <div className="sidebar__wrapper">
                        <div className="sidebar__close">
                            <button className="sidebar__close-btn" id="sidebar__close-btn">
                                <span>
                                    <i className="fal fa-times" />
                                </span>
                                <span>close</span>
                            </button>
                        </div>
                        <div className="sidebar__content">
                            <div className="logo mb-40">
                                <a href="index.html">
                                    <img src="/img/logo/logo.png" alt="logo" />
                                </a>
                            </div>
                            <div className="mobile-menu fix" />
                            <div className="sidebar__search p-relative mt-40 ">
                                <form action="#">
                                    <input type="text" placeholder="Search..." />
                                    <button type="submit">
                                        <i className="fad fa-search" />
                                    </button>
                                </form>
                            </div>
                            <div className="sidebar__cart mt-30">
                                <a href="#">
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
                    </div>
                </div>
                {/* sidebar area end */}
                <div className="body-overlay" />
                {/* sidebar area end */}
            </>

        </>
    )
}

export default Header