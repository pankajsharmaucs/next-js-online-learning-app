export default async function Page({ params, }: { params: Promise<{ blog_id: string }> }) {

    const { blog_id } = await params;
    console.log(blog_id);

    return (
        <main>
            {/* page title area start */}
            <section
                className="page__title-area page__title-height-2 page__title-overlay d-flex align-items-center"
                data-background="assets/img/page-title/page-title-3.jpg"
            >
                <div className="page__title-shape">
                    <img
                        className="page-title-shape-1"
                        src="/img/page-title/page-title-shape-1.png"
                        alt=""
                    />
                    <img
                        className="page-title-shape-2"
                        src="/img/page-title/page-title-shape-2.png"
                        alt=""
                    />
                    <img
                        className="page-title-shape-3"
                        src="/img/page-title/page-title-shape-3.png"
                        alt=""
                    />
                    <img
                        className="page-title-shape-4"
                        src="/img/page-title/page-title-shape-4.png"
                        alt=""
                    />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-10 col-xl-10 col-lg-10 ">
                            <div className="page__title-wrapper mt-110">
                                <span className="page__title-pre">Development</span>
                                <h3 className="page__title-2">
                                    The Challenge Of Global Learning In Public Education
                                </h3>
                                <div className="blog__meta d-flex align-items-center">
                                    <div className="blog__author d-flex align-items-center mr-40">
                                        <div className="blog__author-thumb mr-10">
                                            <img src="/img/blog/author/author-1.jpg" alt="" />
                                        </div>
                                        <div className="blog__author-info blog__author-info-2">
                                            <h5>Jim Séchen</h5>
                                        </div>
                                    </div>
                                    <div className="blog__date blog__date-2 d-flex align-items-center">
                                        <i className="fal fa-clock" />
                                        <span>April 02, 2022</span>
                                    </div>
                                </div>
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
                            <div className="blog__wrapper">
                                <div className="blog__text mb-40">
                                    <p>
                                        Me old mucker argy-bargy I'm telling pear shaped Jeffrey super
                                        brilliant, I excuse my French blatant gormless up the duff, cup
                                        of char up the kyver tosser cras happy days. The full monty he
                                        nicked it he legged it bum bag burke plastered arse over tit
                                        it's your round owt to do with me pardon you, on your bike mate
                                        hanky panky mush cuppa only a quid crikey Jeffrey skive off,
                                        faff about so I said what a load of rubbish blag David knees up
                                        cockup cras. Argy-bargy give us a bell wellies gosh skive off
                                        old bodge cheesed off A bit of how's your father off his nut
                                        bamboozled, bugger say I'm telling morish bleeding boot up the
                                        kyver nice one brilliant, ruddy jolly good fanny around chinwag
                                        amongst brown bread arse brolly. Horse play it's all gone to pot
                                        codswallop easy peasy mush knees up down the pub jolly good nice
                                        one tosser it's your round lurgy, I vagabond barmy off his nut
                                        only a quid so I said is gosh Charles blow off, pardon me chip
                                        shop Richard spiffing skive off bleeding get stuffed mate
                                        porkies amongst the full monty.
                                    </p>
                                </div>
                                <div className="blog__quote grey-bg mb-45 p-relative fix">
                                    <img className="quote" src="/img/blog/quote-1.png" alt="" />
                                    <blockquote>
                                        <p>
                                            After I started learning design with Quillow, I realized that
                                            I had Improved to very advanced levels.
                                        </p>
                                        <h4>Chris Collins</h4>
                                    </blockquote>
                                </div>
                                <div className="blog__text mb-30">
                                    <p>
                                        Horse play it's all gone to pot codswallop easy peasy mush knees
                                        up down the pub jolly good nice one tosser it's your round
                                        lurgy, I vagabond barmy off his nut only a quid so I said is
                                        gosh Charles blow off, pardon me chip shop Richard spiffing
                                        skive off bleeding get stuffed mate porkies amongst the full
                                        monty. Daft burke you
                                    </p>
                                </div>
                                <div className="blog__link mb-35">
                                    <p>
                                        The little rotter bum bag a blinding shot gosh spifing butty
                                        eatonwha load of rubbish bamboozled.{" "}
                                        <a href="#"> https://educal.com/courses</a>{" "}
                                    </p>
                                </div>
                                <div className="blog__img w-img mb-45">
                                    <img src="/img/blog/big/blog-big-1.jpg" alt="" />
                                </div>
                                <div className="blog__text mb-40">
                                    <h3>Build a beautiful website with Quillow</h3>
                                    <p>
                                        Some dodgy chav car boot blower starkers bonnet tickety-boo no
                                        biggie cheesed off, Oxford bloke fantastic the wireless bevvy
                                        cobblers chancer give us a bell, bleeder jolly good hanky panky
                                        do one gormless matie boy. Pear shaped my good sir I cobblers at
                                        public school quaint tickety-boo crikey bits and bobs, wellies
                                        bugger all mate golly gosh brolly matie boy fanny around chimney
                                        pot cracking goal my lady, bodge so I said spiffing posh the
                                        full monty don't get shirty with me no biggie.
                                    </p>
                                    <p>
                                        Brolly grub blimey victoria sponge blag nancy boy don't get
                                        shirty with me skive off bobby burke in my flat bog-standard,
                                        easy peasy golly gosh up the duff show off show off pick your
                                        nose and blow off gosh a brilliant that what a load of rubbish.
                                    </p>
                                </div>
                                <div className="blog__line" />
                                <div className="blog__meta-3 d-sm-flex justify-content-between align-items-center mb-80">
                                    <div className="blog__tag-2">
                                        <a href="#">Art &amp; Design</a>
                                        <a href="#">Education</a>
                                        <a href="#">App</a>
                                    </div>
                                    <div className="blog__social d-flex align-items-center">
                                        <h4>Share:</h4>
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
                                <div className="blog__author-3 d-sm-flex grey-bg mb-90">
                                    <div className="blog__author-thumb-3 mr-20">
                                        <img src="/img/blog/author/blog-author-1.jpg" alt="" />
                                    </div>
                                    <div className="blog__author-content">
                                        <h4>Justin Case</h4>
                                        <span>Author</span>
                                        <p>
                                            So I said blower wellies a blinding shot jolly good argy-bargy
                                            he nicked it, in my flat don't get shirty with me tosser.
                                        </p>
                                    </div>
                                </div>
                                <div className="blog__recent mb-65">
                                    <div className="section__title-wrapper mb-40">
                                        <h2 className="section__title">
                                            Related{" "}
                                            <span className="yellow-bg-sm">
                                                Post <img src="/img/shape/yellow-bg-4.png" alt="" />
                                            </span>
                                        </h2>
                                        <p>
                                            You don't have to struggle alone, you've got our assistance
                                            and help.
                                        </p>
                                    </div>
                                    <div className="row">
                                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                                            <div className="blog__item white-bg mb-30 transition-3 fix">
                                                <div className="blog__thumb w-img fix">
                                                    <a href="blog-details.html">
                                                        <img src="/img/blog/blog-1.jpg" alt="" />
                                                    </a>
                                                </div>
                                                <div className="blog__content">
                                                    <div className="blog__tag">
                                                        <a href="#">Art &amp; Design</a>
                                                    </div>
                                                    <h3 className="blog__title">
                                                        <a href="blog-details.html">
                                                            The Challenge Of Global Learning In Public Education
                                                        </a>
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
                                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                                            <div className="blog__item white-bg mb-30 transition-3 fix">
                                                <div className="blog__thumb w-img fix">
                                                    <a href="blog-details.html">
                                                        <img src="/img/blog/blog-2.jpg" alt="" />
                                                    </a>
                                                </div>
                                                <div className="blog__content">
                                                    <div className="blog__tag">
                                                        <a href="#" className="purple">
                                                            Marketing
                                                        </a>
                                                    </div>
                                                    <h3 className="blog__title">
                                                        <a href="blog-details.html">
                                                            Exactly How Technology Can Make Reading Better
                                                        </a>
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
                                                                <h5>Barry Tone</h5>
                                                            </div>
                                                        </div>
                                                        <div className="blog__date d-flex align-items-center">
                                                            <i className="fal fa-clock" />
                                                            <span>July 02, 2022</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="latest-comments mb-95">
                                    <h3>3 Comments</h3>
                                    <ul>
                                        <li>
                                            <div className="comments-box grey-bg">
                                                <div className="comments-info d-flex">
                                                    <div className="comments-avatar mr-20">
                                                        <img
                                                            src="/img/blog/comments/comment-1.jpg"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="avatar-name">
                                                        <h5>Eleanor Fant</h5>
                                                        <span className="post-meta"> July 14, 2022</span>
                                                    </div>
                                                </div>
                                                <div className="comments-text ml-65">
                                                    <p>
                                                        So I said lurgy dropped a clanger Jeffrey bugger cuppa
                                                        gosh David blatant have it, standard A bit of how's your
                                                        father my lady absolutely.
                                                    </p>
                                                    <div className="comments-replay">
                                                        <a href="#">Reply</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="children">
                                            <div className="comments-box grey-bg">
                                                <div className="comments-info d-flex">
                                                    <div className="comments-avatar mr-20">
                                                        <img
                                                            src="/img/blog/comments/comment-1.jpg"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="avatar-name">
                                                        <h5>Dominic</h5>
                                                        <span className="post-meta">April 16, 2022 </span>
                                                    </div>
                                                </div>
                                                <div className="comments-text ml-65">
                                                    <p>
                                                        David blatant have it, standard A bit of how's your
                                                        father my lady absolutely.
                                                    </p>
                                                    <div className="comments-replay">
                                                        <a href="#">Reply</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <ul>
                                                <li className="children-2">
                                                    <div className="comments-box grey-bg">
                                                        <div className="comments-info d-flex">
                                                            <div className="comments-avatar mr-20">
                                                                <img
                                                                    src="/img/blog/comments/comment-3.jpg"
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="avatar-name">
                                                                <h5>Von Rails</h5>
                                                                <span className="post-meta">April 18, 2022 </span>
                                                            </div>
                                                        </div>
                                                        <div className="comments-text ml-65">
                                                            <p>
                                                                He nicked it get stuffed mate spend a penny
                                                                plastered.!
                                                            </p>
                                                            <div className="comments-replay">
                                                                <a href="#">Reply</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div className="blog__comment">
                                    <h3>Write a Review</h3>
                                    <form action="#">
                                        <div className="row">
                                            <div className="col-xxl-6 col-xl-6 col-lg-6">
                                                <div className="blog__comment-input">
                                                    <input type="text" placeholder="Your Name" />
                                                </div>
                                            </div>
                                            <div className="col-xxl-6 col-xl-6 col-lg-6">
                                                <div className="blog__comment-input">
                                                    <input type="email" placeholder="Your Email" />
                                                </div>
                                            </div>
                                            <div className="col-xxl-12">
                                                <div className="blog__comment-input">
                                                    <input type="text" placeholder="Website" />
                                                </div>
                                            </div>
                                            <div className="col-xxl-12">
                                                <div className="blog__comment-input">
                                                    <textarea
                                                        placeholder="Enter your comment ..."
                                                        defaultValue={""}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xxl-12">
                                                <div className="blog__comment-agree d-flex align-items-center mb-20">
                                                    <input
                                                        className="e-check-input"
                                                        type="checkbox"
                                                        id="e-agree"
                                                    />
                                                    <label className="e-check-label" htmlFor="e-agree">
                                                        Save my name, email, and website in this browser for the
                                                        next time I comment.
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-xxl-12">
                                                <div className="blog__comment-btn">
                                                    <button type="submit" className="e-btn">
                                                        Post Comment
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
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
                                                    <a href="blog-details.html">
                                                        <img src="/img/blog/sm/blog-sm-1.jpg" alt="" />
                                                    </a>
                                                </div>
                                                <div className="rc__content">
                                                    <div className="rc__meta">
                                                        <span>October 15, 2021</span>
                                                    </div>
                                                    <h6 className="rc__title">
                                                        <a href="blog-details.html">
                                                            The Importance Intrinsic Motivation.
                                                        </a>
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="rc__post d-flex align-items-center">
                                                <div className="rc__thumb mr-20">
                                                    <a href="blog-details.html">
                                                        <img src="/img/blog/sm/blog-sm-2.jpg" alt="" />
                                                    </a>
                                                </div>
                                                <div className="rc__content">
                                                    <div className="rc__meta">
                                                        <span>March 26, 2021</span>
                                                    </div>
                                                    <h6 className="rc__title">
                                                        <a href="blog-details.html">
                                                            A Better Alternative To Grading Student.
                                                        </a>
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="rc__post d-flex align-items-center">
                                                <div className="rc__thumb mr-20">
                                                    <a href="blog-details.html">
                                                        <img src="/img/blog/sm/blog-sm-3.jpg" alt="" />
                                                    </a>
                                                </div>
                                                <div className="rc__content">
                                                    <div className="rc__meta">
                                                        <span>October 15, 2021</span>
                                                    </div>
                                                    <h6 className="rc__title">
                                                        <a href="blog-details.html">
                                                            Strategic Social Media &amp; Evolution of Visual
                                                        </a>
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
                                                    <a href="blog.html">Category</a>
                                                </li>
                                                <li>
                                                    <a href="blog.html">Video &amp; Tips (4)</a>
                                                </li>
                                                <li>
                                                    <a href="blog.html">Education (8)</a>
                                                </li>
                                                <li>
                                                    <a href="blog.html">Business (5)</a>
                                                </li>
                                                <li>
                                                    <a href="blog.html">UX Design (3)</a>
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
                                            <a href="#">Art &amp; Design</a>
                                            <a href="#">Course</a>
                                            <a href="#">Videos</a>
                                            <a href="#">App</a>
                                            <a href="#">Education</a>
                                            <a href="#">Data Science</a>
                                            <a href="#">Machine Learning</a>
                                            <a href="#">Tips</a>
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