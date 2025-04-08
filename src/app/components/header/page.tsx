import React from 'react'
import ThemeToggle from '../ThemeToggle'

const Header = () => {
    return (
        <>
            <header>
                <div
                    id="header-sticky"
                    className="w-full z-50 top-0 left-0 bg-white shadow-md fixed"
                >
                    <div className="max-w-[90rem] mx-auto px-4">
                        <div className="flex items-center justify-between flex-wrap py-4">
                            {/* Left section */}
                            <div className="flex items-center space-x-6 w-1/2 md:w-auto">
                                {/* Logo */}
                                <div className="shrink-0">
                                    <a href="index.html">
                                        <img src="assets/img/logo/logo.png" alt="logo" className="h-8" />
                                    </a>
                                </div>
                                {/* Category menu (Desktop only) */}
                                <div className="relative pl-8 ml-8 pt-1 hidden lg:block">
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-10 bg-gray-300" />
                                    <nav>
                                        <ul>
                                            <li className="relative group">
                                                <a
                                                    href="course-grid.html"
                                                    className="flex items-center text-gray-800 hover:text-indigo-600 transition"
                                                >
                                                    <div className="mr-2">
                                                        {/* SVG Dot Icon */}
                                                        <svg
                                                            className="w-5 h-5 fill-current text-gray-800 group-hover:text-indigo-600"
                                                            viewBox="0 0 276.2 276.2"
                                                        >
                                                            {/* Omitted paths for brevity, but you can paste them here */}
                                                        </svg>
                                                    </div>
                                                    <span className="font-medium">Category</span>
                                                </a>
                                                {/* Submenu */}
                                                <ul className="absolute top-full mt-6 left-0 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                                    <li>
                                                        <a
                                                            href="course-details.html"
                                                            className="block px-6 py-2 text-sm text-gray-700 hover:text-indigo-600"
                                                        >
                                                            English Learning
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="course-details.html"
                                                            className="block px-6 py-2 text-sm text-gray-700 hover:text-indigo-600"
                                                        >
                                                            Web Development
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="course-details.html"
                                                            className="block px-6 py-2 text-sm text-gray-700 hover:text-indigo-600"
                                                        >
                                                            Logo Design
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="course-details.html"
                                                            className="block px-6 py-2 text-sm text-gray-700 hover:text-indigo-600"
                                                        >
                                                            Motion Graphics
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="course-details.html"
                                                            className="block px-6 py-2 text-sm text-gray-700 hover:text-indigo-600"
                                                        >
                                                            Video Edition
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            {/* Right section */}
                            <div className="flex items-center justify-end space-x-4 w-1/2 md:w-auto">
                                {/* Navigation Menu */}
                                <nav className="hidden lg:block">
                                    <ul className="flex space-x-6 text-sm font-medium text-gray-800">
                                        <li className="relative group">
                                            <a href="index.html" className="hover:text-indigo-600">
                                                Home
                                            </a>
                                            <ul className="absolute top-full mt-2 left-0 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                                <li>
                                                    <a
                                                        href="index.html"
                                                        className="block px-6 py-2 hover:text-indigo-600"
                                                    >
                                                        Home Style 1
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="index-2.html"
                                                        className="block px-6 py-2 hover:text-indigo-600"
                                                    >
                                                        Home Style 2
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="index-3.html"
                                                        className="block px-6 py-2 hover:text-indigo-600"
                                                    >
                                                        Home Style 3
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="relative group">
                                            <a href="course-grid.html" className="hover:text-indigo-600">
                                                Courses
                                            </a>
                                            <ul className="absolute top-full mt-2 left-0 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                                <li>
                                                    <a
                                                        href="course-grid.html"
                                                        className="block px-6 py-2 hover:text-indigo-600"
                                                    >
                                                        Courses
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="course-list.html"
                                                        className="block px-6 py-2 hover:text-indigo-600"
                                                    >
                                                        Course List
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="course-sidebar.html"
                                                        className="block px-6 py-2 hover:text-indigo-600"
                                                    >
                                                        Course Sidebar
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="course-details.html"
                                                        className="block px-6 py-2 hover:text-indigo-600"
                                                    >
                                                        Course Details
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="relative group">
                                            <a href="blog.html" className="hover:text-indigo-600">
                                                Blog
                                            </a>
                                            <ul className="absolute top-full mt-2 left-0 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                                <li>
                                                    <a
                                                        href="blog.html"
                                                        className="block px-6 py-2 hover:text-indigo-600"
                                                    >
                                                        Blog
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="blog-details.html"
                                                        className="block px-6 py-2 hover:text-indigo-600"
                                                    >
                                                        Blog Details
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="relative group">
                                            <a href="#" className="hover:text-indigo-600">
                                                Pages
                                            </a>
                                            <ul className="absolute top-full mt-2 left-0 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                                <li>
                                                    <a
                                                        href="about.html"
                                                        className="block px-6 py-2 hover:text-indigo-600"
                                                    >
                                                        About
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="instructor.html"
                                                        className="block px-6 py-2 hover:text-indigo-600"
                                                    >
                                                        Instructor
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="event-details.html"
                                                        className="block px-6 py-2 hover:text-indigo-600"
                                                    >
                                                        Event Details
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="cart.html"
                                                        className="block px-6 py-2 hover:text-indigo-600"
                                                    >
                                                        My Cart
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="wishlist.html"
                                                        className="block px-6 py-2 hover:text-indigo-600"
                                                    >
                                                        My Wishlist
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="checkout.html"
                                                        className="block px-6 py-2 hover:text-indigo-600"
                                                    >
                                                        Checkout
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="sign-in.html"
                                                        className="block px-6 py-2 hover:text-indigo-600"
                                                    >
                                                        Sign In
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="sign-up.html"
                                                        className="block px-6 py-2 hover:text-indigo-600"
                                                    >
                                                        Sign Up
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="error.html"
                                                        className="block px-6 py-2 hover:text-indigo-600"
                                                    >
                                                        Error
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="contact.html" className="hover:text-indigo-600">
                                                Contact
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                                {/* Search & Cart */}
                                <div className="hidden md:flex items-center space-x-4">
                                    <form action="#" className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            className="px-4 py-2 rounded-full bg-gray-100 text-sm outline-none"
                                        />
                                        <button
                                            type="submit"
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                        >
                                            <i className="fas fa-search" />
                                        </button>
                                    </form>
                                    {/* Cart */}
                                    <div className="relative">
                                        <a href="#" className="relative">
                                            <svg className="w-6 h-6 text-gray-800" viewBox="0 0 24 24">
                                                <circle cx={9} cy={21} r={1} />
                                                <circle cx={20} cy={21} r={1} />
                                                <path d="M1,1h4l2.7,13.4c0.2,1,1,1.6,2,1.6h9.7c1,0,1.8-0.7,2-1.6L23,6H6" />
                                            </svg>
                                            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                                                2
                                            </span>
                                        </a>
                                    </div>
                                </div>
                                {/* Try Button */}
                                <div className="hidden sm:block">
                                    <ThemeToggle />
                                </div>
                                {/* Mobile Toggle */}
                                <div className="lg:hidden ml-4 cursor-pointer" id="sidebar-toggle">
                                    <div className="space-y-1">
                                        <span className="block w-6 h-0.5 bg-gray-800" />
                                        <span className="block w-6 h-0.5 bg-gray-800" />
                                        <span className="block w-6 h-0.5 bg-gray-800" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

        </>
    )
}

export default Header