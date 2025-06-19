'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Class, Subject } from '@/types/add_types';
import axios from 'axios';
import Link from 'next/link';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { Skeleton } from "@/components/ui/skeleton"

export default function Page() {
    const params = useParams();
    const subjectParam = params.subject_name as string;
    const subject_name_trim = subjectParam.replace(/-/g, ' ').toLowerCase();

    const [baseUrl, setBaseUrl] = useState('');
    const [subjectList, setSubject] = useState<Subject[]>([]);
    const [className, setClassName] = useState<string>('');
    const ALL_CHAPTER = baseUrl + process.env.NEXT_PUBLIC_ADMIN_GET_ALL_CHAPTER!;
    const [chapterCounts, setChapterCounts] = useState<Record<string, number>>({});

    useEffect(() => {
        setBaseUrl(window.location.origin);
    }, []);

    useEffect(() => {
        if (!baseUrl) return;

        const ALL_SUBJECT = baseUrl + process.env.NEXT_PUBLIC_ADMIN_GET_ALL_SUBJECT!;
        const MASTER_CLASS = baseUrl + process.env.NEXT_PUBLIC_ADMIN_GET_MASTER_CLASS!;

        const fetchData = async () => {
            try {
                const [subjects, classes] = await Promise.all([
                    axios.get(ALL_SUBJECT).then(res => res.data),
                    axios.get(MASTER_CLASS).then(res => res.data)
                ]);

                // Filter subjects by name
                const matchedSubjects = subjects
                    .filter((sub: Subject) =>
                        sub.subject_name.toLowerCase().trim() === subject_name_trim
                    )
                    .map((sub: Subject) => {
                        // Find the class associated with the subject
                        const matchedClass = classes.find((cls: Class) => cls._id === sub.class_id);
                        // Inject class_name into subject
                        return {
                            ...sub,
                            class_name: matchedClass ? matchedClass.class_name : 'Unknown Class',
                        };
                    });

                if (matchedSubjects.length === 0) {
                    console.warn('No subjects found for name:', subject_name_trim);
                    return;
                }

                setSubject(matchedSubjects); // Now contains class_name
                // console.log("matchedSubjects", matchedSubjects);

                // Optionally set className from the first matched subject
                if (matchedSubjects[0]?.class_name) {
                    setClassName(matchedSubjects[0].class_name);
                }

            } catch (error) {
                console.error('Error fetching subject/class:', error);
            }
        };

        fetchData();
    }, [baseUrl, subject_name_trim]);


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
            if (!baseUrl || subjectList.length === 0) return;

            const counts: Record<string, number> = {};

            for (const subject of subjectList) {
                if (subject._id && subject.class_id) {
                    const count = await getChapterCount(subject.class_id, subject._id);
                    counts[subject._id] = count;
                }
            }

            setChapterCounts(counts);
        };

        fetchChapterCounts();
    }, [subjectList, baseUrl]);


    if (!subjectList) {
        return <p className="text-center py-10 text-lg">Class not found.</p>;
    }

    return (
        <main>
            <section
                className="page__title-area page__title-height page__title-overlay d-flex align-items-center"
                style={{
                    backgroundImage: `url("/assets/common/subject_bg.jpg")`,
                    backgroundSize: 'cover',
                    backgroundPositionY: '-159%'
                }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-12">
                            <div className="page__title-wrapper mt-110">
                                <h3 className="page__title text-capitalize">{subject_name_trim} </h3>
                                <PageBreadcrumb homeLabel="Home" homeHref="/" pageName={`For All Class`} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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
                                            {subjectList && subjectList.length > 0 ? (
                                                subjectList.map((subject, index) => {
                                                    const class_name_slug = subject?.class_name.replace(' ', '-').toString();
                                                    const subject_name_slug = subject?.subject_name.replace(' ', '-').toString();

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
                                                                        Class {class_name_slug} - {subject?.subject_name}
                                                                    </h1>
                                                                </div>
                                                                <div className="course__more d-flex justify-content-between align-items-center">
                                                                    <div className="course__status">
                                                                        <span>Explore</span>
                                                                    </div>
                                                                    <div className="course__btn">
                                                                        <Link
                                                                            href={`/class/${class_name_slug}/${subject_name_slug}`}
                                                                            className="link-btn"
                                                                        >
                                                                            Know Details <i className="far fa-arrow-right" />
                                                                            <i className="far fa-arrow-right" />
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            ) : (
                                                // Show 6 skeleton cards while subjectList is empty or loading
                                                Array.from({ length: 6 }).map((_, index) => (
                                                    <div key={index} className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                                                        <div className="course__item white-bg mb-30 fix">
                                                            <div className="course__thumb w-img p-relative fix">
                                                                <Skeleton className="w-full h-[180px] rounded-md" />
                                                            </div>
                                                            <div className="course__content mt-3">
                                                                <div className="course__meta d-flex align-items-center justify-content-between mb-2">
                                                                    <Skeleton className="w-[150px] h-[14px] rounded" />
                                                                </div>
                                                                <h1 className="course__title text-capitalize mb-2">
                                                                    <Skeleton className="w-[220px] h-[24px] rounded" />
                                                                </h1>
                                                            </div>
                                                            <div className="course__more d-flex justify-content-between align-items-center mt-3">
                                                                <Skeleton className="w-[80px] h-[20px] rounded" />
                                                                <Skeleton className="w-[130px] h-[20px] rounded" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}
