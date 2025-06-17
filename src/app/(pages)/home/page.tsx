"use client"

import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Subject {
  _id: string;
  class_id: string;
  subject_name: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

const Home = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [distinctSubjectNames, setDistinctSubjectNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      const url = process.env.NEXT_PUBLIC_ADMIN_GET_ALL_SUBJECT;
      if (!url) {
        console.error('API URL not defined');
        return;
      }

      try {
        const response = await axios.get<Subject[]>(url);
        const subjectData = response.data;

        // Save full data in state

        setSubjects(subjectData);

        // Get distinct subject names
        const names = [...new Set(subjectData.map((sub) => sub.subject_name))];
        console.log(names);
        setDistinctSubjectNames(names);
      } catch (err) {
        console.error('Error fetching subjects:', err);
      }
    };

    fetchSubjects();
  }, []);

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
                      <span>Access 300+</span>
                      <span className="yellow-shape">
                        Online{" "}
                        <img
                          src="/img/shape/yellow-bg.png"
                          alt="yellow-shape"
                        />{" "}
                      </span>
                      Tutorial From Top Instructor.
                    </h1>
                    <p className="hidden lg:block">
                      Meet university,and cultural institutions, who'll share their
                      experience.
                    </p>
                    <a href="course-grid.html" className="e-btn">
                      view all course
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
                        <span>Tomorrow is our</span>
                        <h4>“When I Grow Up” Spirit Day!</h4>
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

              {distinctSubjectNames.map((name, index) => {
                const slug = name.replace(/\s+/g, '-').toLowerCase();
                return (
                  <div key={index} className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                    <Link href={`/subject/${slug}`}>
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
                            {name}
                          </h4>
                          {/* <p>Data is Everything</p> */}
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              }
              )}




            </div>
          </div>
        </section>
        {/* category area end */}

        {/* banner area start */}
        <section className="banner__area pb-110 d-none">
          <div className="container">
            <div className="row">
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                <div
                  className="banner__item p-relative mb-40"
                  data-background="assets/img/banner/banner-bg-1.jpg"
                >
                  <div className="banner__content">
                    <span>Free</span>
                    <h3 className="banner__title">
                      <a href="course-details.html">
                        Germany Foundation <br /> Document
                      </a>
                    </h3>
                    <a href="course-grid.html" className="e-btn e-btn-2">
                      View Courses
                    </a>
                  </div>
                  <div className="banner__thumb d-none d-sm-block d-md-none d-lg-block">
                    <img src="/img/banner/banner-img-1.png" alt="" />
                  </div>
                </div>
              </div>
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                <div
                  className="banner__item p-relative mb-40"
                  data-background="assets/img/banner/banner-bg-2.jpg"
                >
                  <div className="banner__content">
                    <span className="orange">new</span>
                    <h3 className="banner__title">
                      <a href="course-details.html">
                        Online Courses <br />
                        From Eduka University
                      </a>
                    </h3>
                    <a href="course-grid.html" className="e-btn e-btn-2">
                      Find Out More
                    </a>
                  </div>
                  <div className="banner__thumb banner__thumb-2 d-none d-sm-block d-md-none d-lg-block">
                    <img src="/img/banner/banner-img-2.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* banner area end */}

        {/* course area start */}
        <section className="course__area pt-50 pb-120 grey-bg">
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
              <div className="col-xxl-7 col-xl-6 col-lg-6">
                <div className="course__menu d-flex justify-content-lg-end mb-60">
                  <div className="masonary-menu filter-button-group">
                    <button className="active" data-filter="*">
                      See All
                      <span className="tag">new</span>
                    </button>
                    <button data-filter=".cat1">Trending</button>
                    <button data-filter=".cat2">Popularity</button>
                    <button data-filter=".cat3">Featured</button>
                    <button data-filter=".cat4">Art &amp; Design</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row grid">
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 grid-item cat1 cat2 cat4">
                <div className="course__item white-bg mb-30 fix">
                  <div className="course__thumb w-img p-relative fix">
                    <a href="course-details.html">
                      <img src="/img/course/course-1.jpg" alt="" />
                    </a>
                    <div className="course__tag">
                      <a href="#">Art &amp; Design</a>
                    </div>
                  </div>
                  <div className="course__content">
                    <div className="course__meta d-flex align-items-center justify-content-between">
                      <div className="course__lesson">
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
                    <h3 className="course__title">
                      <a href="course-details.html">
                        Become a product Manager learn the skills &amp; job.
                      </a>
                    </h3>
                    <div className="course__teacher d-flex align-items-center">
                      <div className="course__teacher-thumb mr-15">
                        <img src="/img/course/teacher/teacher-1.jpg" alt="" />
                      </div>
                      <h6>
                        <a href="instructor-details.html">Jim Séchen</a>
                      </h6>
                    </div>
                  </div>
                  <div className="course__more d-flex justify-content-between align-items-center">
                    <div className="course__status">
                      <span>Free</span>
                    </div>
                    <div className="course__btn">
                      <a href="course-details.html" className="link-btn">
                        Know Details
                        <i className="far fa-arrow-right" />
                        <i className="far fa-arrow-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 grid-item cat2 cat3 cat4">
                <div className="course__item white-bg mb-30 fix">
                  <div className="course__thumb w-img p-relative fix">
                    <a href="course-details.html">
                      <img src="/img/course/course-2.jpg" alt="" />
                    </a>
                    <div className="course__tag">
                      <a href="#" className="sky-blue">
                        Mechanical
                      </a>
                    </div>
                  </div>
                  <div className="course__content">
                    <div className="course__meta d-flex align-items-center justify-content-between">
                      <div className="course__lesson">
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
                    <h3 className="course__title">
                      <a href="course-details.html">
                        Fundamentals of music theory Learn new
                      </a>
                    </h3>
                    <div className="course__teacher d-flex align-items-center">
                      <div className="course__teacher-thumb mr-15">
                        <img src="/img/course/teacher/teacher-2.jpg" alt="" />
                      </div>
                      <h6>
                        <a href="instructor-details.html">Barry Tone</a>
                      </h6>
                    </div>
                  </div>
                  <div className="course__more d-flex justify-content-between align-items-center">
                    <div className="course__status d-flex align-items-center">
                      <span className="sky-blue">$32.00</span>
                      <span className="old-price">$68.00</span>
                    </div>
                    <div className="course__btn">
                      <a href="course-details.html" className="link-btn">
                        Know Details
                        <i className="far fa-arrow-right" />
                        <i className="far fa-arrow-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 grid-item cat3 cat4 cat3">
                <div className="course__item white-bg mb-30 fix">
                  <div className="course__thumb w-img p-relative fix">
                    <a href="course-details.html">
                      <img src="/img/course/course-3.jpg" alt="" />
                    </a>
                    <div className="course__tag">
                      <a href="#" className="green">
                        Development
                      </a>
                    </div>
                  </div>
                  <div className="course__content">
                    <div className="course__meta d-flex align-items-center justify-content-between">
                      <div className="course__lesson">
                        <span>
                          <i className="far fa-book-alt" />
                          14 Lesson
                        </span>
                      </div>
                      <div className="course__rating">
                        <span>
                          <i className="icon_star" />
                          3.5 (55)
                        </span>
                      </div>
                    </div>
                    <h3 className="course__title">
                      <a href="course-details.html">
                        Strategy law and organization Foundation
                      </a>
                    </h3>
                    <div className="course__teacher d-flex align-items-center">
                      <div className="course__teacher-thumb mr-15">
                        <img src="/img/course/teacher/teacher-3.jpg" alt="" />
                      </div>
                      <h6>
                        <a href="instructor-details.html">Elon Gated</a>
                      </h6>
                    </div>
                  </div>
                  <div className="course__more d-flex justify-content-between align-items-center">
                    <div className="course__status d-flex align-items-center">
                      <span className="green">$46.00</span>
                      <span className="old-price">$68.00</span>
                    </div>
                    <div className="course__btn">
                      <a href="course-details.html" className="link-btn">
                        Know Details
                        <i className="far fa-arrow-right" />
                        <i className="far fa-arrow-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 grid-item cat4 cat1 cat3">
                <div className="course__item white-bg mb-30 fix">
                  <div className="course__thumb w-img p-relative fix">
                    <a href="course-details.html">
                      <img src="/img/course/course-4.jpg" alt="" />
                    </a>
                    <div className="course__tag">
                      <a href="#" className="blue">
                        Marketing
                      </a>
                    </div>
                  </div>
                  <div className="course__content">
                    <div className="course__meta d-flex align-items-center justify-content-between">
                      <div className="course__lesson">
                        <span>
                          <i className="far fa-book-alt" />
                          22 Lesson
                        </span>
                      </div>
                      <div className="course__rating">
                        <span>
                          <i className="icon_star" />
                          4.5 (42)
                        </span>
                      </div>
                    </div>
                    <h3 className="course__title">
                      <a href="course-details.html">
                        The business Intelligence analyst Course 2022
                      </a>
                    </h3>
                    <div className="course__teacher d-flex align-items-center">
                      <div className="course__teacher-thumb mr-15">
                        <img src="/img/course/teacher/teacher-4.jpg" alt="" />
                      </div>
                      <h6>
                        <a href="instructor-details.html">Eleanor Fant</a>
                      </h6>
                    </div>
                  </div>
                  <div className="course__more d-flex justify-content-between align-items-center">
                    <div className="course__status d-flex align-items-center">
                      <span className="blue">$62.00</span>
                      <span className="old-price">$97.00</span>
                    </div>
                    <div className="course__btn">
                      <a href="course-details.html" className="link-btn">
                        Know Details
                        <i className="far fa-arrow-right" />
                        <i className="far fa-arrow-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 grid-item cat1 cat2 cat4">
                <div className="course__item white-bg mb-30 fix">
                  <div className="course__thumb w-img p-relative fix">
                    <a href="course-details.html">
                      <img src="/img/course/course-5.jpg" alt="" />
                    </a>
                    <div className="course__tag">
                      <a href="#" className="orange">
                        Audio &amp; Music
                      </a>
                    </div>
                  </div>
                  <div className="course__content">
                    <div className="course__meta d-flex align-items-center justify-content-between">
                      <div className="course__lesson">
                        <span>
                          <i className="far fa-book-alt" />
                          18 Lesson
                        </span>
                      </div>
                      <div className="course__rating">
                        <span>
                          <i className="icon_star" />
                          4.5 (37)
                        </span>
                      </div>
                    </div>
                    <h3 className="course__title">
                      <a href="course-details.html">
                        Build your media and Public presence
                      </a>
                    </h3>
                    <div className="course__teacher d-flex align-items-center">
                      <div className="course__teacher-thumb mr-15">
                        <img src="/img/course/teacher/teacher-5.jpg" alt="" />
                      </div>
                      <h6>
                        <a href="instructor-details.html">Pelican Steve</a>
                      </h6>
                    </div>
                  </div>
                  <div className="course__more d-flex justify-content-between align-items-center">
                    <div className="course__status d-flex align-items-center">
                      <span className="orange">$62.00</span>
                      <span className="old-price">$97.00</span>
                    </div>
                    <div className="course__btn">
                      <a href="course-details.html" className="link-btn">
                        Know Details
                        <i className="far fa-arrow-right" />
                        <i className="far fa-arrow-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 grid-item cat2 cat3">
                <div className="course__item white-bg mb-30 fix">
                  <div className="course__thumb w-img p-relative fix">
                    <a href="course-details.html">
                      <img src="/img/course/course-6.jpg" alt="" />
                    </a>
                    <div className="course__tag">
                      <a href="#" className="pink">
                        UX Design
                      </a>
                    </div>
                  </div>
                  <div className="course__content">
                    <div className="course__meta d-flex align-items-center justify-content-between">
                      <div className="course__lesson">
                        <span>
                          <i className="far fa-book-alt" />
                          13 Lesson
                        </span>
                      </div>
                      <div className="course__rating">
                        <span>
                          <i className="icon_star" />
                          4.5 (72)
                        </span>
                      </div>
                    </div>
                    <h3 className="course__title">
                      <a href="course-details.html">
                        Creative writing through Storytelling
                      </a>
                    </h3>
                    <div className="course__teacher d-flex align-items-center">
                      <div className="course__teacher-thumb mr-15">
                        <img src="/img/course/teacher/teacher-6.jpg" alt="" />
                      </div>
                      <h6>
                        <a href="instructor-details.html">Shahnewaz Sakil</a>
                      </h6>
                    </div>
                  </div>
                  <div className="course__more d-flex justify-content-between align-items-center">
                    <div className="course__status d-flex align-items-center">
                      <span className="pink">$46.00</span>
                      <span className="old-price">$72.00</span>
                    </div>
                    <div className="course__btn">
                      <a href="course-details.html" className="link-btn">
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
        </section>
        {/* course area end */}

        {/* events area start */}
        <section className="events__area pt-50 pb-120 p-relative">
          <div className="events__shape">
            <img
              className="events-1-shape"
              src="/img/events/events-shape.png"
              alt=""
            />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-xxl-4 offset-xxl-4">
                <div className="section__title-wrapper mb-60 text-center">
                  <h2 className="section__title">
                    Current{" "}
                    <span className="yellow-bg yellow-bg-big">
                      Events
                      <img src="/img/shape/yellow-bg.png" alt="" />
                    </span>
                  </h2>
                  <p>We found 13 events available for you.</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1">
                <div className="events__item mb-10 hover__active">
                  <div className="events__item-inner d-sm-flex align-items-center justify-content-between white-bg">
                    <div className="events__content">
                      <div className="events__meta">
                        <span>Jun 14, 2022</span>
                        <span>12:00 am - 2:30 pm</span>
                        <span>New York</span>
                      </div>
                      <h3 className="events__title">
                        <a href="event-details.html">
                          Digital transformation conference
                        </a>
                      </h3>
                    </div>
                    <div className="events__more">
                      <a href="event-details.html" className="link-btn">
                        View More
                        <i className="far fa-arrow-right" />
                        <i className="far fa-arrow-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1">
                <div className="events__item mb-10 hover__active active">
                  <div className="events__item-inner d-sm-flex align-items-center justify-content-between white-bg">
                    <div className="events__content">
                      <div className="events__meta">
                        <span>April 10, 2022</span>
                        <span>9:00 am - 5:00 pm</span>
                        <span>Mindahan</span>
                      </div>
                      <h3 className="events__title">
                        <a href="event-details.html">
                          World education day conference
                        </a>
                      </h3>
                    </div>
                    <div className="events__more">
                      <a href="event-details.html" className="link-btn">
                        View More
                        <i className="far fa-arrow-right" />
                        <i className="far fa-arrow-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1">
                <div className="events__item mb-10 hover__active">
                  <div className="events__item-inner d-sm-flex align-items-center justify-content-between white-bg">
                    <div className="events__content">
                      <div className="events__meta">
                        <span>July 16, 2022</span>
                        <span>10:30 am - 1:30 pm</span>
                        <span>Weedpatch</span>
                      </div>
                      <h3 className="events__title">
                        <a href="event-details.html">Foundations of global health</a>
                      </h3>
                    </div>
                    <div className="events__more">
                      <a href="event-details.html" className="link-btn">
                        View More
                        <i className="far fa-arrow-right" />
                        <i className="far fa-arrow-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1">
                <div className="events__item mb-10 hover__active">
                  <div className="events__item-inner d-sm-flex align-items-center justify-content-between white-bg">
                    <div className="events__content">
                      <div className="events__meta">
                        <span>March 24, 2022</span>
                        <span>10:30 am - 12:00 pm</span>
                        <span>Lnland</span>
                      </div>
                      <h3 className="events__title">
                        <a href="event-details.html">Business creativity workshops</a>
                      </h3>
                    </div>
                    <div className="events__more">
                      <a href="event-details.html" className="link-btn">
                        View More
                        <i className="far fa-arrow-right" />
                        <i className="far fa-arrow-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* events area end */}

        {/* pricing area start */}
        <section className="price__area pt-50 pb-130">
          <div className="container">
            <div className="row">
              <div className="col-xxl-4 offset-xxl-4">
                <div className="section__title-wrapper mb-60 text-center">
                  <h2 className="section__title">
                    Simple <br /> All Inclusive{" "}
                    <span className="yellow-bg yellow-bg-big">
                      Pricing
                      <img src="/img/shape/yellow-bg.png" alt="" />
                    </span>
                  </h2>
                  <p>No contracts. No surprise fees.</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xxl-12">
                <div className="price__tab-btn text-center mb-50">
                  <nav>
                    <div
                      className="nav nav-tabs justify-content-center"
                      id="nav-tab"
                      role="tablist"
                    >
                      <button
                        className="nav-link"
                        id="nav-monthly-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-monthly"
                        type="button"
                        role="tab"
                        aria-controls="nav-monthly"
                        aria-selected="true"
                      >
                        monthly plan
                      </button>
                      <button
                        className="nav-link active"
                        id="nav-annually-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-annually"
                        type="button"
                        role="tab"
                        aria-controls="nav-annually"
                        aria-selected="false"
                      >
                        Annual Plan
                      </button>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1">
                <div className="price__tab-content">
                  <div className="tab-content" id="nav-tabContent">
                    <div
                      className="tab-pane fade"
                      id="nav-monthly"
                      role="tabpanel"
                      aria-labelledby="nav-monthly-tab"
                    >
                      <div className="row">
                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                          <div className="price__item grey-bg mb-30 p-relative">
                            <div className="price__head">
                              <h3>Gold</h3>
                              <p>Perfect for small marketing teams</p>
                            </div>
                            <div className="price__tag mb-25">
                              <h4>
                                $59<span>.99 / annually</span>
                              </h4>
                            </div>
                            <div className="price__features mb-40">
                              <ul>
                                <li>
                                  <i className="far fa-check" />
                                  Course Discussions
                                </li>
                                <li>
                                  <i className="far fa-check" />
                                  Content Library
                                </li>
                                <li>
                                  <i className="far fa-check" />
                                  1-hour Mentorship
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
                              <h3>Diamond</h3>
                              <p>Perfect for small marketing teams</p>
                            </div>
                            <div className="price__tag mb-25">
                              <h4>
                                $99<span>.99 / annually</span>
                              </h4>
                            </div>
                            <div className="price__features mb-40">
                              <ul>
                                <li>
                                  <i className="far fa-check" />
                                  Course Discussions
                                </li>
                                <li>
                                  <i className="far fa-check" />
                                  Content Library
                                </li>
                                <li>
                                  <i className="far fa-check" />
                                  1-hour Mentorship
                                </li>
                                <li>
                                  <i className="far fa-check" />
                                  Online Course
                                </li>
                              </ul>
                            </div>
                            <a href="contact.html" className="e-btn e-btn-border">
                              Get Started
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade show active"
                      id="nav-annually"
                      role="tabpanel"
                      aria-labelledby="nav-annually-tab"
                    >
                      <div className="row">
                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                          <div className="price__item grey-bg mb-30 p-relative">
                            <div className="price__head">
                              <h3>Gold</h3>
                              <p>Perfect for small marketing teams</p>
                            </div>
                            <div className="price__tag mb-25">
                              <h4>
                                $59<span>.99 / annually</span>
                              </h4>
                            </div>
                            <div className="price__features mb-40">
                              <ul>
                                <li>
                                  <i className="far fa-check" />
                                  Course Discussions
                                </li>
                                <li>
                                  <i className="far fa-check" />
                                  Content Library
                                </li>
                                <li>
                                  <i className="far fa-check" />
                                  1-hour Mentorship
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
                              <h3>Diamond</h3>
                              <p>Perfect for small marketing teams</p>
                            </div>
                            <div className="price__tag mb-25">
                              <h4>
                                $99<span>.99 / annually</span>
                              </h4>
                            </div>
                            <div className="price__features mb-40">
                              <ul>
                                <li>
                                  <i className="far fa-check" />
                                  Course Discussions
                                </li>
                                <li>
                                  <i className="far fa-check" />
                                  Content Library
                                </li>
                                <li>
                                  <i className="far fa-check" />
                                  1-hour Mentorship
                                </li>
                                <li>
                                  <i className="far fa-check" />
                                  Online Course
                                </li>
                              </ul>
                            </div>
                            <a href="contact.html" className="e-btn e-btn-border">
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
          </div>
        </section>
        {/* pricing area end */}

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

      </main>

    </>
  )
}

export default Home