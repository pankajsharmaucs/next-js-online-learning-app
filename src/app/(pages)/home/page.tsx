"use client"

import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Class, Subject } from '@/types/add_types';
import { Skeleton } from "@/components/ui/skeleton"

const Home = () => {
  const [AllClasses, setclasses] = useState<Class[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [className, setClassName] = useState<string>('');
  const [baseUrl, setBaseUrl] = useState('');

  const ALL_SUBJECT = baseUrl + process.env.NEXT_PUBLIC_ADMIN_GET_ALL_SUBJECT!;
  const MASTER_CLASS = baseUrl + process.env.NEXT_PUBLIC_ADMIN_GET_MASTER_CLASS!;
  const ALL_CHAPTER = baseUrl + process.env.NEXT_PUBLIC_ADMIN_GET_ALL_CHAPTER!;
  const [chapterCounts, setChapterCounts] = useState<Record<string, number>>({});
  const [filteredSubjectName, setFilteredSubjectName] = useState<string>('All');

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  useEffect(() => {
    if (!baseUrl) return;

    const fetchData = async () => {
      try {
        const [subjects, classes] = await Promise.all([
          axios.get(ALL_SUBJECT).then(res => res.data),
          axios.get(MASTER_CLASS).then(res => res.data)
        ]);

        setclasses(classes);
        // console.log(classes);

        // Map through all subjects and attach the corresponding class_name
        const updatedSubjects = subjects.map((sub: Subject) => {
          const matchedClass = classes.find((cls: Class) => cls._id === sub.class_id);
          return {
            ...sub,
            class_name: matchedClass ? matchedClass.class_name : 'Unknown Class',
          };
        });

        setSubjects(updatedSubjects); // All subjects, now include class_name
        // console.log(updatedSubjects);

        // Optionally set className from the first subject (if needed)
        if (updatedSubjects.length > 0 && updatedSubjects[0].class_name) {
          setClassName(updatedSubjects[0].class_name);
        }

      } catch (error) {
        console.error('Error fetching subject/class:', error);
      }
    };

    fetchData();
  }, [baseUrl]);


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
      if (!baseUrl || subjects.length === 0) return;

      const counts: Record<string, number> = {};

      for (const subject of subjects) {
        if (subject._id && subject.class_id) {
          const count = await getChapterCount(subject.class_id, subject._id);
          counts[subject._id] = count;
        }
      }

      setChapterCounts(counts);
    };

    fetchChapterCounts();
  }, [subjects, baseUrl]);

  return (
    <>

      <main>
        {/* hero area start */}
        <section className="hero__area hero__height d-flex align-items-center grey-bg-2 p-relative">
          <div className="hero__shape">
            <img
              className="hero-1-circle"
              src="/img/shape/hero/hero-1-circle.png"
              alt=""
            />
            <img
              className="hero-1-circle-2"
              src="/img/shape/hero/hero-1-circle-2.png"
              alt=""
            />
            <img
              className="hero-1-dot-2"
              src="/img/shape/hero/hero-1-dot-2.png"
              alt=""
            />
          </div>
          <div className="container">
            <div className="hero__content-wrapper mt-10">
              <div className="row align-items-center">
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                  <div className="hero__content p-relative z-index-1">
                    <h1 className="hero__title">
                      <span>Explore  300+</span>
                      <span className="yellow-shape">
                        Interactive{" "}
                        <img
                          src="/img/shape/yellow-bg.png"
                          alt="yellow-shape"
                        />{" "}
                      </span>
                      Lessons to Boost Your Learning Journey.
                    </h1>
                    <p className="hidden lg:block">
                      Learn from experienced teachers and top educators through engaging video content, PDFs, and chapter-wise practice.
                    </p>
                    <a href="#courseList" className="e-btn">
                      Browse All Courses
                    </a>
                  </div>
                </div>
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                  <div className="hero__thumb d-flex p-relative">
                    <div className="hero__thumb-shape">
                      <img
                        className="hero-1-dot"
                        src="/img/shape/hero/hero-1-dot.png"
                        alt=""
                      />
                      <img
                        className="hero-1-circle-3"
                        src="/img/shape/hero/hero-1-circle-3.png"
                        alt=""
                      />
                      <img
                        className="hero-1-circle-4"
                        src="/img/shape/hero/hero-1-circle-4.png"
                        alt=""
                      />
                    </div>
                    <div className="hero__thumb-big mr-30">
                      <img src="/assets/hero/hero-image.jpg" alt="" />
                      <div className="hero__quote hero__quote-animation">
                        <span>Fuel your ambition with</span>
                        <h4>“Every Chapter, A Step Toward Success!”</h4>
                      </div>
                    </div>
                    <div className="hero__thumb-sm mt-50 d-none d-lg-block">
                      <img src="/assets/hero/hero-image-2.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* hero area end */}

        {/* category area start */}
        <section className="category__area  pb-70">
          <div className="container">
            <div className="row align-items-end">
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8">
                <div className="section__title-wrapper mb-45">
                  <h2 className="section__title">
                    Explore <br />
                    Our{" "}
                    <span className="yellow-bg">
                      Popular <img src="/img/shape/yellow-bg-2.png" alt="" />
                    </span>
                    Courses
                  </h2>
                </div>
              </div>
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-4">
                <div className="category__more mb-50 float-md-end fix">
                  <a href="course-grid.html" className="link-btn">
                    View all Category
                    <i className="far fa-arrow-right" />
                    <i className="far fa-arrow-right" />
                  </a>
                </div>
              </div>
            </div>

            <div className="row">
              {AllClasses.length > 0 ? (
                AllClasses.map((data, index) => {
                  const slug = data?.class_name.replace(/\s+/g, '-').toLowerCase();
                  return (
                    <div key={index} className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                      <Link href={`/class/${slug}`}>
                        <div className="category__item mb-30 transition-3 d-flex align-items-center">
                          <div className="category__icon mr-30">
                            <svg viewBox="0 0 512 512">
                              <g>
                                <path
                                  className="st0"
                                  d="M178.7,492H120c-55.2,0-100-44.8-100-100V120C20,64.8,64.8,20,120,20h58.7C123.7,20,81,64.8,81,120v272   C81,447.2,123.7,492,178.7,492z M355.5,204.8l18.9-85.5c4.8-24.1,16.7-46.3,34.1-63.7l35.4-35.4c-15.1-1.4-30.7,3.7-42.3,15.3   l-61.1,61.1c-17.4,17.4-29.3,39.6-34.1,63.7L295,217l56.7-11.3C352.9,205.4,354.2,205.1,355.5,204.8L355.5,204.8z"
                                />
                                <path
                                  className="st1"
                                  d="M299,512H120C53.8,512,0,458.2,0,392V120C0,53.8,53.8,0,120,0h183c11,0,20,9,20,20s-9,20-20,20H120   c-44.1,0-80,35.9-80,80v272c0,44.1,35.9,80,80,80h179c44.1,0,80-35.9,80-80V272c0-11,9-20,20-20s20,9,20,20v120   C419,458.2,365.2,512,299,512z M298.9,236.6l56.7-11.3c28.1-5.6,53.7-19.3,73.9-39.6l61.1-61.1c28.5-28.5,28.5-74.8,0-103.2   c-28.5-28.5-74.8-28.5-103.2,0l-61.1,61.1c-20.3,20.3-33.9,45.8-39.6,73.9l-11.3,56.7c-1.3,6.6,0.7,13.3,5.5,18.1   c3.8,3.8,8.9,5.9,14.1,5.9C296.3,237,297.6,236.9,298.9,236.6L298.9,236.6z M462.4,49.7c6.2,6.2,9.7,14.5,9.7,23.3   s-3.4,17.1-9.7,23.3l-61.1,61.1c-14.7,14.7-33.2,24.6-53.5,28.6l-27.3,5.4l5.4-27.3c4.1-20.3,14-38.8,28.6-53.5l61.1-61.1   c6.2-6.2,14.5-9.7,23.3-9.7S456.1,43.4,462.4,49.7L462.4,49.7z"
                                />
                                <path
                                  className="st2"
                                  d="M319,352H101c-11,0-20-9-20-20s9-20,20-20h218c11,0,20,9,20,20S330.1,352,319,352z M211,387   c-13.8,0-25,11.2-25,25s11.2,25,25,25s25-11.2,25-25S224.8,387,211,387z"
                                />
                              </g>
                            </svg>
                          </div>
                          <div className="category__content">
                            <h4 className="category__title">
                              {data?.class_name}
                            </h4>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })
              ) : (
                // Show 6 skeleton cards
                Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                    <div className="category__item mb-30 transition-3 d-flex align-items-center">
                      <div className="category__icon mr-30">
                        <Skeleton className="w-[60px] h-[60px] rounded-full" />
                      </div>
                      <div className="category__content">
                        <Skeleton className="w-[150px] h-[24px] rounded" />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        </section>
        {/* category area end */}

        {/* course area start */}
        <section className="course__area pt-50 pb-120 grey-bg" id="courseList">
          <div className="container">
            <div className="row align-items-end">
              <div className="col-xxl-5 col-xl-6 col-lg-6">
                <div className="section__title-wrapper mb-60">
                  <h2 className="section__title">
                    Find the Right
                    <br />
                    Online{" "}
                    <span className="yellow-bg yellow-bg-big">
                      Course
                      <img src="/img/shape/yellow-bg.png" alt="" />
                    </span>{" "}
                    for you
                  </h2>
                  <p>
                    You don't have to struggle alone, you've got our assistance and
                    help.
                  </p>
                </div>
              </div>
              <div className="col-xxl-7 col-xl-6 col-lg-6 col-12">
                <div className="course__menu d-flex justify-content-lg-end mb-30">
                  <div className="filter-button-group">
                    <button
                      className={`px-1 py-2 ${filteredSubjectName === 'All'
                        ? 'font-bold underline text-[#17ca96]'
                        : 'text-[#080808]'
                        }`}
                      onClick={() => setFilteredSubjectName('All')}
                    >
                      All
                    </button>

                    {Array.from(new Set(subjects.map((sub) => sub.subject_name))).map((subjectName) => (
                      <button
                        key={subjectName}
                        className={`px-1 py-2 ${filteredSubjectName === subjectName
                          ? 'font-bold underline text-[#17ca96]'
                          : 'text-[#333]'
                          }`}
                        onClick={() => setFilteredSubjectName(subjectName)}
                      >
                        {subjectName}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="row grid">
              {subjects.length > 0 ? (
                subjects
                  .slice(0, 6)
                  .filter(
                    (subject) =>
                      filteredSubjectName === "All" ||
                      subject.subject_name === filteredSubjectName
                  )
                  .map((subject, index) => {
                    const class_name_slug = subject?.class_name.replace(" ", "-").toString();
                    const slug = subject?.subject_name.replace(/\s+/g, "-").toLowerCase();

                    return (
                      <div
                        key={index}
                        className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-6 grid-item cat1 cat2 cat4"
                      >
                        <div className="course__item white-bg mb-30 fix">
                          <div className="course__thumb w-img p-relative fix">
                            <Link href={`/class/${class_name_slug}/${slug}`}>
                              <img src={`${subject?.image}`} alt="" />
                            </Link>
                            <div className="course__tag">
                              <Link href={`/class/${class_name_slug}`}>
                                Class {subject?.class_name}
                              </Link>
                            </div>
                          </div>
                          <div className="course__content">
                            <div className="course__meta flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <div className="course__lesson">
                                <span>
                                  <i className="far fa-book-alt" />
                                  Chapters {subject._id ? chapterCounts[subject._id] ?? '...' : '...'}
                                </span>
                              </div>
                              <div className="course__rating">
                                <span>
                                  <i className="icon_star" />
                                  4.5 (44)
                                </span>
                              </div>
                            </div>
                            <h3 className="course__title">
                              <Link href={`/class/${class_name_slug}/${slug}`}>
                                {subject?.subject_name}
                              </Link>
                            </h3>
                            <div className="course__teacher d-flex align-items-center">
                              <div className="course__teacher-thumb mr-15">
                                <img src="/assets/common/logo.jpg" alt="" />
                              </div>
                              <h6>Courseworld</h6>
                            </div>
                          </div>
                          <Link href={`/class/${class_name_slug}/${slug}`}>
                            <div className="course__more d-flex justify-content-center align-items-center">
                              <div className="course__status">
                                <span>Explore</span>
                                <i className="far fa-arrow-right text-[#17ca96]" />
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    );
                  })
              ) : (
                // Show 6 skeleton cards while loading
                Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 grid-item cat1 cat2 cat4"
                  >
                    <div className="course__item white-bg mb-30 fix">
                      <div className="course__thumb w-img p-relative fix">
                        <Skeleton className="w-full h-[180px] rounded-md" />
                        <div className="course__tag mt-2">
                          <Skeleton className="w-[100px] h-[16px] rounded" />
                        </div>
                      </div>
                      <div className="course__content mt-3">
                        <div className="course__meta d-flex align-items-center justify-content-between mb-2">
                          <Skeleton className="w-[80px] h-[14px] rounded" />
                          <Skeleton className="w-[60px] h-[14px] rounded" />
                        </div>
                        <h3 className="course__title mb-2">
                          <Skeleton className="w-[150px] h-[20px] rounded" />
                        </h3>
                        <div className="course__teacher d-flex align-items-center mt-2">
                          <Skeleton className="w-[40px] h-[40px] rounded-full mr-15" />
                          <Skeleton className="w-[80px] h-[16px] rounded" />
                        </div>
                      </div>
                      <div className="course__more d-flex justify-content-center align-items-center mt-3">
                        <Skeleton className="w-[100px] h-[20px] rounded" />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        </section>
        {/* course area end */}

        {/* pricing area start */}
        <section className="price__area pt-50 pb-130">
          <div className="container">
            <div className="row">
              <div className="col-xxl-4 offset-xxl-4">
                <div className="section__title-wrapper mb-60 text-center">
                  <h2 className="">
                    Simple <br /> All Inclusive Pricing
                    <span className="yellow-bg yellow-bg-big">
                      <img src="/img/shape/yellow-bg.png" alt="" />
                    </span>
                  </h2>
                  <p>No Excluded Taxes and No surprise fees.</p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1">
                <div className="price__tab-content">
                  <div className="tab-content" id="nav-tabContent">

                    <div className="row">

                      <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                        <div className="price__item grey-bg mb-30 p-relative">
                          <div className="price__head">
                            <h3>Monthy Subscription</h3>
                            <p>Perfect for examination preparation</p>
                          </div>
                          <div className="price__tag mb-25">
                            <h4>
                              &#8377; 1200<span> / Monthly</span>
                            </h4>
                          </div>
                          <div className="price__features mb-40">
                            <ul>
                              <li>
                                <i className="far fa-check" />
                                Access all Classes
                              </li>
                              <li>
                                <i className="far fa-check" />
                                Access All Subjects
                              </li>
                              <li>
                                <i className="far fa-check" />
                                40 hours + Video Content
                              </li>
                              <li>
                                <i className="far fa-check" />
                                Valid for 1 month
                              </li>
                            </ul>
                          </div>
                          <a href="contact.html" className="e-btn e-btn-4">
                            Get Started
                          </a>
                        </div>
                      </div>

                      <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                        <div className="price__item grey-bg mb-30 p-relative">
                          <div className="price__offer">
                            <span>Best Value</span>
                          </div>
                          <div className="price__head">
                            <h3>Yearly Subscription</h3>
                            <p>Perfect for Students and Instructor</p>
                          </div>
                          <div className="price__tag mb-25">
                            <h4>
                              &#8377; 2900<span> / Yearly</span>
                            </h4>
                          </div>
                          <div className="price__features mb-40">
                            <ul>
                              <li>
                                <i className="far fa-check" />
                                Access all Classes
                              </li>
                              <li>
                                <i className="far fa-check" />
                                Access All Subjects
                              </li>
                              <li>
                                <i className="far fa-check" />
                                40 hours + Video Content
                              </li>
                              <li>
                                <i className="far fa-check" />
                                Valid for 1 Year & Course Assistance
                              </li>
                            </ul>
                          </div>
                          <a href="contact.html" className="e-btn e-btn-4">
                            Get Started
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
        {/* pricing area end */}



      </main>

    </>
  )
}

export default Home