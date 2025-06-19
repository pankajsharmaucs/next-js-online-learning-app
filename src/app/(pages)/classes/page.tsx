import React from 'react'

const page = () => {
    return (
        <main>
            {/* page title area start */}
            <section
                className="page__title-area page__title-height page__title-overlay d-flex align-items-center"
                style={{
                    backgroundImage: `url("/img/page-title/page-title.jpg")`,
                    backgroundSize: 'cover', // optional
                    backgroundPosition: 'center', // optional
                }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-12">
                            <div className="page__title-wrapper mt-110">
                                <h3 className="page__title">Clasess</h3>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="index.html">Home</a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            All Classes
                                        </li>
                                    </ol>
                                </nav>
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
                                            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
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
                                                                <img
                                                                    src="/img/course/teacher/teacher-1.jpg"
                                                                    alt=""
                                                                />
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
                                            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
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
                                                                <img
                                                                    src="/img/course/teacher/teacher-2.jpg"
                                                                    alt=""
                                                                />
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
                                            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                                                <div className="course__item white-bg mb-30 fix">
                                                    <div className="course__thumb w-img p-relative fix">
                                                        <a href="course-details.html">
                                                            <img src="/img/course/course-7.jpg" alt="" />
                                                        </a>
                                                        <div className="course__tag">
                                                            <a href="#" className="blue-2">
                                                                Development
                                                            </a>
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
                                                                    4.4 (40)
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <h3 className="course__title">
                                                            <a href="course-details.html">
                                                                Bases Matemáticas dios Álgebra Ecuacion
                                                            </a>
                                                        </h3>
                                                        <div className="course__teacher d-flex align-items-center">
                                                            <div className="course__teacher-thumb mr-15">
                                                                <img
                                                                    src="/img/course/teacher/teacher-7.jpg"
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <h6>
                                                                <a href="instructor-details.html">Samuel Serif</a>
                                                            </h6>
                                                        </div>
                                                    </div>
                                                    <div className="course__more d-flex justify-content-between align-items-center">
                                                        <div className="course__status d-flex align-items-center">
                                                            <span className="blue-2">$46.00</span>
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
                                            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
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
                                                                <img
                                                                    src="/img/course/teacher/teacher-3.jpg"
                                                                    alt=""
                                                                />
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
                                            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
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
                                                                <img
                                                                    src="/img/course/teacher/teacher-4.jpg"
                                                                    alt=""
                                                                />
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
                                            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                                                <div className="course__item white-bg mb-30 fix">
                                                    <div className="course__thumb w-img p-relative fix">
                                                        <a href="course-details.html">
                                                            <img src="/img/course/course-8.jpg" alt="" />
                                                        </a>
                                                        <div className="course__tag">
                                                            <a href="#" className="yellow">
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
                                                                <img
                                                                    src="/img/course/teacher/teacher-8.jpg"
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <h6>
                                                                <a href="instructor-details.html">Brian Cumin</a>
                                                            </h6>
                                                        </div>
                                                    </div>
                                                    <div className="course__more d-flex justify-content-between align-items-center">
                                                        <div className="course__status d-flex align-items-center">
                                                            <span className="yellow">$62.00</span>
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
                                            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
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
                                                                <img
                                                                    src="/img/course/teacher/teacher-5.jpg"
                                                                    alt=""
                                                                />
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
                                            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
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
                                                                <img
                                                                    src="/img/course/teacher/teacher-6.jpg"
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <h6>
                                                                <a href="instructor-details.html">
                                                                    Shahnewaz Sakil
                                                                </a>
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
                                            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                                                <div className="course__item white-bg mb-30 fix">
                                                    <div className="course__thumb w-img p-relative fix">
                                                        <a href="course-details.html">
                                                            <img src="/img/course/course-9.jpg" alt="" />
                                                        </a>
                                                        <div className="course__tag">
                                                            <a href="#" className="blue-2">
                                                                UX Design
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="course__content">
                                                        <div className="course__meta d-flex align-items-center justify-content-between">
                                                            <div className="course__lesson">
                                                                <span>
                                                                    <i className="far fa-book-alt" />
                                                                    25 Lesson
                                                                </span>
                                                            </div>
                                                            <div className="course__rating">
                                                                <span>
                                                                    <i className="icon_star" />
                                                                    4.5 (35)
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
                                                                <img
                                                                    src="/img/course/teacher/teacher-9.jpg"
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <h6>
                                                                <a href="instructor-details.html">Hilary Ouse</a>
                                                            </h6>
                                                        </div>
                                                    </div>
                                                    <div className="course__more d-flex justify-content-between align-items-center">
                                                        <div className="course__status d-flex align-items-center">
                                                            <span className="blue-2">$46.00</span>
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
                    <div className="row">
                        <div className="col-xxl-12">
                            <div
                                className="basic-pagination wow fadeInUp mt-30"
                                data-wow-delay=".2s"
                            >
                                <ul className="d-flex align-items-center">
                                    <li className="prev">
                                        <a href="course-grid.html" className="link-btn link-prev">
                                            Prev
                                            <i className="arrow_left" />
                                            <i className="arrow_left" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="course-grid.html">
                                            <span>1</span>
                                        </a>
                                    </li>
                                    <li className="active">
                                        <a href="course-grid.html">
                                            <span>2</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="course-grid.html">
                                            <span>3</span>
                                        </a>
                                    </li>
                                    <li className="next">
                                        <a href="course-grid.html" className="link-btn">
                                            Next
                                            <i className="arrow_right" />
                                            <i className="arrow_right" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* course area end */}
            
        </main>

    )
}

export default page