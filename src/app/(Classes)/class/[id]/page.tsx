import TabButton from '@/components/button/TabButton';

interface ClassTypes {
  tab_id: String;
}

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <main>
      {/* page title area start */}
      <section className="page__title-area pt-120 pb-90">
        <div className="page__title-shape">
          <img
            className="page-title-shape-5 d-none d-sm-block"
            src="/img/page-title/page-title-shape-1.png"
            alt=""
          />
          <img
            className="page-title-shape-6"
            src="/img/page-title/page-title-shape-6.png"
            alt=""
          />
          <img
            className="page-title-shape-7"
            src="/img/page-title/page-title-shape-4.png"
            alt=""
          />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xxl-8 col-xl-8 col-lg-8">
              <div className="course__wrapper">
                <div className="page__title-content mb-25">
                  <div className="page__title-breadcrumb">
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                          <a href="index.html">Home {id}</a>
                        </li>
                        <li className="breadcrumb-item">
                          <a href="course-grid.html">Courses</a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                          The business Intelligence analyst Course 2022
                        </li>
                      </ol>
                    </nav>
                  </div>
                  <span className="page__title-pre">Development</span>
                  <h5 className="page__title-3">
                    The business Intelligence analyst Course 2022
                  </h5>
                </div>
                <div className="course__meta-2 d-sm-flex mb-30">
                  <div className="course__teacher-3 d-flex align-items-center mr-70 mb-30">
                    <div className="course__teacher-thumb-3 mr-15">
                      <img src="/img/course/teacher/teacher-1.jpg" alt="" />
                    </div>
                    <div className="course__teacher-info-3">
                      <h5>Teacher</h5>
                      <p>
                        <a href="#">Elon Gated</a>
                      </p>
                    </div>
                  </div>
                  <div className="course__update mr-80 mb-30">
                    <h5>Last Update:</h5>
                    <p>July 24, 2022</p>
                  </div>
                  <div className="course__rating-2 mb-30">
                    <h5>Review:</h5>
                    <div className="course__rating-inner d-flex align-items-center">
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
                      <p>4.5</p>
                    </div>
                  </div>
                </div>
                <div className="course__img w-img mb-30">
                  <img
                    src="/img/course/details/course-details-1.jpg"
                    alt=""
                  />
                </div>
                <div className="course__tab-2 mb-45">
                  <ul className="nav nav-tabs" id="courseTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <TabButton tab_id='1' />
                    </li>
                    <li className="nav-item" role="presentation">
                      <TabButton tab_id='2' />
                    </li>
                    <li className="nav-item" role="presentation">
                      <TabButton tab_id='3' />
                    </li>
                    <li className="nav-item" role="presentation">
                      <TabButton tab_id='4' />
                    </li>
                  </ul>
                </div>
                <div className="course__tab-content mb-95">
                  <div className="tab-content" id="courseTabContent">

                    <div
                      className="tab-pane fade show active"
                      id="description"
                      role="tabpanel"
                      aria-labelledby="description-tab"
                    >
                      <div className="course__description">
                        <h3>Course Overview</h3>
                        <p>
                          Only a quid me old mucker squiffy tomfoolery grub cheers
                          ruddy cor blimey guvnor in my flat, up the duff Eaton car
                          boot up the kyver pardon you A bit of how's your father
                          David skive off sloshed, don't get shirty with me chip
                          shop vagabond crikey bugger Queen's English chap. Matie
                          boy nancy boy bite your arm off up the kyver old no biggie
                          fantastic boot, David have it show off show off pick your
                          nose and blow off lost the plot porkies bits and bobs only
                          a quid bugger all mate, absolutely bladdered bamboozled
                          it's your round don't get shirty with me down the pub
                          well. Give us a bell bits and bobs Charles he lost his
                          bottle super my lady cras starkers bite your arm off
                          Queen's English, pardon me horse play Elizabeth a blinding
                          shot chinwag knees up do one David, blag cup of tea Eaton
                          so I said bleeding haggle James Bond cup of char. Gosh
                          William ummm I'm telling crikey burke I don't want no agro
                          A bit of how's your father bugger all mate off his nut
                          that, what a plonker cuppa owt to do with me nancy boy
                          show off show off pick your nose and blow off spiffing
                          good time lavatory me old mucker, chimney pot what a load
                          of rubbish boot squiffy lost the plot brolly wellies
                          excuse my french.
                        </p>
                        <div className="course__tag-2 mb-35 mt-35">
                          <i className="fal fa-tag" />
                          <a href="#">Big data,</a>
                          <a href="#">Data analysis,</a>
                          <a href="#">Data modeling</a>
                        </div>
                        <div className="course__description-list mb-45">
                          <h4>What is the Target Audience?</h4>
                          <ul>
                            <li>
                              {" "}
                              <i className="icon_check" /> Business's managers,
                              leaders
                            </li>
                            <li>
                              {" "}
                              <i className="icon_check" /> Downloadable lectures,
                              code and design assets for all projects
                            </li>
                            <li>
                              {" "}
                              <i className="icon_check" /> Anyone who is finding a
                              chance to get the promotion
                            </li>
                          </ul>
                        </div>
                        <div className="course__instructor mb-45">
                          <h3>Other Instructors</h3>
                          <div className="course__instructor-wrapper d-md-flex align-items-center">
                            <div className="course__instructor-item d-flex align-items-center mr-70">
                              <div className="course__instructor-thumb mr-20">
                                <img
                                  src="/img/course/teacher/teacher-3.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="course__instructor-content">
                                <h3>Eleanor Fant</h3>
                                <p>Instructor</p>
                              </div>
                            </div>
                            <div className="course__instructor-item d-flex align-items-center mr-70">
                              <div className="course__instructor-thumb mr-20">
                                <img
                                  src="/img/course/teacher/teacher-2.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="course__instructor-content">
                                <h3>Lauren Stamps</h3>
                                <p>Teacher</p>
                              </div>
                            </div>
                            <div className="course__instructor-item d-flex align-items-center mr-70">
                              <div className="course__instructor-thumb mr-20">
                                <img
                                  src="/img/course/teacher/teacher-1.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="course__instructor-content">
                                <h3>Jonquil Von</h3>
                                <p>Associate</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="curriculum"
                      role="tabpanel"
                      aria-labelledby="curriculum-tab"
                    >
                      <div className="course__curriculum">
                        <div className="accordion" id="course__accordion">
                          <div className="accordion-item mb-50">
                            <h2 className="accordion-header" id="week-01">
                              <button
                                className="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#week-01-content"
                                aria-expanded="true"
                                aria-controls="week-01-content"
                              >
                                Week 01
                              </button>
                            </h2>
                            <div
                              id="week-01-content"
                              className="accordion-collapse collapse show"
                              aria-labelledby="week-01"
                              data-bs-parent="#course__accordion"
                            >
                              <div className="accordion-body">
                                <div className="course__curriculum-content d-sm-flex justify-content-between align-items-center">
                                  <div className="course__curriculum-info">
                                    <svg className="document" viewBox="0 0 24 24">
                                      <path
                                        className="st0"
                                        d="M14,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8L14,2z"
                                      />
                                      <polyline
                                        className="st0"
                                        points="14,2 14,8 20,8 "
                                      />
                                      <line
                                        className="st0"
                                        x1={16}
                                        y1={13}
                                        x2={8}
                                        y2={13}
                                      />
                                      <line
                                        className="st0"
                                        x1={16}
                                        y1={17}
                                        x2={8}
                                        y2={17}
                                      />
                                      <polyline
                                        className="st0"
                                        points="10,9 9,9 8,9 "
                                      />
                                    </svg>
                                    <h3>
                                      {" "}
                                      <span>Reading:</span> Ut enim ad minim veniam
                                    </h3>
                                  </div>
                                  <div className="course__curriculum-meta">
                                    <span className="time">
                                      {" "}
                                      <i className="icon_clock_alt" /> 14 minutes
                                    </span>
                                    <span className="question">2 questions</span>
                                  </div>
                                </div>
                                <div className="course__curriculum-content d-sm-flex justify-content-between align-items-center">
                                  <div className="course__curriculum-info">
                                    <svg viewBox="0 0 24 24">
                                      <polygon
                                        className="st0"
                                        points="23,7 16,12 23,17 "
                                      />
                                      <path
                                        className="st0"
                                        d="M3,5h11c1.1,0,2,0.9,2,2v10c0,1.1-0.9,2-2,2H3c-1.1,0-2-0.9-2-2V7C1,5.9,1.9,5,3,5z"
                                      />
                                    </svg>
                                    <h3>
                                      {" "}
                                      <span>Video: </span> Greetings and
                                      introduction
                                    </h3>
                                  </div>
                                  <div className="course__curriculum-meta">
                                    <span className="time">
                                      {" "}
                                      <i className="icon_clock_alt" /> 15 minutes
                                    </span>
                                  </div>
                                </div>
                                <div className="course__curriculum-content d-sm-flex justify-content-between align-items-center">
                                  <div className="course__curriculum-info">
                                    <svg viewBox="0 0 16 16">
                                      <path
                                        className="st0"
                                        d="M2,12V8c0-3.3,2.9-6,6.4-6s6.4,2.7,6.4,6v4"
                                      />
                                      <path
                                        className="st0"
                                        d="M14.8,12.7c0,0.7-0.6,1.3-1.4,1.3h-0.7c-0.8,0-1.4-0.6-1.4-1.3v-2c0-0.7,0.6-1.3,1.4-1.3h2.1V12.7z M2,12.7  C2,13.4,2.6,14,3.3,14H4c0.7,0,1.3-0.6,1.3-1.3v-2c0-0.7-0.6-1.3-1.3-1.3H2V12.7z"
                                      />
                                    </svg>
                                    <h3>
                                      {" "}
                                      <span>Audio:</span> Interactive lesson
                                    </h3>
                                  </div>
                                  <div className="course__curriculum-meta">
                                    <span className="time">
                                      {" "}
                                      <i className="icon_clock_alt" /> 7 minutes
                                    </span>
                                    <span className="question">3 questions</span>
                                  </div>
                                </div>
                                <div className="course__curriculum-content d-sm-flex justify-content-between align-items-center">
                                  <div className="course__curriculum-info">
                                    <svg className="document" viewBox="0 0 24 24">
                                      <path
                                        className="st0"
                                        d="M14,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8L14,2z"
                                      />
                                      <polyline
                                        className="st0"
                                        points="14,2 14,8 20,8 "
                                      />
                                      <line
                                        className="st0"
                                        x1={16}
                                        y1={13}
                                        x2={8}
                                        y2={13}
                                      />
                                      <line
                                        className="st0"
                                        x1={16}
                                        y1={17}
                                        x2={8}
                                        y2={17}
                                      />
                                      <polyline
                                        className="st0"
                                        points="10,9 9,9 8,9 "
                                      />
                                    </svg>
                                    <h3>
                                      {" "}
                                      <span>Reading: </span> Ut enim ad minim veniam
                                    </h3>
                                  </div>
                                  <div className="course__curriculum-meta">
                                    <span className="time">
                                      {" "}
                                      <i className="icon_clock_alt" /> 22 minutes
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="accordion" id="course__accordion-2">
                          <div className="accordion-item mb-50">
                            <h2 className="accordion-header" id="week-02">
                              <button
                                className="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#week-02-content"
                                aria-expanded="true"
                                aria-controls="week-02-content"
                              >
                                Week 02
                              </button>
                            </h2>
                            <div
                              id="week-02-content"
                              className="accordion-collapse  collapse show"
                              aria-labelledby="week-02"
                              data-bs-parent="#course__accordion-2"
                            >
                              <div className="accordion-body">
                                <div className="course__curriculum-content d-sm-flex justify-content-between align-items-center">
                                  <div className="course__curriculum-info">
                                    <svg className="document" viewBox="0 0 24 24">
                                      <path
                                        className="st0"
                                        d="M14,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8L14,2z"
                                      />
                                      <polyline
                                        className="st0"
                                        points="14,2 14,8 20,8 "
                                      />
                                      <line
                                        className="st0"
                                        x1={16}
                                        y1={13}
                                        x2={8}
                                        y2={13}
                                      />
                                      <line
                                        className="st0"
                                        x1={16}
                                        y1={17}
                                        x2={8}
                                        y2={17}
                                      />
                                      <polyline
                                        className="st0"
                                        points="10,9 9,9 8,9 "
                                      />
                                    </svg>
                                    <h3>
                                      {" "}
                                      <span>Reading:</span> Ut enim ad minim veniam
                                    </h3>
                                  </div>
                                  <div className="course__curriculum-meta">
                                    <span className="time">
                                      {" "}
                                      <i className="icon_clock_alt" /> 14 minutes
                                    </span>
                                  </div>
                                </div>
                                <div className="course__curriculum-content d-sm-flex justify-content-between align-items-center">
                                  <div className="course__curriculum-info">
                                    <svg viewBox="0 0 24 24">
                                      <polygon
                                        className="st0"
                                        points="23,7 16,12 23,17 "
                                      />
                                      <path
                                        className="st0"
                                        d="M3,5h11c1.1,0,2,0.9,2,2v10c0,1.1-0.9,2-2,2H3c-1.1,0-2-0.9-2-2V7C1,5.9,1.9,5,3,5z"
                                      />
                                    </svg>
                                    <h3>
                                      {" "}
                                      <span>Video: </span> Greetings and
                                      introduction
                                    </h3>
                                  </div>
                                  <div className="course__curriculum-meta">
                                    <span className="time">
                                      {" "}
                                      <i className="icon_clock_alt" /> 15 minutes
                                    </span>
                                  </div>
                                </div>
                                <div className="course__curriculum-content d-sm-flex justify-content-between align-items-center">
                                  <div className="course__curriculum-info">
                                    <svg viewBox="0 0 16 16">
                                      <path
                                        className="st0"
                                        d="M2,12V8c0-3.3,2.9-6,6.4-6s6.4,2.7,6.4,6v4"
                                      />
                                      <path
                                        className="st0"
                                        d="M14.8,12.7c0,0.7-0.6,1.3-1.4,1.3h-0.7c-0.8,0-1.4-0.6-1.4-1.3v-2c0-0.7,0.6-1.3,1.4-1.3h2.1V12.7z M2,12.7  C2,13.4,2.6,14,3.3,14H4c0.7,0,1.3-0.6,1.3-1.3v-2c0-0.7-0.6-1.3-1.3-1.3H2V12.7z"
                                      />
                                    </svg>
                                    <h3>
                                      {" "}
                                      <span>Audio:</span> Interactive lesson
                                    </h3>
                                  </div>
                                  <div className="course__curriculum-meta">
                                    <span className="time">
                                      {" "}
                                      <i className="icon_clock_alt" /> 7 minutes
                                    </span>
                                    <span className="question">2 questions</span>
                                  </div>
                                </div>
                                <div className="course__curriculum-content d-sm-flex justify-content-between align-items-center">
                                  <div className="course__curriculum-info">
                                    <svg className="document" viewBox="0 0 24 24">
                                      <path
                                        className="st0"
                                        d="M14,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8L14,2z"
                                      />
                                      <polyline
                                        className="st0"
                                        points="14,2 14,8 20,8 "
                                      />
                                      <line
                                        className="st0"
                                        x1={16}
                                        y1={13}
                                        x2={8}
                                        y2={13}
                                      />
                                      <line
                                        className="st0"
                                        x1={16}
                                        y1={17}
                                        x2={8}
                                        y2={17}
                                      />
                                      <polyline
                                        className="st0"
                                        points="10,9 9,9 8,9 "
                                      />
                                    </svg>
                                    <h3>
                                      {" "}
                                      <span>Reading: </span> Ut enim ad minim veniam
                                    </h3>
                                  </div>
                                  <div className="course__curriculum-meta">
                                    <span className="time">
                                      {" "}
                                      <i className="icon_clock_alt" /> 22 minutes
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="review"
                      role="tabpanel"
                      aria-labelledby="review-tab"
                    >
                      <div className="course__review">
                        <h3>Reviews</h3>
                        <p>
                          Gosh william I'm telling crikey burke I don't want no agro
                          A bit of how's your father bugger all mate off his nut
                          that, what a plonker cuppa owt to do
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
                        <div className="course__comment mb-75">
                          <h3>2 Comments</h3>
                          <ul>
                            <li>
                              <div className="course__comment-box ">
                                <div className="course__comment-thumb float-start">
                                  <img
                                    src="/img/course/comment/course-comment-1.jpg"
                                    alt=""
                                  />
                                </div>
                                <div className="course__comment-content">
                                  <div className="course__comment-wrapper ml-70 fix">
                                    <div className="course__comment-info float-start">
                                      <h4>Eleanor Fant</h4>
                                      <span>July 14, 2022</span>
                                    </div>
                                    <div className="course__comment-rating float-start float-sm-end">
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
                                    </div>
                                  </div>
                                  <div className="course__comment-text ml-70">
                                    <p>
                                      So I said lurgy dropped a clanger Jeffrey
                                      bugger cuppa gosh David blatant have it,
                                      standard A bit of how's your father my lady
                                      absolutely.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="course__comment-box ">
                                <div className="course__comment-thumb float-start">
                                  <img
                                    src="/img/course/comment/course-comment-2.jpg"
                                    alt=""
                                  />
                                </div>
                                <div className="course__comment-content">
                                  <div className="course__comment-wrapper ml-70 fix">
                                    <div className="course__comment-info float-start">
                                      <h4>Shahnewaz Sakil</h4>
                                      <span>July 17, 2022</span>
                                    </div>
                                    <div className="course__comment-rating float-start float-sm-end">
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
                                          <a href="#" className="no-rating">
                                            {" "}
                                            <i className="icon_star" />{" "}
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="course__comment-text ml-70">
                                    <p>
                                      David blatant have it, standard A bit of how's
                                      your father my lady absolutely.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="course__form">
                          <h3>Write a Review</h3>
                          <div className="course__form-inner">
                            <form action="#">
                              <div className="row">
                                <div className="col-xxl-6">
                                  <div className="course__form-input">
                                    <input type="text" placeholder="Your Name" />
                                  </div>
                                </div>
                                <div className="col-xxl-6">
                                  <div className="course__form-input">
                                    <input type="email" placeholder="Your Email" />
                                  </div>
                                </div>
                                <div className="col-xxl-12">
                                  <div className="course__form-input">
                                    <input type="text" placeholder="Review Title" />
                                  </div>
                                </div>
                                <div className="col-xxl-12">
                                  <div className="course__form-input">
                                    <div className="course__form-rating">
                                      <span>Rating : </span>
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
                                          <a href="#" className="no-rating">
                                            {" "}
                                            <i className="icon_star" />{" "}
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#" className="no-rating">
                                            {" "}
                                            <i className="icon_star" />{" "}
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                    <textarea
                                      placeholder="Review Summary"
                                      defaultValue={""}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-xxl-12">
                                  <div className="course__form-btn mt-10 mb-55">
                                    <button type="submit" className="e-btn">
                                      Submit Review
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="member"
                      role="tabpanel"
                      aria-labelledby="member-tab"
                    >
                      <div className="course__member mb-45">
                        <div className="course__member-item">
                          <div className="row align-items-center">
                            <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5 col-sm-6">
                              <div className="course__member-thumb d-flex align-items-center">
                                <img
                                  src="/img/course/instructor/course-instructor-1.jpg"
                                  alt=""
                                />
                                <div className="course__member-name ml-20">
                                  <h5>Shahnewaz Sakil</h5>
                                  <span>Engineer</span>
                                </div>
                              </div>
                            </div>
                            <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2 col-4">
                              <div className="course__member-info pl-45">
                                <h5>07</h5>
                                <span>Courses</span>
                              </div>
                            </div>
                            <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2 col-4">
                              <div className="course__member-info pl-70">
                                <h5>05</h5>
                                <span>Reviw</span>
                              </div>
                            </div>
                            <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2 col-4">
                              <div className="course__member-info pl-85">
                                <h5>3.00</h5>
                                <span>Rating</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="course__member-item">
                          <div className="row align-items-center">
                            <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5 col-sm-6">
                              <div className="course__member-thumb d-flex align-items-center">
                                <img
                                  src="/img/course/instructor/course-instructor-2.jpg"
                                  alt=""
                                />
                                <div className="course__member-name ml-20">
                                  <h5>Lauren Stamps</h5>
                                  <span>Teacher</span>
                                </div>
                              </div>
                            </div>
                            <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2 col-4">
                              <div className="course__member-info pl-45">
                                <h5>05</h5>
                                <span>Courses</span>
                              </div>
                            </div>
                            <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2 col-4">
                              <div className="course__member-info pl-70">
                                <h5>03</h5>
                                <span>Reviw</span>
                              </div>
                            </div>
                            <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2 col-4">
                              <div className="course__member-info pl-85">
                                <h5>3.00</h5>
                                <span>Rating</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="course__member-item">
                          <div className="row align-items-center">
                            <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5 col-sm-6 ">
                              <div className="course__member-thumb d-flex align-items-center">
                                <img
                                  src="/img/course/instructor/course-instructor-3.jpg"
                                  alt=""
                                />
                                <div className="course__member-name ml-20">
                                  <h5>Jonquil Von</h5>
                                  <span>Associate</span>
                                </div>
                              </div>
                            </div>
                            <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2 col-4">
                              <div className="course__member-info pl-45">
                                <h5>09</h5>
                                <span>Courses</span>
                              </div>
                            </div>
                            <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2 col-4">
                              <div className="course__member-info pl-70">
                                <h5>07</h5>
                                <span>Reviw</span>
                              </div>
                            </div>
                            <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2 col-4">
                              <div className="course__member-info pl-85">
                                <h5>4.00</h5>
                                <span>Rating</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="course__share">
                      <h3>Share :</h3>
                      <ul className="">
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
                <div className="course__related">
                  <div className="row">
                    <div className="col-xxl-12">
                      <div className="section__title-wrapper mb-40">
                        <h2 className="section__title">
                          Related{" "}
                          <span className="yellow-bg yellow-bg-big">
                            Course
                            <img src="/img/shape/yellow-bg.png" alt="" />
                          </span>
                        </h2>
                        <p>
                          You don't have to struggle alone, you've got our
                          assistance and help.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xxl-12">
                      <div className="course__slider swiper-container pb-60">
                        <div className="swiper-wrapper">
                          <div className="course__item course__item-3 swiper-slide white-bg mb-30 fix">
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
                                  Become a product Manager learn the skills &amp;
                                  job.
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
                          <div className="course__item course__item-3 swiper-slide white-bg mb-30 fix">
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
                          <div className="course__item course__item-3 swiper-slide white-bg mb-30 fix">
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
                          <div className="course__item course__item-3 swiper-slide white-bg mb-30 fix">
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
                        {/* Add Pagination */}
                        <div className="swiper-pagination" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-4">
              <div className="course__sidebar pl-70 p-relative">
                <div className="course__shape">
                  <img
                    className="course-dot"
                    src="/img/course/course-dot.png"
                    alt=""
                  />
                </div>
                <div className="course__sidebar-widget-2 white-bg mb-20">
                  <div className="course__video">
                    <div className="course__video-thumb w-img mb-25">
                      <img src="/img/course/video/course-video.jpg" alt="" />
                      <div className="course__video-play">
                        <a
                          href="https://youtu.be/yJg-Y5byMMw"
                          data-fancybox=""
                          className="play-btn"
                        >
                          {" "}
                          <i className="fas fa-play" />{" "}
                        </a>
                      </div>
                    </div>
                    <div className="course__video-meta mb-25 d-flex align-items-center justify-content-between">
                      <div className="course__video-price">
                        <h5>
                          $74.<span>00</span>{" "}
                        </h5>
                        <h5 className="old-price">$129.00</h5>
                      </div>
                      <div className="course__video-discount">
                        <span>68% OFF</span>
                      </div>
                    </div>
                    <div className="course__video-content mb-35">
                      <ul>
                        <li className="d-flex align-items-center">
                          <div className="course__video-icon">
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 16 16"

                              xmlSpace="preserve"
                            >
                              <path
                                className="st0"
                                d="M2,6l6-4.7L14,6v7.3c0,0.7-0.6,1.3-1.3,1.3H3.3c-0.7,0-1.3-0.6-1.3-1.3V6z"
                              />
                              <polyline
                                className="st0"
                                points="6,14.7 6,8 10,8 10,14.7 "
                              />
                            </svg>
                          </div>
                          <div className="course__video-info">
                            <h5>
                              <span>Instructor :</span> Eleanor Fant
                            </h5>
                          </div>
                        </li>
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
                              <span>Lectures :</span>14
                            </h5>
                          </div>
                        </li>
                        <li className="d-flex align-items-center">
                          <div className="course__video-icon">
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 16 16"

                              xmlSpace="preserve"
                            >
                              <circle className="st0" cx={8} cy={8} r="6.7" />
                              <polyline
                                className="st0"
                                points="8,4 8,8 10.7,9.3 "
                              />
                            </svg>
                          </div>
                          <div className="course__video-info">
                            <h5>
                              <span>Duration :</span>6 weeks
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
                        <li className="d-flex align-items-center">
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
                        </li>
                      </ul>
                    </div>
                    <div className="course__payment mb-35">
                      <h3>Payment:</h3>
                      <a href="#">
                        <img src="/img/course/payment/payment-1.png" alt="" />
                      </a>
                    </div>
                    <div className="course__enroll-btn">
                      <a href="contact.html" className="e-btn e-btn-7 w-100">
                        Enroll <i className="far fa-arrow-right" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="course__sidebar-widget-2 white-bg mb-20">
                  <div className="course__sidebar-course">
                    <h3 className="course__sidebar-title">Related courses</h3>
                    <ul>
                      <li>
                        <div className="course__sm d-flex align-items-center mb-30">
                          <div className="course__sm-thumb mr-20">
                            <a href="#">
                              <img
                                src="/img/course/sm/course-sm-1.jpg"
                                alt=""
                              />
                            </a>
                          </div>
                          <div className="course__sm-content">
                            <div className="course__sm-rating">
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
                            </div>
                            <h5>
                              <a href="#">Development</a>
                            </h5>
                            <div className="course__sm-price">
                              <span>$54.00</span>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="course__sm d-flex align-items-center mb-30">
                          <div className="course__sm-thumb mr-20">
                            <a href="#">
                              <img
                                src="/img/course/sm/course-sm-2.jpg"
                                alt=""
                              />
                            </a>
                          </div>
                          <div className="course__sm-content">
                            <div className="course__sm-rating">
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
                            </div>
                            <h5>
                              <a href="#">Data Science</a>
                            </h5>
                            <div className="course__sm-price">
                              <span>$72.00</span>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="course__sm d-flex align-items-center mb-10">
                          <div className="course__sm-thumb mr-20">
                            <a href="#">
                              <img
                                src="/img/course/sm/course-sm-3.jpg"
                                alt=""
                              />
                            </a>
                          </div>
                          <div className="course__sm-content">
                            <div className="course__sm-rating">
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
                            </div>
                            <h5>
                              <a href="#">UX Design</a>
                            </h5>
                            <div className="course__sm-price">
                              <span>Free</span>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* page title area end */}
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
  )
}

export default Page;
