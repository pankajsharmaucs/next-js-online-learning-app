import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <main>
      {/* page title area start */}
      <section
        className="page__title-area page__title-height page__title-overlay d-flex align-items-center"
        data-background="assets/img/page-title/page-title-2.jpg"
      >
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="page__title-wrapper mt-110">
                <h3 className="page__title">Blog Grid</h3>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link href="index.html">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Blog Grid
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* page title area end */}
      {/* blog area start */}
      <section className="blog__area pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xxl-8 col-xl-8 col-lg-8">
              <div className="row">
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                  <div className="blog__wrapper">
                    <div className="blog__item white-bg mb-30 transition-3 fix">
                      <div className="blog__thumb w-img fix">
                        <Link href="blog/test-blog">
                          <img src="/img/blog/blog-1.jpg" alt="" />
                        </Link>
                      </div>
                      <div className="blog__content">
                        <div className="blog__tag">
                          <Link href="#">Art &amp; Design</Link>
                        </div>
                        <h3 className="blog__title">
                          <Link href="blog/test-blog">
                            The Challenge Of Global Learning In Public Education
                          </Link>
                        </h3>
                        <div className="blog__meta d-flex align-items-center justify-content-between">
                          <div className="blog__author d-flex align-items-center">
                            <div className="blog__author-thumb mr-10">
                              <img
                                src="/img/blog/author/author-1.jpg"
                                alt=""
                              />
                            </div>
                            <div className="blog__author-info">
                              <h5>Jim Séchen</h5>
                            </div>
                          </div>
                          <div className="blog__date d-flex align-items-center">
                            <i className="fal fa-clock" />
                            <span>April 02, 2022</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                  <div className="blog__wrapper">
                    <div className="blog__item white-bg mb-30 transition-3 fix">
                      <div className="blog__thumb w-img fix">
                        <Link href="blog/test-blog">
                          <img src="/img/blog/blog-2.jpg" alt="" />
                        </Link>
                      </div>
                      <div className="blog__content">
                        <div className="blog__tag">
                          <Link href="#" className="purple">
                            Art &amp; Design
                          </Link>
                        </div>
                        <h3 className="blog__title">
                          <Link href="blog/test-blog">
                            Exactly How Technology Can Make Reading Better
                          </Link>
                        </h3>
                        <div className="blog__meta d-flex align-items-center justify-content-between">
                          <div className="blog__author d-flex align-items-center">
                            <div className="blog__author-thumb mr-10">
                              <img
                                src="/img/blog/author/author-2.jpg"
                                alt=""
                              />
                            </div>
                            <div className="blog__author-info">
                              <h5>Jim Séchen</h5>
                            </div>
                          </div>
                          <div className="blog__date d-flex align-items-center">
                            <i className="fal fa-clock" />
                            <span>April 02, 2022</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                  <div className="blog__wrapper">
                    <div className="blog__item white-bg mb-30 transition-3 fix">
                      <div className="blog__thumb w-img fix">
                        <Link href="blog/test-blog">
                          <img src="/img/blog/blog-3.jpg" alt="" />
                        </Link>
                      </div>
                      <div className="blog__content">
                        <div className="blog__tag">
                          <Link href="#" className="pink">
                            Art &amp; Design
                          </Link>
                        </div>
                        <h3 className="blog__title">
                          <Link href="blog/test-blog">
                            New Chicago school budget relies on state pension
                          </Link>
                        </h3>
                        <div className="blog__meta d-flex align-items-center justify-content-between">
                          <div className="blog__author d-flex align-items-center">
                            <div className="blog__author-thumb mr-10">
                              <img
                                src="/img/blog/author/author-3.jpg"
                                alt=""
                              />
                            </div>
                            <div className="blog__author-info">
                              <h5>Jim Séchen</h5>
                            </div>
                          </div>
                          <div className="blog__date d-flex align-items-center">
                            <i className="fal fa-clock" />
                            <span>April 02, 2022</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                  <div className="blog__wrapper">
                    <div className="blog__item white-bg mb-30 transition-3 fix">
                      <div className="blog__thumb w-img fix">
                        <Link href="blog/test-blog">
                          <img src="/img/blog/blog-4.jpg" alt="" />
                        </Link>
                      </div>
                      <div className="blog__content">
                        <div className="blog__tag">
                          <Link href="#" className="green">
                            Art &amp; Design
                          </Link>
                        </div>
                        <h3 className="blog__title">
                          <Link href="blog/test-blog">
                            Google Ads certifications: Are they worth it?
                          </Link>
                        </h3>
                        <div className="blog__meta d-flex align-items-center justify-content-between">
                          <div className="blog__author d-flex align-items-center">
                            <div className="blog__author-thumb mr-10">
                              <img
                                src="/img/blog/author/author-3.jpg"
                                alt=""
                              />
                            </div>
                            <div className="blog__author-info">
                              <h5>Jim Séchen</h5>
                            </div>
                          </div>
                          <div className="blog__date d-flex align-items-center">
                            <i className="fal fa-clock" />
                            <span>April 02, 2022</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                  <div className="blog__wrapper">
                    <div className="blog__item white-bg mb-30 transition-3 fix">
                      <div className="blog__thumb w-img fix">
                        <Link href="blog/test-blog">
                          <img src="/img/blog/blog-5.jpg" alt="" />
                        </Link>
                      </div>
                      <div className="blog__content">
                        <div className="blog__tag">
                          <Link href="#" className="orange">
                            Art &amp; Design
                          </Link>
                        </div>
                        <h3 className="blog__title">
                          <Link href="blog/test-blog">
                            14 Facebook Ad Examples for Ad Creative Inspiration
                          </Link>
                        </h3>
                        <div className="blog__meta d-flex align-items-center justify-content-between">
                          <div className="blog__author d-flex align-items-center">
                            <div className="blog__author-thumb mr-10">
                              <img
                                src="/img/blog/author/author-3.jpg"
                                alt=""
                              />
                            </div>
                            <div className="blog__author-info">
                              <h5>Jim Séchen</h5>
                            </div>
                          </div>
                          <div className="blog__date d-flex align-items-center">
                            <i className="fal fa-clock" />
                            <span>April 02, 2022</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                  <div className="blog__wrapper">
                    <div className="blog__item white-bg mb-30 transition-3 fix">
                      <div className="blog__thumb w-img fix">
                        <Link href="blog/test-blog">
                          <img src="/img/blog/blog-6.jpg" alt="" />
                        </Link>
                      </div>
                      <div className="blog__content">
                        <div className="blog__tag">
                          <Link href="#" className="blue">
                            Art &amp; Design
                          </Link>
                        </div>
                        <h3 className="blog__title">
                          <Link href="blog/test-blog">
                            How to manage Facebook ads for clients the right way
                          </Link>
                        </h3>
                        <div className="blog__meta d-flex align-items-center justify-content-between">
                          <div className="blog__author d-flex align-items-center">
                            <div className="blog__author-thumb mr-10">
                              <img
                                src="/img/blog/author/author-3.jpg"
                                alt=""
                              />
                            </div>
                            <div className="blog__author-info">
                              <h5>Jim Séchen</h5>
                            </div>
                          </div>
                          <div className="blog__date d-flex align-items-center">
                            <i className="fal fa-clock" />
                            <span>April 02, 2022</span>
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
                        <Link href="blog.html" className="link-btn link-prev">
                          Prev
                          <i className="arrow_left" />
                          <i className="arrow_left" />
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <span>1</span>
                        </Link>
                      </li>
                      <li className="active">
                        <Link href="blog.html">
                          <span>2</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="blog.html">
                          <span>3</span>
                        </Link>
                      </li>
                      <li className="next">
                        <Link href="blog.html" className="link-btn">
                          Next
                          <i className="arrow_right" />
                          <i className="arrow_right" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-4">
              <div className="blog__sidebar pl-70">
                <div className="sidebar__widget mb-60">
                  <div className="sidebar__widget-content">
                    <div className="sidebar__search p-relative">
                      <form action="#">
                        <input type="text" placeholder="Search for courses..." />
                        <button type="submit">
                          <svg
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 584.4 584.4"
                            xmlSpace="preserve"
                          >
                            <g>
                              <g>
                                <path
                                  className="st0"
                                  d="M565.7,474.9l-61.1-61.1c-3.8-3.8-8.8-5.9-13.9-5.9c-6.3,0-12.1,3-15.9,8.3c-16.3,22.4-36,42.1-58.4,58.4    c-4.8,3.5-7.8,8.8-8.3,14.5c-0.4,5.6,1.7,11.3,5.8,15.4l61.1,61.1c12.1,12.1,28.2,18.8,45.4,18.8c17.1,0,33.3-6.7,45.4-18.8    C590.7,540.6,590.7,499.9,565.7,474.9z"
                                />
                                <path
                                  className="st1"
                                  d="M254.6,509.1c140.4,0,254.5-114.2,254.5-254.5C509.1,114.2,394.9,0,254.6,0C114.2,0,0,114.2,0,254.5    C0,394.9,114.2,509.1,254.6,509.1z M254.6,76.4c98.2,0,178.1,79.9,178.1,178.1s-79.9,178.1-178.1,178.1S76.4,352.8,76.4,254.5    S156.3,76.4,254.6,76.4z"
                                />
                              </g>
                            </g>
                          </svg>
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="sidebar__widget mb-55">
                  <div className="sidebar__widget-head mb-35">
                    <h3 className="sidebar__widget-title">Recent posts</h3>
                  </div>
                  <div className="sidebar__widget-content">
                    <div className="rc__post-wrapper">
                      <div className="rc__post d-flex align-items-center">
                        <div className="rc__thumb mr-20">
                          <Link href="blog/test-blog">
                            <img src="/img/blog/sm/blog-sm-1.jpg" alt="" />
                          </Link>
                        </div>
                        <div className="rc__content">
                          <div className="rc__meta">
                            <span>October 15, 2021</span>
                          </div>
                          <h6 className="rc__title">
                            <Link href="blog/test-blog">
                              The Importance Intrinsic Motivation.
                            </Link>
                          </h6>
                        </div>
                      </div>
                      <div className="rc__post d-flex align-items-center">
                        <div className="rc__thumb mr-20">
                          <Link href="blog/test-blog">
                            <img src="/img/blog/sm/blog-sm-2.jpg" alt="" />
                          </Link>
                        </div>
                        <div className="rc__content">
                          <div className="rc__meta">
                            <span>March 26, 2021</span>
                          </div>
                          <h6 className="rc__title">
                            <Link href="blog/test-blog">
                              A Better Alternative To Grading Student.
                            </Link>
                          </h6>
                        </div>
                      </div>
                      <div className="rc__post d-flex align-items-center">
                        <div className="rc__thumb mr-20">
                          <Link href="blog/test-blog">
                            <img src="/img/blog/sm/blog-sm-3.jpg" alt="" />
                          </Link>
                        </div>
                        <div className="rc__content">
                          <div className="rc__meta">
                            <span>October 15, 2021</span>
                          </div>
                          <h6 className="rc__title">
                            <Link href="blog/test-blog">
                              Strategic Social Media &amp; Evolution of Visual
                            </Link>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sidebar__widget mb-55">
                  <div className="sidebar__widget-head mb-35">
                    <h3 className="sidebar__widget-title">Category</h3>
                  </div>
                  <div className="sidebar__widget-content">
                    <div className="sidebar__category">
                      <ul>
                        <li>
                          <Link href="blog.html">Category</Link>
                        </li>
                        <li>
                          <Link href="blog.html">Video &amp; Tips (4)</Link>
                        </li>
                        <li>
                          <Link href="blog.html">Education (8)</Link>
                        </li>
                        <li>
                          <Link href="blog.html">Business (5)</Link>
                        </li>
                        <li>
                          <Link href="blog.html">UX Design (3)</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="sidebar__widget mb-55">
                  <div className="sidebar__widget-head mb-35">
                    <h3 className="sidebar__widget-title">Tags</h3>
                  </div>
                  <div className="sidebar__widget-content">
                    <div className="sidebar__tag">
                      <Link href="#">Art &amp; Design</Link>
                      <Link href="#">Course</Link>
                      <Link href="#">Videos</Link>
                      <Link href="#">App</Link>
                      <Link href="#">Education</Link>
                      <Link href="#">Data Science</Link>
                      <Link href="#">Machine Learning</Link>
                      <Link href="#">Tips</Link>
                    </div>
                  </div>
                </div>
                <div className="sidebar__widget mb-55">
                  <div className="sidebar__banner w-img">
                    <img src="/img/blog/banner/banner-1.jpg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* blog area end */}
    </main>

  )
}

export default page