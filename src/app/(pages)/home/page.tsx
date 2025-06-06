import React from 'react'

const Home = () => {
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
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
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
                      <a href="course-details.html">Data Science</a>
                    </h4>
                    <p>Data is Everything</p>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                <div className="category__item mb-30 transition-3 d-flex align-items-center">
                  <div className="category__icon mr-30">
                    <svg viewBox="0 0 512 512">
                      <g>
                        <path
                          className="st0"
                          d="M111.3,491.6C60.1,487.1,20,444.2,20,392V223.7c0-31.2,14.6-60.6,39.4-79.5l136-103.7   c35.8-27.3,85.5-27.3,121.3,0l9.2,7c-24.6-2.4-49.8,4.2-70.5,20L93.6,190.8C85,197.4,80,207.5,80,218.3V419   C80,447.6,92,473.4,111.3,491.6L111.3,491.6z"
                        />
                        <path
                          className="st1"
                          d="M392,512H120C53.8,512,0,458.1,0,392V223.7c0-37.2,17.7-72.9,47.2-95.4l136-103.7   c42.8-32.7,102.7-32.7,145.5,0L372,57.5V32c0-11,9-20,20-20s20,9,20,20v65.9c0,7.6-4.3,14.5-11.1,17.9c-6.8,3.4-15,2.6-21-2   l-75.4-57.4c-28.6-21.8-68.5-21.8-97,0l-136,103.7c-19.7,15-31.5,38.8-31.5,63.6V392c0,44.1,35.9,80,80,80h272   c44.1,0,80-35.9,80-80V223.7c0-25.1-11.6-49-31.1-63.8c-8.8-6.7-10.5-19.2-3.8-28s19.3-10.5,28-3.8c29.3,22.4,46.9,58.1,46.9,95.6   V392C512,458.1,458.2,512,392,512z"
                        />
                        <path
                          className="st2"
                          d="M241,256c0,13.8-11.2,25-25,25s-25-11.2-25-25s11.2-25,25-25S241,242.2,241,256z M296,231   c-13.8,0-25,11.2-25,25c0,13.8,11.2,25,25,25s25-11.2,25-25C321,242.2,309.8,231,296,231z M216,311c-13.8,0-25,11.2-25,25   s11.2,25,25,25s25-11.2,25-25S229.8,311,216,311z M296,311c-13.8,0-25,11.2-25,25s11.2,25,25,25s25-11.2,25-25S309.8,311,296,311z"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="category__content">
                    <h4 className="category__title">
                      <a href="course-details.html">Business</a>
                    </h4>
                    <p>Improve your business</p>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                <div className="category__item mb-30 transition-3 d-flex align-items-center">
                  <div className="category__icon mr-30">
                    <svg viewBox="0 0 512 512">
                      <g>
                        <path
                          className="st0"
                          d="M81,392V120c0-55.2,44.8-100,100-100h-61C64.8,20,20,64.8,20,120v272c0,55.2,44.8,100,100,100h61   C125.8,492,81,447.2,81,392z"
                        />
                        <path
                          className="st1"
                          d="M392,512H120C53.8,512,0,458.2,0,392V120C0,53.8,53.8,0,120,0h208c11,0,20,9,20,20s-9,20-20,20H120   c-44.1,0-80,35.9-80,80v272c0,44.1,35.9,80,80,80h272c44.1,0,80-35.9,80-80V207c0-11,9-20,20-20s20,9,20,20v185   C512,458.2,458.2,512,392,512z M385.3,236.8l112.1-134c0,0,0-0.1,0.1-0.1c22.1-26.7,18.4-66.3-8.3-88.4s-66.3-18.4-88.4,8.3   l-0.1,0.1L290.5,158.4c-7,8.6-5.7,21.2,2.9,28.1c8.6,7,21.2,5.7,28.1-2.9L431.7,48.2c8-9.6,22.4-10.9,32-2.9c9.7,8,11,22.4,3,32   l-112,133.9c-7.1,8.5-6,21.1,2.5,28.2c3.7,3.1,8.3,4.7,12.8,4.7C375.7,244,381.4,241.6,385.3,236.8L385.3,236.8z"
                        />
                        <path
                          className="st2"
                          d="M169.5,433c-20.6,0-40.5-11.2-50.7-28.5c-8.7-14.8-9-31.6-0.9-46.3c10-18.1,15.8-34.9,21.3-51.1   c9.4-27.7,18.4-53.8,45.3-76.2c19.6-16.3,44.3-23.9,69.5-21.5c25.3,2.4,48.2,14.6,64.3,34.4c14,17.1,21.7,38.8,21.7,61.1   c0,39.4-23.7,74.5-66.7,99C242.2,421.6,201.4,433,169.5,433L169.5,433z M244.9,249c-12.7,0-24.9,4.4-34.9,12.7   c-18.3,15.2-24.5,33.3-33,58.4c-5.8,17-12.4,36.4-24.2,57.6c-0.6,1.1-1.7,3.1,0.4,6.6c2.6,4.4,9,8.8,16.3,8.8   C213.8,393.1,300,362,300,305c0-13.3-4.4-25.6-12.6-35.7c-9.4-11.4-22.6-18.5-37.2-19.9C248.4,249.1,246.6,249,244.9,249L244.9,249   z"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="category__content">
                    <h4 className="category__title">
                      <a href="course-details.html">Art &amp; Design</a>
                    </h4>
                    <p>Fun &amp; Challenging</p>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                <div className="category__item mb-30 transition-3 d-flex align-items-center">
                  <div className="category__icon mr-30">
                    <svg viewBox="0 0 512 512">
                      <g>
                        <path
                          className="st0"
                          d="M106.1,341.9V120c0-55.2,44.8-100,100-100h-61c-55.2,0-100,44.8-100,100v221.9c0,55.2,44.8,100,100,100h61   C150.8,441.8,106.1,397.1,106.1,341.9z"
                        />
                        <path
                          className="st1"
                          d="M442.8,512c-10.5,0-20.9-3.9-29.2-11.3l-49.9-43.9c-8.3-7.3-9.1-19.9-1.8-28.2c7.3-8.3,19.9-9.1,28.2-1.8   l49.9,43.9c0.1,0,0.1,0.1,0.2,0.1c0.5,0.4,1.9,1.7,4.3,0.7c2.4-1.1,2.4-3,2.4-3.7V120c0-44.1-35.9-80-80-80H145   c-44.1,0-80,35.9-80,80v221.9c0,44.1,35.9,80,80,80h154c11,0,20,9,20,20s-9,20-20,20H145c-66.1,0-120-53.8-120-120V120   C25.1,53.8,78.9,0,145,0h222c66.1,0,120,53.8,120,120v348c0,17.6-10,33-26.1,40.2C455,510.7,448.8,512,442.8,512L442.8,512z    M350.7,264c-9.3-5.9-21.7-3.2-27.6,6.1c-0.2,0.4-25.1,38.7-67.1,38.7s-67.9-38.3-68.1-38.7c-5.9-9.3-18.3-12.1-27.6-6.1   c-9.3,5.9-12.1,18.3-6.1,27.6c1.5,2.3,38.2,57.2,101.8,57.2s99.3-54.9,100.8-57.2C362.8,282.3,360,270,350.7,264z"
                        />
                        <path
                          className="st2"
                          d="M334,211.9c-11,0-20-9-20-20v-55c0-11,9-20,20-20s20,9,20,20v55C354,203,345,211.9,334,211.9z M199,191.9v-55   c0-11-9-20-20-20s-20,9-20,20v55c0,11,9,20,20,20S199,203,199,191.9z"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="category__content">
                    <h4 className="category__title">
                      <a href="course-details.html">Lifestyle</a>
                    </h4>
                    <p>New Skills, New You</p>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                <div className="category__item mb-30 transition-3 d-flex align-items-center">
                  <div className="category__icon mr-30">
                    <svg viewBox="0 0 512 512">
                      <g>
                        <path
                          className="st0"
                          d="M81.5,276c0-92.5,58.2-171.5,140-202.2c-9.2-7.6-21.6-11.2-34.4-8.2C91.4,87.7,20,173.5,20,276   c0,119.6,96.3,216,216,216c10.4,0,20.7-0.8,30.7-2.2C161.7,475,81.5,385.2,81.5,276z"
                        />
                        <path
                          className="st1"
                          d="M236,512c-63.2,0-122.5-24.5-167-69S0,339.2,0,276c0-53.6,18.5-106.2,52.1-147.9c33.1-41.1,79.4-70.2,130.5-82   c17.9-4.1,36.3,0,50.7,11.5s22.7,28.6,22.7,47V236c0,11,9,20,20,20h131.4c18.4,0,35.6,8.3,47,22.7c11.4,14.4,15.6,32.9,11.5,50.7   c-11.8,51.1-41,97.4-82,130.5C342.1,493.5,289.6,512,236,512L236,512z M196.1,84.6c-1.5,0-3,0.2-4.5,0.5   C102.3,105.7,40,184.2,40,276c0,52.5,20.3,101.8,57.3,138.7c36.9,37,86.2,57.3,138.7,57.3c91.8,0,170.3-62.3,190.9-151.6   c1.4-5.9,0-12-3.8-16.8s-9.6-7.6-15.7-7.6H276c-33.1,0-60-26.9-60-60V104.6c0-6.1-2.8-11.9-7.6-15.7   C204.8,86,200.5,84.6,196.1,84.6L196.1,84.6z M187.1,65.6L187.1,65.6L187.1,65.6z"
                        />
                        <path
                          className="st2"
                          d="M450.6,216h-93.2c-33.9,0-61.4-27.6-61.4-61.4V61.4c0-19.7,9.1-37.7,24.9-49.4c15.9-11.7,35.9-15,54.9-9.2   c31.3,9.7,60.1,27,83.2,50.2c23.2,23.2,40.5,51.9,50.2,83.2c5.9,18.9,2.5,38.9-9.3,54.8C488.3,206.9,470.3,216,450.6,216L450.6,216   z M357.4,40c-4.5,0-9,1.4-12.8,4.2c-5.5,4.1-8.7,10.3-8.7,17.2v93.2c0,11.8,9.6,21.4,21.4,21.4h93.2c6.9,0,13.1-3.2,17.2-8.7   c4.1-5.6,5.3-12.6,3.2-19.3c-7.8-25.1-21.7-48.2-40.3-66.8C412.1,62.7,389,48.8,363.9,41C361.8,40.4,359.6,40,357.4,40z"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="category__content">
                    <h4 className="category__title">
                      <a href="course-details.html">Marketing</a>
                    </h4>
                    <p>Improve your business</p>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                <div className="category__item mb-30 transition-3 d-flex align-items-center">
                  <div className="category__icon mr-30">
                    <svg viewBox="0 0 512 512">
                      <g>
                        <path
                          className="st4"
                          d="M438,512c-40.8,0-74-33.2-74-74V74c0-40.8,33.2-74,74-74s74,33.2,74,74v364C512,478.8,478.8,512,438,512z    M438,40c-18.7,0-34,15.3-34,34v364c0,18.7,15.3,34,34,34s34-15.3,34-34V74C472,55.3,456.7,40,438,40z M74,512   c-40.8,0-74-33.2-74-74v-82c0-40.8,33.2-74,74-74s74,33.2,74,74v82C148,478.8,114.8,512,74,512z M74,322c-18.7,0-34,15.3-34,34v82   c0,18.7,15.3,34,34,34s34-15.3,34-34v-82C108,337.3,92.7,322,74,322z M256,512c-40.8,0-74-33.2-74-74V213c0-40.8,33.2-74,74-74   s74,33.2,74,74v225C330,478.8,296.8,512,256,512z M256,179c-18.7,0-34,15.3-34,34v225c0,18.7,15.3,34,34,34s34-15.3,34-34V213   C290,194.3,274.7,179,256,179z"
                        />
                        <path
                          className="st5"
                          d="M139,162.3c0-31.2-27.8-56.7-61.9-56.7c-14.5,0-25.1-7-25.1-16.7c0-9.2,7.4-16.7,16.5-16.7   c9.2,0,21.1,1,40.2,8.4c10.3,4,21.9-1.1,25.9-11.4s-1.1-21.9-11.4-25.9c-9.9-3.9-18.6-6.4-26.2-8.1V20C97,9,88,0,77,0S57,9,57,20   v13.5C31.3,38.9,12,61.7,12,89c0,32.3,28,56.7,65.1,56.7c11.9,0,21.9,7.6,21.9,16.7c0,8.9-8.3,16.7-17.7,16.7   c-7.3,0-25.8-2.7-43.9-9.9c-10.3-4.1-21.9,0.9-26,11.2s0.9,21.9,11.2,26c11.6,4.6,23.7,7.9,34.4,10V228c0,11,9,20,20,20s20-9,20-20   v-11.2c9.1-2.6,17.6-7.4,24.6-14.2C132.8,191.9,139,177.6,139,162.3L139,162.3z"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="category__content">
                    <h4 className="category__title">
                      <a href="course-details.html">Finance</a>
                    </h4>
                    <p>Fun &amp; Challenging</p>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                <div className="category__item mb-30 transition-3 d-flex align-items-center">
                  <div className="category__icon mr-30">
                    <svg viewBox="0 0 512 512">
                      <g>
                        <path
                          className="st0"
                          d="M59.3,194.1c0-31.1,14.5-60.5,39.3-79.4l96.8-74.4c35.8-27.3,85.3-27.3,121.1,0l34.9,41.2   c-35.8-27.3-85.3-27.3-121.1,0L118,170.2c-24.8,18.9-39.3,48.2-39.3,79.4L59.3,194.1z M24.5,390l-0.2,0.3   c-8.8,16.9-2.4,37.8,14.4,46.8c12.9,6.9,27.7,14.5,44.7,21.8c-0.1-1.3-0.2-5.8-0.2-6.7c-12-10.3-15.7-27.8-8.1-42.4l0.2-0.3   c8.2-15.7,26.3-21.7,43-16.4c0-0.4,0.1-0.8,0.1-1.3c-18.2-5.9-34.6-10.2-48.8-15.6C52.4,369.7,33,373.6,24.5,390L24.5,390z    M214.2,327.9c-7.3-1-14.6-0.7-21.3,1.1c-11.4,3.2-20.9,11.1-25.7,22.7c-9.2,22.4,1.8,44.8,26.8,53.9c13.8,5,30.1,7.1,46.9,7.5   c0.2-3.5,0.5-7,0.9-10.4c-15.5-8.4-21.8-24.3-15.3-40.2c3.8-9.3,11.4-15.3,20.5-17.9c0.5-0.1,1-0.2,1.5-0.4   c0.3-4.6,0.6-9.2,0.8-13.8C238.3,330.5,226.7,329.6,214.2,327.9z"
                        />
                        <path
                          className="st1"
                          d="M6.7,381.8c13-25,42.5-35.5,70.1-25.1c19.2,7.3,42.8,16.2,68.4,23.3c-2.4-11.4-1.2-23.4,3.5-34.9   c6.9-16.7,21-29.1,38.8-34.1c9.1-2.5,19-3.1,29.3-1.7c68.4,9.3,109.1-13.8,145.1-34.2c24.2-13.7,47-26.7,73.7-26.7   c31.2,0,61.9,10.9,61.9,10.9c10.5,3.3,16.4,14.5,13.1,25s-14.5,16.4-25,13.1c0,0-25.5-9.1-49.9-9.1c-16.2,0-32.8,9.5-54,21.5   c-31.6,18-73.1,41.5-134.8,41.5c-11.1,0-22.9-0.8-35.3-2.5c-4.9-0.7-9.5-0.5-13.2,0.6c-4.2,1.2-9.8,4-12.6,10.8   c-2.2,5.3-2.3,10.2-0.3,14.7c2.4,5.5,7.9,10,15.5,12.8c10.9,4,26.5,6.1,44.1,6.3c19,0.1,37.5-2.1,53.8-6.3   c10.7-2.8,21.6,3.6,24.4,14.2c2.8,10.7-3.6,21.6-14.2,24.4c-19.1,5-41,7.6-64,7.6C169,433.8,104,409.7,62.6,394   c-6.9-2.6-16.5-1.5-20.7,6.5c-3.7,7.2-1,16.1,6.1,20C98.1,447.3,156.2,472,241.7,472c76.1,0,146.1-29.4,191.5-54   c35-19,60.5-13,63.3-12.2v0.1c8.5,2.3,14.9,10,14.9,19.3c0,11-8.9,20-20,20c-1.9,0-3.8-0.3-5.5-0.8c-3.4-0.4-15.7-0.9-33.6,8.8   C402.9,480,326.3,512,241.8,512c-107.2,0-178.3-38-212.5-56.2C3,441.7-7.1,408.3,6.7,381.8L6.7,381.8z"
                        />
                        <path
                          className="st1"
                          d="M486.9,443.6L486.9,443.6L486.9,443.6z M79.2,293.4v-99.3c0-24.7,11.7-48.5,31.5-63.5l96.8-74.3   c28.5-21.7,68.3-21.7,96.9,0l97.8,74.4c20,15.2,31.4,38.2,31.4,63c0,11,8.9,20,20,20c11,0,20-8.9,20-20c0-37.4-17.2-71.9-47.2-94.8   l-97.8-74.4C285.8-8.2,226-8.2,183.2,24.5L86.4,98.8c-29.5,22.5-47.1,58.1-47.1,95.2v99.3c0,11,8.9,20,20,20S79.2,304.4,79.2,293.4   L79.2,293.4z"
                        />
                        <path
                          className="st2"
                          d="M240.9,151.6c0,13.8-11.2,25-25,25s-25-11.2-25-25s11.2-25,25-25S240.9,137.9,240.9,151.6z M295.8,126.7   c-13.8,0-25,11.2-25,25s11.2,25,25,25s25-11.2,25-25S309.6,126.7,295.8,126.7z M216,206.5c-13.8,0-25,11.2-25,25s11.2,25,25,25   s25-11.2,25-25S229.8,206.5,216,206.5L216,206.5z M295.8,206.5c-13.8,0-25,11.2-25,25s11.2,25,25,25s25-11.2,25-25   S309.6,206.5,295.8,206.5L295.8,206.5z"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="category__content">
                    <h4 className="category__title">
                      <a href="course-details.html">Health &amp; Fitness</a>
                    </h4>
                    <p>Invest to Your Body</p>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                <div className="category__item mb-30 transition-3 d-flex align-items-center">
                  <div className="category__icon mr-30">
                    <svg viewBox="0 0 512 512">
                      <g>
                        <path
                          className="st0"
                          d="M128.9,421.4c-37.9-36.3-49-86.7-49-122.8c0-54.9,32.9-79.8,68.9-96.7V181C101.9,205.1,20,217,20,303.6   c0,36.1,11.1,86.5,48.9,122.9c36.4,37.8,86.8,48.9,122.9,48.9c14.5,0,26.9-2.3,37.6-6.4C196.7,465.1,158.2,452,128.9,421.4z"
                        />
                        <g>
                          <path
                            className="st1"
                            d="M505.6,38.8l-12.4-11.4c-15.9-14.7-40.3-14.2-55.6,1.3L309.9,158c-4.8,4.9-10.4,3.5-12.5,2.7s-7.1-3.3-7.6-10    c-0.8-10.8,0-20.7,2.2-27.8c5-15.6,2.6-32-6.5-45.2c-9.3-13.5-24.6-22-40.8-22.9c-13.1-0.7-32.1,4.9-46.4,22.5    c-10,12.4-17.1,27.7-24,42.5c-6,13-12.3,26.5-18.4,32.4c-0.1,0.1-0.2,0.2-0.3,0.3c-8.6,8.6-26.3,15.7-45,23.3    C87.1,185.3,60.4,196,39,214.5c-25.9,22.4-39,52.4-39,89.1c0,25.3,5.3,89.3,54.8,137c47.7,49.4,111.7,54.8,137,54.8    c36.7,0,66.6-13.1,89-39.1c18.5-21.4,29.2-48.1,38.7-71.6c7.5-18.7,14.9-36.6,23.5-45.2l0,0l0,0c5.9-6.1,19.4-12.4,32.4-18.4    c14.8-6.9,30.1-14,42.5-24c17.6-14.3,23.2-33.3,22.5-46.4c-0.8-16.2-9.4-31.5-22.9-40.8c-13.1-9.1-29.6-11.5-45.2-6.5    c-10.5,3.3-16.3,14.6-13,25.1s14.6,16.3,25.1,13c3.8-1.2,7.3-0.8,10.3,1.3c3.3,2.3,5.5,6.2,5.7,10.1c0,0.1,0.3,6.8-7.7,13.2    c-8.5,6.9-21.6,12.9-34.2,18.8c-17.1,7.9-33.2,15.4-44.3,26.8c-14.3,14.4-22.9,35.7-31.9,58.2c-20.8,51.7-38.4,85.7-90.6,85.7    c-20.2,0-71.3-4.2-108.5-42.8c-0.2-0.2-0.4-0.4-0.6-0.6C44.1,374.9,40,323.8,40,303.6c0-52.3,33.9-69.8,85.7-90.6    c22.5-9.1,43.8-17.6,58.2-31.9c11.5-11.1,18.9-27.2,26.8-44.3c5.9-12.6,11.9-25.7,18.8-34.2c6.5-8,13.2-7.7,13.2-7.7    c3.8,0.2,7.8,2.4,10.1,5.7c2.1,3,2.5,6.5,1.3,10.3c-3.8,12.1-5.2,26.9-4,43c1.5,20.3,14.4,37.3,33.6,44.4    c19.3,7.1,40.2,2.5,54.7-12.1L466.1,56.7l12.4,11.4c8.1,7.5,20.7,7,28.2-1.1S513.7,46.3,505.6,38.8L505.6,38.8z"
                          />
                          <path
                            className="st1"
                            d="M207.6,209.5c-7.8,7.8-7.8,20.5,0,28.3l49.9,49.9c3.9,3.9,9,5.9,14.1,5.9s10.2-2,14.1-5.9    c7.8-7.8,7.8-20.5,0-28.3l-49.9-49.9C228.1,201.7,215.4,201.7,207.6,209.5L207.6,209.5z"
                          />
                        </g>
                        <path
                          className="st2"
                          d="M215.8,350.5c-5.1,0-10.2-2-14.1-5.9l-49.9-49.9c-7.8-7.8-7.8-20.5,0-28.3s20.5-7.8,28.3,0l49.9,49.9   c7.8,7.8,7.8,20.5,0,28.3C226,348.6,220.9,350.5,215.8,350.5z M173.9,400.6c7.8-7.8,7.8-20.5,0-28.3L124,322.4   c-7.8-7.8-20.5-7.8-28.3,0s-7.8,20.5,0,28.3l49.9,49.9c3.9,3.9,9,5.9,14.1,5.9C164.9,406.4,170,404.5,173.9,400.6z"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="category__content">
                    <h4 className="category__title">
                      <a href="course-details.html">Music</a>
                    </h4>
                    <p>Major or Minor</p>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                <div className="category__item mb-30 transition-3 d-flex align-items-center">
                  <div className="category__icon mr-30">
                    <svg viewBox="0 0 512 512">
                      <g>
                        <path
                          className="st0"
                          d="M91.5,96c0-23.1,12.7-43.2,31.5-53.7c-8.9-5-19.1-7.8-30-7.8C59,34.5,31.5,62,31.5,96S59,157.5,93,157.5   c10.9,0,21.1-2.8,30-7.8C104.2,139.2,91.5,119.1,91.5,96z"
                        />
                        <path
                          className="st1"
                          d="M158,226v178.6c0,22.6-6.6,44.5-19.2,63.3c-0.1,0.1-0.1,0.1-0.2,0.2l-24.2,35.2c-3.7,5.4-9.9,8.7-16.5,8.7   s-12.8-3.2-16.5-8.7l-24.2-35.2c-0.1-0.1-0.1-0.1-0.2-0.2c-12.4-18.9-19-40.7-19-63.3V229c0-11,9-20,20-20s20,9,20,20v175.6   c0,14.6,4.3,28.8,12.4,41l7.6,11.1l7.6-11.1c8.1-12.2,12.4-26.4,12.4-41V226c0-11,9-20,20-20S158,215,158,226L158,226z M503.3,81.5   l-35.2-24.2c-0.1-0.1-0.1-0.1-0.2-0.2C449,44.6,427.2,38,404.6,38H229c-11,0-20,9-20,20s9,20,20,20h175.6c14.6,0,28.8,4.3,41,12.4   l11.1,7.6l-11.1,7.6c-12.2,8.1-26.4,12.4-41,12.4H225c-11,0-20,9-20,20s9,20,20,20h179.6c22.6,0,44.5-6.6,63.3-19.2   c0.1-0.1,0.1-0.1,0.2-0.2l35.2-24.2c5.4-3.7,8.7-9.9,8.7-16.5S508.8,85.2,503.3,81.5z M176,94.5c0,44.9-36.6,81.5-81.5,81.5   S13,139.4,13,94.5c0-15.2,4.2-29.5,11.5-41.7L5.9,34.1C-2,26.3-2,13.7,5.9,5.9s20.5-7.8,28.3,0l18.7,18.7C65,17.2,79.3,13,94.5,13   C139.4,13,176,49.6,176,94.5z M136,94.5C136,71.6,117.4,53,94.5,53S53,71.6,53,94.5S71.6,136,94.5,136S136,117.4,136,94.5z"
                        />
                        <path
                          className="st2"
                          d="M198,512c-11,0-20-9-20-20s9-20,20-20c151.1,0,274-122.9,274-274c0-11,9-20,20-20s20,9,20,20   c0,83.9-32.7,162.7-92,222S281.9,512,198,512z"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="category__content">
                    <h4 className="category__title">
                      <a href="course-details.html">Academics</a>
                    </h4>
                    <p>High Education Level</p>
                  </div>
                </div>
              </div>
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