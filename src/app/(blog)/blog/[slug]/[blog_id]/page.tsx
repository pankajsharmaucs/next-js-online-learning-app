'use client'; // Make this a client component

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import '../../blog.css'
import useSanitizeHTML from '@/hooks/useSanitizeHTML';
import DOMPurify from 'dompurify';
import CategoryList from '@/components/blog/CategoryList';
import RecentPosts from '@/components/blog/RecentPosts';
import TagsList from '@/components/blog/TagsList';
import AdBanner from '@/components/blog/AdBanner';

interface Blog {
    _id: string;
    blogtitle: string;
    description: string;
    image?: string;
    blogcontent?: string;
    createdate: string;
    tags:string[];
}

interface BlogCategory {
    _id: string;      // MongoDB document ID
    cat_name: string; // Category name
    icon?: string;    // Optional icon string
}

export default function Page() {
    const { blog_id } = useParams();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_ADMIN_BLOG}?blog_id=${blog_id}`);
                setBlog(res.data);
                console.log(res.data);
            } catch (err: any) {
                console.error(err);
                setError('Failed to fetch blog data');
            } finally {
                setLoading(false);
            }
        };

        if (blog_id) {
            fetchBlog();
        }
    }, [blog_id]);

    const getCategoryName = (categoryId: string, categories: BlogCategory[]): string => {
        if (!categoryId) return "Generic"; // or "Unknown"
        const category = categories.find(cat => cat._id === categoryId);
        return category ? category.cat_name : "Generic";
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!blog) return <div>Blog not found.</div>;

    const backgroundImage = blog?.image;

    const sanitizedContent = DOMPurify.sanitize(blog.blogcontent || '');


    return (
        <main>
            {/* page title area start */}
            <section
                className="page__title-area  page__title-overlay d-flex align-items-center"
                style={{
                    backgroundImage: `url("${backgroundImage}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '500px',
                }}
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
                                    {blog?.blogtitle}
                                </h3>
                                <div className="blog__meta d-flex align-items-center">
                                    <div className="blog__author d-flex align-items-center mr-40">
                                        <div className="blog__author-thumb mr-10">
                                            <img src="/img/blog/author/author-1.jpg" alt="" />
                                        </div>
                                        <div className="blog__author-info blog__author-info-2">
                                            <h5>Edusm</h5>
                                        </div>
                                    </div>
                                    <div className="blog__date blog__date-2 d-flex align-items-center">
                                        <i className="fal fa-clock" />
                                        <span>{new Date(blog.createdate || '').toDateString()}</span>
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
                                        <article dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
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

                                {<RecentPosts />}

                                {<CategoryList />}

                                {<TagsList tags={blog.tags || []} />}

                                {<AdBanner />}

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* blog area end */}
        </main>

    )


}