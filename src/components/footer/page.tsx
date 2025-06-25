'use client'

import React, { useState, useEffect } from 'react'
import { Class, Subject } from '@/types/add_types';
import Link from 'next/link';

const Footer = () => {


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

        // console.log(ms);

    };

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading for 2 seconds
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);


    if (loading) {
        return (
            <footer style={{ height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f1f1f1' }}>
                <p>Loading footer...</p>
            </footer>
        );
    } else {
        return (
            <>
                {/* cta area start */}
                <section className="cta__area mb--120">
                    <div className="container">
                        <div className="cta__inner blue-bg fix">
                            <div className="cta__shape">
                                {/* <img src="/img/cta/cta-shape.png" alt="" /> */}
                            </div>
                            <div className="row align-items-center">
                                <div className="col-xxl-7 col-xl-7 col-lg-8 col-md-8">
                                    <div className="cta__content">
                                        <h3 className="cta__title">
                                            You can be your own Guiding star with our help
                                        </h3>
                                    </div>
                                </div>
                                <div className="col-xxl-5 col-xl-5 col-lg-4 col-md-4">
                                    <div className="cta__more d-md-flex justify-content-end p-relative z-index-1">
                                        <a href="contact.html" className="e-btn e-btn-white">
                                            Get Started
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* cta area end */}

                {/* footer area start */}
                <footer>
                    <div className="footer__area footer-bg">
                        <div className="footer__top pt-150  pb-40">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6">
                                        <div className="footer__widget mb-50">
                                            <div className="footer__widget-head mb-22">
                                                <div className="footer__logo">
                                                    <a href="index.html">
                                                        <img src="/assets/common/logo4.jpg" alt="logo" style={{ width: "300px" }} />
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="footer__widget-body">
                                                <p>
                                                    Learn. Practice. Succeed.
                                                </p>
                                                <div className="footer__social">
                                                    <ul>
                                                        <li>
                                                            <a href="#">
                                                                <i className="social_facebook" />
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="tw">
                                                                <i className="social_twitter" />
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="pin">
                                                                <i className="social_pinterest" />
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xxl-2 offset-xxl-1 col-xl-2 offset-xl-1 col-lg-3 offset-lg-0 col-md-2 offset-md-1 col-sm-5 offset-sm-1">
                                        <div className="footer__widget mb-50">
                                            <div className="footer__widget-head mb-22">
                                                <h3 className="footer__widget-title">Classes</h3>
                                            </div>
                                            <div className="footer__widget-body">
                                                <div className="footer__link">
                                                    <ul className='p-0'>

                                                        {
                                                            MasterClass.length ? (
                                                                MasterClass.map((cls: any, index: number) => (
                                                                    <li key={index}>
                                                                        <Link className='text-capitalize' href={`/class/${cls.class_name}`}>Class {cls.class_name}  </Link>
                                                                    </li>
                                                                ))
                                                            ) : null
                                                        }

                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xxl-2 col-xl-2 col-lg-2 offset-lg-0 col-md-3 offset-md-1 col-sm-6">
                                        <div className="footer__widget mb-50">
                                            <div className="footer__widget-head mb-22">
                                                <h3 className="footer__widget-title">Subjects</h3>
                                            </div>
                                            <div className="footer__widget-body">
                                                <div className="footer__link">
                                                    <ul className='p-0'>

                                                        {
                                                            MasterSubject.length ? (
                                                                MasterSubject.map((sub: any, index: number) => (
                                                                    <li>
                                                                        <Link className='text-capitalize' href={`/subject/${sub.subject_name.replace(' ', '-').toLowerCase()}`}>{sub.subject_name}</Link>
                                                                    </li>
                                                                ))
                                                            ) : null
                                                        }

                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-5 col-sm-6">
                                        <div className="footer__widget footer__pl-70 mb-50">
                                            <div className="footer__widget-head mb-22">
                                                <h3 className="footer__widget-title">Subscribe</h3>
                                            </div>
                                            <div className="footer__widget-body">
                                                <div className="footer__subscribe">
                                                    <form action="#">
                                                        <div className="footer__subscribe-input mb-15">
                                                            <input type="email" placeholder="Your email address" />
                                                            <button type="submit">
                                                                <i className="far fa-arrow-right" />
                                                                <i className="far fa-arrow-right" />
                                                            </button>
                                                        </div>
                                                    </form>
                                                    <p>Unlock Smart Learning – Subscribe Today</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="footer__bottom">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xxl-12">
                                        <div className="footer__copyright text-center">
                                            <p>© 2025 Courseworld, All Rights Reserved. Developed By Pankajsharma </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
                {/* footer area end */}
            </>

        )
    }


}

export default Footer