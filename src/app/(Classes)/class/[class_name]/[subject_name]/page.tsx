'use client';

import { useEffect, useState } from 'react';
import { Class, Subject } from '@/types/add_types';
import { useParams } from 'next/navigation';
import axios from 'axios';
import DOMPurify from 'dompurify';
import ChapterAccordion from '@/components/accordion/ChapterAccordion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Skeleton } from "@/components/ui/skeleton";
import RazorpayButton from '@/components/pricing/RazorpayButton';

export default function Page() {
    const [price, setPrice] = useState<number | null>(null);
    const params = useParams();
    const router = useRouter();
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [loading, setLoading] = useState(true);

    const url_className = params.class_name as string;
    const class_name = (params.class_name as string).replace('-', ' ').toLowerCase();
    const subject_name = (params.subject_name as string).replace('-', ' ').toLowerCase();

    const [activeTab, setActiveTab] = useState("description");

    const [baseUrl, setBaseUrl] = useState('');
    const [chapters, setChapters] = useState<any[]>([]);
    const [SubjectDetail, setSubjectDetail] = useState<any>(null);

    // ✅ Fetch price when component mounts or `type` changes
    useEffect(() => {
        const fetchPrice = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_GET_PRICING}?type=subject`);
                setPrice(Number(res.data.price));
            } catch (err) {
                console.error('Failed to fetch price:', err);
            }
        };

        fetchPrice();
    }, [baseUrl]);

    useEffect(() => {
        setBaseUrl(window.location.origin);
    }, []);

    useEffect(() => {
        if (!baseUrl) return;

        const MASTER_CLASS = baseUrl + process.env.NEXT_PUBLIC_ADMIN_GET_MASTER_CLASS!;
        const ALL_SUBJECT = baseUrl + process.env.NEXT_PUBLIC_ADMIN_GET_ALL_SUBJECT!;
        const ALL_CHAPTER = baseUrl + process.env.NEXT_PUBLIC_ADMIN_GET_ALL_CHAPTER!;

        const fetchChaptersByNames = async () => {
            try {
                // Get all classes and subjects
                const [mc, s] = await Promise.all([
                    fetch(MASTER_CLASS).then((res) => res.json()),
                    fetch(ALL_SUBJECT).then((res) => res.json()),
                ]);

                // Match class by name
                const matchedClass = mc.find(
                    (cls: Class) => cls.class_name.toLowerCase().trim() === class_name
                );

                if (!matchedClass) {
                    console.warn('Class not found:', class_name);
                    router.push('/');
                    return;
                }

                // Match subject by name + class_id
                const matchedSubject = s.find(
                    (sub: Subject) =>
                        sub.subject_name.toLowerCase().trim() === subject_name &&
                        sub.class_id === (matchedClass._id || matchedClass.id)
                );

                if (!matchedSubject) {
                    console.warn('Subject not found:', subject_name);
                    router.push('/class/' + url_className);
                    return;
                }

                setSubjectDetail(matchedSubject);

                const class_id = matchedClass._id || matchedClass.id;
                const subject_id = matchedSubject._id || matchedSubject.id;

                // Fetch chapters using class_id and subject_id
                const res = await axios.get(ALL_CHAPTER, {
                    params: { class_id, subject_id },
                });

                setChapters(res.data);
                // console.log(res.data[0].video_url);
                setLoading(false);

            } catch (err) {
                console.error('Error fetching chapters:', err);
            }
        };

        fetchChaptersByNames();
    }, [baseUrl, class_name, subject_name]);


    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    const runVideo = (url: string) => {
        const videoId = url.split('/').pop();
        if (videoId) {
            setVideoUrl(`https://player.vimeo.com/video/${videoId}`);
        }
    };

    const closeModal = () => {
        setVideoUrl(null);
    };


    if (loading) {
        return (
            <main>
                <section className="page__title-area pt-120 pb-90">
                    <div className="container">
                        <div className="row">
                            <div className="col-xxl-8 col-xl-8 col-lg-8">
                                <div className="course__wrapper">
                                    <div className="page__title-content mb-25 space-y-3">
                                        <Skeleton className="w-1/2 h-5" />
                                        <Skeleton className="w-1/4 h-4" />
                                        <Skeleton className="w-2/3 h-6" />
                                    </div>

                                    <div className="course__meta-2 d-sm-flex mb-30 space-y-4">
                                        <Skeleton className="w-full h-16 rounded" />
                                    </div>

                                    <div className="course__img w-img mb-30">
                                        <Skeleton className="w-full h-[300px] rounded" />
                                    </div>

                                    <div className="course__tab-2 mb-5">
                                        <Skeleton className="w-full h-10 rounded" />
                                    </div>

                                    <div className="tab-content space-y-4">
                                        <Skeleton className="w-1/3 h-6" />
                                        <Skeleton className="w-full h-4" />
                                        <Skeleton className="w-full h-4" />
                                        <Skeleton className="w-4/5 h-4" />
                                    </div>
                                </div>
                            </div>

                            <div className="col-xxl-4 col-xl-4 col-lg-4">
                                <div className="course__sidebar pl-70 p-relative">
                                    <Skeleton className="w-full h-[250px] rounded mb-4" />
                                    <Skeleton className="w-1/2 h-6 mb-2" />
                                    <Skeleton className="w-1/2 h-4 mb-2" />
                                    <Skeleton className="w-full h-10 mb-2 rounded" />
                                    <Skeleton className="w-full h-10 mb-2 rounded" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        );
    }



    return (

        <main>
            {/* page title area start */}
            <section className="page__title-area pt-120 pb-90">

                <div className="container">
                    <div className="row">
                        <div className="col-xxl-8 col-xl-8 col-lg-8">
                            <div className="course__wrapper">
                                <div className="page__title-content mb-25">
                                    <div className="page__title-breadcrumb flex items-center mb-4 text-sm">
                                        <Link href={'/'}> Home </Link>
                                        <i className="fa fa-circle text-[3px] mx-2 text-gray-800"></i>
                                        <Link href={`/class/${url_className}`}> Class {class_name} </Link>

                                    </div>
                                    <span className="page__title-pre">Class {class_name}</span>
                                    <h5 className="page__title-3 text-capitalize"> {subject_name} </h5>
                                </div>

                                <div className="course__meta-2 d-sm-flex mb-30">
                                    <div className="course__teacher-3 d-flex align-items-center mr-70 mb-30">
                                        <div className="course__teacher-thumb-3 mr-15">
                                            <img src="/assets/common/logo.jpg" alt="" />
                                        </div>
                                        <div className="course__teacher-info-3">
                                            <h5>Created by</h5>
                                            <p>Courseworld</p>
                                        </div>
                                    </div>

                                    <div className="course__teacher-3 d-flex align-items-center mr-70 mb-30">
                                        <div className="course__teacher-thumb-3 mr-15">
                                        </div>
                                        <div className="course__teacher-info-3">
                                            <h5>Last Update:</h5>
                                            <p>July 24, 2022</p>
                                        </div>
                                    </div>

                                    <div className="course__teacher-3 d-flex align-items-center mr-70">
                                        <div className="course__teacher-thumb-3 mr-15">
                                        </div>
                                        <div className="course__teacher-info-3">
                                            <h5>Review:</h5>
                                            <p>
                                                <i className='fa fa-star text-orange-500 text-xs' ></i>
                                                <i className='fa fa-star text-orange-500 text-xs' ></i>
                                                <i className='fa fa-star text-orange-500 text-xs' ></i>
                                                <i className='fa fa-star text-orange-500 text-xs' ></i>
                                                <i className='fa fa-star text-orange-500 text-xs' ></i>
                                            </p>
                                        </div>
                                    </div>

                                </div>

                                <div className="course__img w-img mb-30">
                                    <img
                                        src="assets/img/course/details/course-details-1.jpg"
                                        alt=""
                                    />
                                </div>

                                <div className="course__tab-2 mb-5">
                                    <ul className="nav nav-tabs" role="tablist">
                                        {[
                                            { id: "description", icon: "icon_ribbon_alt", label: "Description" },
                                            { id: "curriculum", icon: "icon_book_alt", label: "Curriculum" },
                                            { id: "review", icon: "icon_star_alt", label: "Reviews" },
                                            { id: "member", icon: "fal fa-user", label: "Members" },
                                        ].map((tab) => (
                                            <li className="nav-item" role="presentation" key={tab.id}>
                                                <button
                                                    className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
                                                    type="button"
                                                    role="tab"
                                                    onClick={() => handleTabClick(tab.id)}
                                                >
                                                    <i className={tab.icon} /> <span>{tab.label}</span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Tab Contents */}
                                <div className="tab-content">
                                    <div className={`tab-pane ${activeTab === "description" ? "block" : "hidden"}`} id="description">
                                        <div className="tab-content tab-box" id="courseTabContent">
                                            <div
                                                className="tab-pane  show active"
                                                id="description"
                                                role="tabpanel"
                                                aria-labelledby="description-tab"
                                            >
                                                <div className="course__description">
                                                    <h3>Course Overview</h3>
                                                    <p
                                                        className="text-gray-700 p-0" style={{ fontSize: "16px" }}
                                                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(SubjectDetail?.overview || '') }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`tab-pane ${activeTab === "curriculum" ? "block" : "hidden"}`} id="curriculum">
                                        <div className="course__curriculum">
                                            {
                                                chapters.length ?
                                                    chapters.map((chapterData, index) => (
                                                        <ChapterAccordion chapterData={chapterData} key={chapterData?._id} chapterIndex={index + 1} />
                                                    )) : null
                                            }
                                        </div>
                                    </div>
                                    <div className={`tab-pane ${activeTab === "review" ? "block" : "hidden"}`} id="review">
                                        <div className="course__review">
                                            <h3>Ratings</h3>
                                            <p>
                                                Gosh william I'm telling crikey burke I don't want no agro A bit of how's
                                                your father bugger all mate off his nut that, what a plonker cuppa owt to
                                                do
                                            </p>
                                            <div className="course__review-rating mb-50">
                                                <div className="row g-0">
                                                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4">
                                                        <div className="course__review-rating-info grey-bg text-center">
                                                            <h5>5</h5>
                                                            <ul>
                                                                <li>
                                                                    <a href="#">
                                                                        {" "}
                                                                        <i className="icon_star" />{" "}
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#">
                                                                        {" "}
                                                                        <i className="icon_star" />{" "}
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#">
                                                                        {" "}
                                                                        <i className="icon_star" />{" "}
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#">
                                                                        {" "}
                                                                        <i className="icon_star" />{" "}
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#">
                                                                        {" "}
                                                                        <i className="icon_star" />{" "}
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                            <p>4 Ratings</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-8">
                                                        <div className="course__review-details grey-bg">
                                                            <h5>Detailed Rating</h5>
                                                            <div className="course__review-content mb-20">
                                                                <div className="course__review-item d-flex align-items-center justify-content-between">
                                                                    <div className="course__review-text">
                                                                        <span>5 stars</span>
                                                                    </div>
                                                                    <div className="course__review-progress">
                                                                        <div
                                                                            className="single-progress"
                                                                            data-width="100%"
                                                                            style={{ width: "100%" }}
                                                                        />
                                                                    </div>
                                                                    <div className="course__review-percent">
                                                                        <h5>100%</h5>
                                                                    </div>
                                                                </div>
                                                                <div className="course__review-item d-flex align-items-center justify-content-between">
                                                                    <div className="course__review-text">
                                                                        <span>4 stars</span>
                                                                    </div>
                                                                    <div className="course__review-progress">
                                                                        <div
                                                                            className="single-progress"
                                                                            data-width="30%"
                                                                            style={{ width: "30%" }}
                                                                        />
                                                                    </div>
                                                                    <div className="course__review-percent">
                                                                        <h5>30%</h5>
                                                                    </div>
                                                                </div>
                                                                <div className="course__review-item d-flex align-items-center justify-content-between">
                                                                    <div className="course__review-text">
                                                                        <span>3 stars</span>
                                                                    </div>
                                                                    <div className="course__review-progress">
                                                                        <div
                                                                            className="single-progress"
                                                                            data-width="0%"
                                                                            style={{ width: "0%" }}
                                                                        />
                                                                    </div>
                                                                    <div className="course__review-percent">
                                                                        <h5>0%</h5>
                                                                    </div>
                                                                </div>
                                                                <div className="course__review-item d-flex align-items-center justify-content-between">
                                                                    <div className="course__review-text">
                                                                        <span>2 stars</span>
                                                                    </div>
                                                                    <div className="course__review-progress">
                                                                        <div
                                                                            className="single-progress"
                                                                            data-width="0%"
                                                                            style={{ width: "0%" }}
                                                                        />
                                                                    </div>
                                                                    <div className="course__review-percent">
                                                                        <h5>0%</h5>
                                                                    </div>
                                                                </div>
                                                                <div className="course__review-item d-flex align-items-center justify-content-between">
                                                                    <div className="course__review-text">
                                                                        <span>1 stars</span>
                                                                    </div>
                                                                    <div className="course__review-progress">
                                                                        <div
                                                                            className="single-progress"
                                                                            data-width="0%"
                                                                            style={{ width: "0%" }}
                                                                        />
                                                                    </div>
                                                                    <div className="course__review-percent">
                                                                        <h5>0%</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`tab-pane ${activeTab === "member" ? "block" : "hidden"}`} id="member">
                                        <h4 className="text-lg font-semibold mb-2">Members</h4>
                                        <p>This is the members list.</p>
                                    </div>
                                </div>

                                <div className="tab-pane tab-pane3 course__share mt-5 flex items-center ">
                                    <h3>Share :</h3>
                                    <ul>
                                        <li>
                                            <a href="#" className="fb">
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


                        <div className="col-xxl-4 col-xl-4 col-lg-4">
                            <div className="course__sidebar pl-70 p-relative">

                                <div className="course__shape">
                                    <img
                                        className="course-dot"
                                        src="assets/img/course/course-dot.png"
                                        alt=""
                                    />
                                </div>

                                <div className="course__sidebar-widget-2 white-bg mb-20">
                                    <div className="course__video">

                                        <div onClick={() => { runVideo(chapters[0].video_url as string) }} className="col-12 mb-4
                                         bg-black rounded py-5 flex justify-center items-center cursor-pointer">
                                            <img src="/assets/common/playBtn.png" alt="" className='hover:scale-150  ' width={'50px'} />
                                        </div>

                                        <div className="course__video-meta mb-25 d-flex align-items-center justify-content-between">
                                            <div className="course__video-price">
                                                <h5>
                                                    &#8377; {price}<span></span>{" "}
                                                </h5>
                                                <h5 className="old-price">{price}.00</h5>
                                            </div>
                                            <div className="course__video-discount">
                                                <span>68% OFF</span>
                                            </div>
                                        </div>
                                        <div className="course__video-content mb-35">
                                            <ul className='p-0'>
                                                <li className="d-flex align-items-center">
                                                    <div className="course__video-icon">
                                                        <svg
                                                            version="1.1"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                                            x="0px"
                                                            y="0px"
                                                            viewBox="0 0 24 24"
                                                            xmlSpace="preserve"
                                                        >
                                                            <path
                                                                className="st0"
                                                                d="M4,19.5C4,18.1,5.1,17,6.5,17H20"
                                                            />
                                                            <path
                                                                className="st0"
                                                                d="M6.5,2H20v20H6.5C5.1,22,4,20.9,4,19.5v-15C4,3.1,5.1,2,6.5,2z"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <div className="course__video-info">
                                                        <h5>
                                                            <span>Chapters :</span>14
                                                        </h5>
                                                    </div>
                                                </li>
                                                <li className="d-flex align-items-center">
                                                    <div className="course__video-icon">
                                                        <svg>
                                                            <path
                                                                className="st0"
                                                                d="M13.3,14v-1.3c0-1.5-1.2-2.7-2.7-2.7H5.3c-1.5,0-2.7,1.2-2.7,2.7V14"
                                                            />
                                                            <circle className="st0" cx={8} cy="4.7" r="2.7" />
                                                        </svg>
                                                    </div>
                                                    <div className="course__video-info">
                                                        <h5>
                                                            <span>Enrolled :</span>20 students
                                                        </h5>
                                                    </div>
                                                </li>
                                                {/* <li className="d-flex align-items-center">
                                                    <div className="course__video-icon">
                                                        <svg>
                                                            <circle className="st0" cx={8} cy={8} r="6.7" />
                                                            <line
                                                                className="st0"
                                                                x1="1.3"
                                                                y1={8}
                                                                x2="14.7"
                                                                y2={8}
                                                            />
                                                            <path
                                                                className="st0"
                                                                d="M8,1.3c1.7,1.8,2.6,4.2,2.7,6.7c-0.1,2.5-1,4.8-2.7,6.7C6.3,12.8,5.4,10.5,5.3,8C5.4,5.5,6.3,3.2,8,1.3z"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <div className="course__video-info">
                                                        <h5>
                                                            <span>Language :</span>English
                                                        </h5>
                                                    </div>
                                                </li> */}
                                            </ul>
                                        </div>



                                        <div className="course__enroll-btn mb-2 text-center">
                                            {/* <Link href={`enroll?class_id=${SubjectDetail?._id}`} className="e-btn2 e-btn-7 w-100">
                                                Get All Subjects <i className="far fa-arrow-right" />
                                            </Link> */}
                                            <RazorpayButton
                                                class_name={class_name}
                                                subject_name={subject_name}
                                                type="class"
                                                price={price || 0}
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>


            {/* Video Modal */}
            {videoUrl && (
                <div
                    className="fixed inset-0 z-[1000] flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
                    onClick={closeModal}
                >
                    <div
                        className="relative w-full max-w-6xl aspect-video"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Spinner while loading */}
                        {!videoLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 z-10">
                                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white" />
                            </div>
                        )}

                        <iframe
                            src={videoUrl}
                            title="Vimeo Video"
                            className="w-full h-full rounded-lg"
                            allow="autoplay; fullscreen"
                            allowFullScreen
                            onLoad={() => setVideoLoaded(true)}
                        ></iframe>
                        <button
                            onClick={closeModal}
                            className="absolute top-m20 right-m4  text-white bg-red-500 hover:bg-red-600 p-1 px-2 rounded"
                        > ✕ </button>
                    </div>

                </div>
            )}

        </main>


    )
}
