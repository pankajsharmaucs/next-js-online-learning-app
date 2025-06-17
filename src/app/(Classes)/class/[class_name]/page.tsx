'use client';

import { useEffect, useState } from 'react';
import PageBreadcrumb from "@/components/PageBreadcrumb";
import { Class, Subject } from '@/types/add_types';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';


export default function Page() {
    const params = useParams();
    const class_name = params.class_name as string;
    const class_name_trim = class_name.replace('-', ' ').toLowerCase();

    const [baseUrl, setBaseUrl] = useState('');
    const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);

    const ALL_CHAPTER = baseUrl + process.env.NEXT_PUBLIC_ADMIN_GET_ALL_CHAPTER!;
    const [chapterCounts, setChapterCounts] = useState<Record<string, number>>({});

    useEffect(() => {
        setBaseUrl(window.location.origin);
    }, []);

    useEffect(() => {
        if (!baseUrl) return;

        const MASTER_CLASS = baseUrl + process.env.NEXT_PUBLIC_ADMIN_GET_MASTER_CLASS!;
        const ALL_SUBJECT = baseUrl + process.env.NEXT_PUBLIC_ADMIN_GET_ALL_SUBJECT!;

        const fetchAll = async () => {
            try {
                const [mc, s] = await Promise.all([
                    fetch(MASTER_CLASS).then((res) => res.json()),
                    fetch(ALL_SUBJECT).then((res) => res.json()),
                ]);

                const matchedClass = mc.find(
                    (cls: Class) =>
                        cls.class_name.toLowerCase().trim() === class_name_trim
                );

                if (!matchedClass) {
                    console.warn('Class not found for name:', class_name_trim);
                    return;
                }

                const class_id = matchedClass._id || matchedClass.id;

                const relatedSubjects = s
                    .filter((sub: Subject) => sub.class_id === class_id)
                    .map((sub: Subject) => ({
                        ...sub,
                        class_name: matchedClass.class_name, // Add class_name to each subject
                    }));

                console.log(relatedSubjects);

                setFilteredSubjects(relatedSubjects);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchAll();
    }, [baseUrl, class_name_trim]);


    const getChapterCount = async (class_id: string, subject_id: string): Promise<number> => {
        try {
            const res = await axios.get(ALL_CHAPTER, {
                params: { class_id, subject_id },
            });
            return res.data.length;
        } catch (error) {
            console.error(`Failed to fetch chapters for class_id=${class_id}, subject_id=${subject_id}`, error);
            return 0;
        }
    };


    useEffect(() => {
        const fetchChapterCounts = async () => {
            if (!baseUrl || filteredSubjects.length === 0) return;

            const counts: Record<string, number> = {};

            for (const subject of filteredSubjects) {
                if (subject._id && subject.class_id) {
                    const count = await getChapterCount(subject.class_id, subject._id);
                    counts[subject._id] = count;
                }
            }

            setChapterCounts(counts);
        };

        fetchChapterCounts();
    }, [filteredSubjects, baseUrl]);

    return (
        <main>
            {/* page title area start */}
            <section
                className="page__title-area page__title-height page__title-overlay d-flex align-items-center"
                style={{
                    backgroundImage: `url("/assets/common/class_bg.jpg")`,
                    backgroundSize: 'cover', // optional
                    backgroundPosition: 'center', // optional
                }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-12">
                            <div className="page__title-wrapper mt-110">
                                <h3 className="page__title text-capitalize">Class {class_name_trim} </h3>
                                <PageBreadcrumb homeLabel="Home" homeHref="/" pageName={`All Subjects`} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* page title area end */}
            {/* course area start */}
            <section className="course__area pt-120 pb-120">
                <div className="container">

                    <div className="row">
                        <div className="col-xxl-12">
                            <div className="course__tab-conent">
                                <div className="tab-content" id="courseTabContent">
                                    <div
                                        className="tab-pane fade show active"
                                        id="grid"
                                        role="tabpanel"
                                        aria-labelledby="grid-tab"
                                    >
                                        <div className="row">
                                            {filteredSubjects && filteredSubjects.length > 0 ?
                                                (
                                                    filteredSubjects.map((subject, index) => {

                                                        const class_name_slug = class_name.replace(' ', '-').toString()
                                                        const subject_name_slug = subject?.subject_name.replace(' ', '-').toString()

                                                        return (
                                                            <div key={index} className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                                                                <div className="course__item white-bg mb-30 fix">
                                                                    <div className="course__thumb w-img p-relative fix">
                                                                        <img src={`${subject?.image}`} alt="" />
                                                                    </div>
                                                                    <div className="course__content">
                                                                        <div className="course__meta d-flex align-items-center justify-content-between">
                                                                            <div className="course__lesson">
                                                                                <span>
                                                                                    <i className="far fa-book-alt" />{' '}
                                                                                    Total Chapters {subject._id ? chapterCounts[subject._id] ?? '...' : '...'}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <h1 className="course__title text-capitalize">
                                                                            {subject?.subject_name}
                                                                        </h1>

                                                                    </div>
                                                                    <div className="course__more d-flex justify-content-between align-items-center">
                                                                        <div className="course__status">
                                                                            <span>Explore</span>
                                                                        </div>
                                                                        <div className="course__btn">
                                                                            <Link href={`${class_name_slug}/${subject_name_slug}`} className="link-btn">
                                                                                Know Details <i className="far fa-arrow-right" />
                                                                                <i className="far fa-arrow-right" />
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                ) : (
                                                    <p>No subjects found.</p>
                                                )}
                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="list"
                                        role="tabpanel"
                                        aria-labelledby="list-tab"
                                    >
                                        <div className="row">
                                            <div className="col-xxl-12">
                                                <div className="course__item white-bg mb-30 fix">
                                                    <div className="row gx-0">
                                                        <div className="col-xxl-4 col-xl-4 col-lg-4">
                                                            <div className="course__thumb course__thumb-list w-img p-relative fix">
                                                                <a href="course-details.html">
                                                                    <img
                                                                        src="/img/course/list/course-1.jpg"
                                                                        alt=""
                                                                    />
                                                                </a>
                                                                <div className="course__tag">
                                                                    <a href="#">Art &amp; Design</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-8 col-xl-8 col-lg-8">
                                                            <div className="course__right">
                                                                <div className="course__content course__content-3">
                                                                    <div className="course__meta d-flex align-items-center">
                                                                        <div className="course__lesson mr-20">
                                                                            <span>
                                                                                <i className="far fa-book-alt" />
                                                                                43 Lesson
                                                                            </span>
                                                                        </div>
                                                                        <div className="course__rating">
                                                                            <span>
                                                                                <i className="icon_star" />
                                                                                4.5 (44)
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <h3 className="course__title course__title-3">
                                                                        <a href="course-details.html">
                                                                            Become a product Manager learn the skills
                                                                            &amp; job.
                                                                        </a>
                                                                    </h3>
                                                                    <div className="course__summary">
                                                                        <p>
                                                                            Communia virtutes tutiorem declarat stoicorum
                                                                            sanabat oblivisci nostris tamquam iucunditatem
                                                                        </p>
                                                                    </div>
                                                                    <div className="course__teacher d-flex align-items-center">
                                                                        <div className="course__teacher-thumb mr-15">
                                                                            <img
                                                                                src="/img/course/teacher/teacher-1.jpg"
                                                                                alt=""
                                                                            />
                                                                        </div>
                                                                        <h6>
                                                                            <a href="instructor-details.html">
                                                                                Jim Séchen
                                                                            </a>
                                                                        </h6>
                                                                    </div>
                                                                </div>
                                                                <div className="course__more course__more-2 d-flex justify-content-between align-items-center">
                                                                    <div className="course__status">
                                                                        <span>Free</span>
                                                                    </div>
                                                                    <div className="course__btn">
                                                                        <a
                                                                            href="course-details.html"
                                                                            className="link-btn"
                                                                        >
                                                                            Know Details
                                                                            <i className="far fa-arrow-right" />
                                                                            <i className="far fa-arrow-right" />
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xxl-12">
                                                <div className="course__item white-bg mb-30 fix">
                                                    <div className="row gx-0">
                                                        <div className="col-xxl-4 col-xl-4 col-lg-4">
                                                            <div className="course__thumb course__thumb-list w-img p-relative fix">
                                                                <a href="course-details.html">
                                                                    <img
                                                                        src="/img/course/list/course-2.jpg"
                                                                        alt=""
                                                                    />
                                                                </a>
                                                                <div className="course__tag">
                                                                    <a href="#" className="sky-blue">
                                                                        Art &amp; Design
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-8 col-xl-8 col-lg-8">
                                                            <div className="course__right">
                                                                <div className="course__content course__content-3">
                                                                    <div className="course__meta d-flex align-items-center">
                                                                        <div className="course__lesson mr-20">
                                                                            <span>
                                                                                <i className="far fa-book-alt" />
                                                                                72 Lesson
                                                                            </span>
                                                                        </div>
                                                                        <div className="course__rating">
                                                                            <span>
                                                                                <i className="icon_star" />
                                                                                4.5 (44)
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <h3 className="course__title course__title-3">
                                                                        <a href="course-details.html">
                                                                            Fundamentals of music theory Learn new.
                                                                        </a>
                                                                    </h3>
                                                                    <div className="course__summary">
                                                                        <p>
                                                                            Communia virtutes tutiorem declarat stoicorum
                                                                            sanabat oblivisci nostris tamquam iucunditatem
                                                                        </p>
                                                                    </div>
                                                                    <div className="course__teacher d-flex align-items-center">
                                                                        <div className="course__teacher-thumb mr-15">
                                                                            <img
                                                                                src="/img/course/teacher/teacher-2.jpg"
                                                                                alt=""
                                                                            />
                                                                        </div>
                                                                        <h6>
                                                                            <a href="instructor-details.html">
                                                                                Barry Tone
                                                                            </a>
                                                                        </h6>
                                                                    </div>
                                                                </div>
                                                                <div className="course__more course__more-2 d-flex justify-content-between align-items-center">
                                                                    <div className="course__status d-flex align-items-center">
                                                                        <span className="sky-blue">$32.00</span>
                                                                        <span className="old-price">$68.00</span>
                                                                    </div>
                                                                    <div className="course__btn">
                                                                        <a
                                                                            href="course-details.html"
                                                                            className="link-btn"
                                                                        >
                                                                            Know Details
                                                                            <i className="far fa-arrow-right" />
                                                                            <i className="far fa-arrow-right" />
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xxl-12">
                                                <div className="course__item white-bg mb-30 fix">
                                                    <div className="row gx-0">
                                                        <div className="col-xxl-4 col-xl-4 col-lg-4">
                                                            <div className="course__thumb course__thumb-list w-img p-relative fix">
                                                                <a href="course-details.html">
                                                                    <img
                                                                        src="/img/course/list/course-3.jpg"
                                                                        alt=""
                                                                    />
                                                                </a>
                                                                <div className="course__tag">
                                                                    <a href="#" className="blue-2">
                                                                        Art &amp; Design
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-8 col-xl-8 col-lg-8">
                                                            <div className="course__right">
                                                                <div className="course__content course__content-3">
                                                                    <div className="course__meta d-flex align-items-center">
                                                                        <div className="course__lesson mr-20">
                                                                            <span>
                                                                                <i className="far fa-book-alt" />
                                                                                14 Lesson
                                                                            </span>
                                                                        </div>
                                                                        <div className="course__rating">
                                                                            <span>
                                                                                <i className="icon_star" />
                                                                                3.5 (32)
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <h3 className="course__title course__title-3">
                                                                        <a href="course-details.html">
                                                                            Strategy law and organization Foundation
                                                                        </a>
                                                                    </h3>
                                                                    <div className="course__summary">
                                                                        <p>
                                                                            Communia virtutes tutiorem declarat stoicorum
                                                                            sanabat oblivisci nostris tamquam iucunditatem
                                                                        </p>
                                                                    </div>
                                                                    <div className="course__teacher d-flex align-items-center">
                                                                        <div className="course__teacher-thumb mr-15">
                                                                            <img
                                                                                src="/img/course/teacher/teacher-3.jpg"
                                                                                alt=""
                                                                            />
                                                                        </div>
                                                                        <h6>
                                                                            <a href="instructor-details.html">
                                                                                Elon Gated
                                                                            </a>
                                                                        </h6>
                                                                    </div>
                                                                </div>
                                                                <div className="course__more course__more-2 d-flex justify-content-between align-items-center">
                                                                    <div className="course__status d-flex align-items-center">
                                                                        <span className="blue-2">$46.00</span>
                                                                        <span className="old-price">$68.00</span>
                                                                    </div>
                                                                    <div className="course__btn">
                                                                        <a
                                                                            href="course-details.html"
                                                                            className="link-btn"
                                                                        >
                                                                            Know Details
                                                                            <i className="far fa-arrow-right" />
                                                                            <i className="far fa-arrow-right" />
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xxl-12">
                                                <div className="course__item white-bg mb-30 fix">
                                                    <div className="row gx-0">
                                                        <div className="col-xxl-4 col-xl-4 col-lg-4">
                                                            <div className="course__thumb course__thumb-list w-img p-relative fix">
                                                                <a href="course-details.html">
                                                                    <img
                                                                        src="/img/course/list/course-4.jpg"
                                                                        alt=""
                                                                    />
                                                                </a>
                                                                <div className="course__tag">
                                                                    <a href="#" className="green">
                                                                        Art &amp; Design
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-8 col-xl-8 col-lg-8">
                                                            <div className="course__right">
                                                                <div className="course__content course__content-3">
                                                                    <div className="course__meta d-flex align-items-center">
                                                                        <div className="course__lesson mr-20">
                                                                            <span>
                                                                                <i className="far fa-book-alt" />
                                                                                14 Lesson
                                                                            </span>
                                                                        </div>
                                                                        <div className="course__rating">
                                                                            <span>
                                                                                <i className="icon_star" />
                                                                                3.5 (32)
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <h3 className="course__title course__title-3">
                                                                        <a href="course-details.html">
                                                                            The business Intelligence analyst Course 2022
                                                                        </a>
                                                                    </h3>
                                                                    <div className="course__summary">
                                                                        <p>
                                                                            Communia virtutes tutiorem declarat stoicorum
                                                                            sanabat oblivisci nostris tamquam iucunditatem
                                                                        </p>
                                                                    </div>
                                                                    <div className="course__teacher d-flex align-items-center">
                                                                        <div className="course__teacher-thumb mr-15">
                                                                            <img
                                                                                src="/img/course/teacher/teacher-4.jpg"
                                                                                alt=""
                                                                            />
                                                                        </div>
                                                                        <h6>
                                                                            <a href="instructor-details.html">
                                                                                Eleanor Fant
                                                                            </a>
                                                                        </h6>
                                                                    </div>
                                                                </div>
                                                                <div className="course__more course__more-2 d-flex justify-content-between align-items-center">
                                                                    <div className="course__status d-flex align-items-center">
                                                                        <span className="green">$46.00</span>
                                                                        <span className="old-price">$68.00</span>
                                                                    </div>
                                                                    <div className="course__btn">
                                                                        <a
                                                                            href="course-details.html"
                                                                            className="link-btn"
                                                                        >
                                                                            Know Details
                                                                            <i className="far fa-arrow-right" />
                                                                            <i className="far fa-arrow-right" />
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xxl-12">
                                                <div className="course__item white-bg mb-30 fix">
                                                    <div className="row gx-0">
                                                        <div className="col-xxl-4 col-xl-4 col-lg-4">
                                                            <div className="course__thumb course__thumb-list w-img p-relative fix">
                                                                <a href="course-details.html">
                                                                    <img
                                                                        src="/img/course/list/course-5.jpg"
                                                                        alt=""
                                                                    />
                                                                </a>
                                                                <div className="course__tag">
                                                                    <a href="#" className="blue">
                                                                        Art &amp; Design
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-8 col-xl-8 col-lg-8">
                                                            <div className="course__right">
                                                                <div className="course__content course__content-3">
                                                                    <div className="course__meta d-flex align-items-center">
                                                                        <div className="course__lesson mr-20">
                                                                            <span>
                                                                                <i className="far fa-book-alt" />
                                                                                14 Lesson
                                                                            </span>
                                                                        </div>
                                                                        <div className="course__rating">
                                                                            <span>
                                                                                <i className="icon_star" />
                                                                                3.5 (32)
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <h3 className="course__title course__title-3">
                                                                        <a href="course-details.html">
                                                                            Build your media and Public presence
                                                                        </a>
                                                                    </h3>
                                                                    <div className="course__summary">
                                                                        <p>
                                                                            Communia virtutes tutiorem declarat stoicorum
                                                                            sanabat oblivisci nostris tamquam iucunditatem
                                                                        </p>
                                                                    </div>
                                                                    <div className="course__teacher d-flex align-items-center">
                                                                        <div className="course__teacher-thumb mr-15">
                                                                            <img
                                                                                src="/img/course/teacher/teacher-5.jpg"
                                                                                alt=""
                                                                            />
                                                                        </div>
                                                                        <h6>
                                                                            <a href="instructor-details.html">
                                                                                Pelican Steve
                                                                            </a>
                                                                        </h6>
                                                                    </div>
                                                                </div>
                                                                <div className="course__more course__more-2 d-flex justify-content-between align-items-center">
                                                                    <div className="course__status d-flex align-items-center">
                                                                        <span className="blue">$62.00</span>
                                                                        <span className="old-price">$97.00</span>
                                                                    </div>
                                                                    <div className="course__btn">
                                                                        <a
                                                                            href="course-details.html"
                                                                            className="link-btn"
                                                                        >
                                                                            Know Details
                                                                            <i className="far fa-arrow-right" />
                                                                            <i className="far fa-arrow-right" />
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xxl-12">
                                                <div className="course__item white-bg mb-30 fix">
                                                    <div className="row gx-0">
                                                        <div className="col-xxl-4 col-xl-4 col-lg-4">
                                                            <div className="course__thumb course__thumb-list w-img p-relative fix">
                                                                <a href="course-details.html">
                                                                    <img
                                                                        src="/img/course/list/course-6.jpg"
                                                                        alt=""
                                                                    />
                                                                </a>
                                                                <div className="course__tag">
                                                                    <a href="#" className="yellow">
                                                                        Art &amp; Design
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-8 col-xl-8 col-lg-8">
                                                            <div className="course__right">
                                                                <div className="course__content course__content-3">
                                                                    <div className="course__meta d-flex align-items-center">
                                                                        <div className="course__lesson mr-20">
                                                                            <span>
                                                                                <i className="far fa-book-alt" />
                                                                                33 Lesson
                                                                            </span>
                                                                        </div>
                                                                        <div className="course__rating">
                                                                            <span>
                                                                                <i className="icon_star" />
                                                                                3.5 (72)
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <h3 className="course__title course__title-3">
                                                                        <a href="course-details.html">
                                                                            Creative writing through Storytelling
                                                                        </a>
                                                                    </h3>
                                                                    <div className="course__summary">
                                                                        <p>
                                                                            Communia virtutes tutiorem declarat stoicorum
                                                                            sanabat oblivisci nostris tamquam iucunditatem
                                                                        </p>
                                                                    </div>
                                                                    <div className="course__teacher d-flex align-items-center">
                                                                        <div className="course__teacher-thumb mr-15">
                                                                            <img
                                                                                src="/img/course/teacher/teacher-6.jpg"
                                                                                alt=""
                                                                            />
                                                                        </div>
                                                                        <h6>
                                                                            <a href="instructor-details.html">
                                                                                Elon Gated
                                                                            </a>
                                                                        </h6>
                                                                    </div>
                                                                </div>
                                                                <div className="course__more course__more-2 d-flex justify-content-between align-items-center">
                                                                    <div className="course__status d-flex align-items-center">
                                                                        <span className="yellow">$62.00</span>
                                                                        <span className="old-price">$97.00</span>
                                                                    </div>
                                                                    <div className="course__btn">
                                                                        <a
                                                                            href="course-details.html"
                                                                            className="link-btn"
                                                                        >
                                                                            Know Details
                                                                            <i className="far fa-arrow-right" />
                                                                            <i className="far fa-arrow-right" />
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            {/* course area end */}
            {/* cta area start */}
            <section className="cta__area mb--120">
                <div className="container">
                    <div className="cta__inner blue-bg fix">
                        <div className="cta__shape">
                            <img src="/img/cta/cta-shape.png" alt="" />
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
                                    <a href="#" className="e-btn e-btn-white">
                                        Get Started
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* cta area end */}
        </main >

    )
}
