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
import Link from 'next/link';
import { Skeleton } from "@/components/ui/skeleton"

interface Blog {
    _id: string;
    category: string;
    blogtitle: string;
    description: string;
    image?: string;
    blogcontent?: string;
    createdate: string;
    tags: string[];
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
    const [categories, setCategories] = useState<BlogCategory[]>([]);

    const [visible, setVisible] = useState({
        background: true,
        title: true,
        meta: true,
        content: true,
    });

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


    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_ADMIN_BLOG_CATEGORY as string)
            .then((response) => {
                setCategories(response.data);
                // console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const getCategoryName = (categoryId: string, categories: BlogCategory[]): string => {
        if (!categoryId) return "Generic"; // or "Unknown"
        const category = categories.find(cat => cat._id === categoryId);
        return category ? category.cat_name : "Generic";
    };


    if (loading) {
        return (
            <main>
                <section
                    className="page__title-area page__title-overlay d-flex align-items-center"
                    style={{
                        backgroundColor: '#f0f0f0',
                        height: '400px',
                    }}
                >
                    <div className="container">
                        <div className="row">
                            <div className="col-xxl-10 col-xl-10 col-lg-10">
                                <div className="page__title-wrapper mt-110">
                                    <Skeleton className="w-[120px] h-[20px] mb-2" />
                                    <Skeleton className="w-[80%] h-[36px] mb-3" />
                                    <div className="d-flex align-items-center gap-4">
                                        <div className="d-flex align-items-center gap-2">
                                            <Skeleton className="w-[40px] h-[40px] rounded-full" />
                                            <Skeleton className="w-[80px] h-[14px]" />
                                        </div>
                                        <Skeleton className="w-[100px] h-[14px]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="blog__area pt-50 pb-120">
                    <div className="container">
                        <div className="row">
                            <div className="col-xxl-8 col-xl-8 col-lg-8">
                                <div className="blog__wrapper">
                                    <div className="blog__text mb-40">
                                        <Skeleton className="w-[150px] h-[16px] mb-4" />
                                        <div className="space-y-3">
                                            <Skeleton className="w-full h-[20px] rounded" />
                                            <Skeleton className="w-[95%] h-[20px] rounded" />
                                            <Skeleton className="w-[90%] h-[20px] rounded" />
                                            <Skeleton className="w-[85%] h-[20px] rounded" />
                                            <Skeleton className="w-[75%] h-[20px] rounded" />
                                            <Skeleton className="w-[90%] h-[20px] rounded" />
                                            <Skeleton className="w-[60%] h-[20px] rounded" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xxl-4 col-xl-4 col-lg-4">
                                <div className="blog__sidebar md:pl-70 pl-0">
                                    <Skeleton className="w-[100%] h-[200px] rounded mb-4" />
                                    <Skeleton className="w-[100%] h-[200px] rounded mb-4" />
                                    <Skeleton className="w-[100%] h-[200px] rounded mb-4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        );
    }


    if (!blog) return <div>Blog not found.</div>;
    const backgroundImage = blog?.image;
    const sanitizedContent = DOMPurify.sanitize(blog.blogcontent || '');


    return (

        <main>
            <section
                className={`page__title-area page__title-overlay d-flex align-items-center `}
                style={{
                    backgroundImage: `url("${backgroundImage}")`,
                    background: `rgba(0, 0, 0, 0.9)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundBlendMode: "overlay",
                    height: "400px",
                    transition: "opacity 1s ease",
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
                        <div className="col-xxl-10 col-xl-10 col-lg-10">
                            <div
                                className="page__title-wrapper mt-110"
                                style={{
                                    transition: "opacity 1s ease",
                                    opacity: visible.title ? 1 : 0,
                                }}
                            >
                                <Link href={`/blog/category/${getCategoryName(blog.category, categories).replace(' ','-').toString()}`}>
                                    <span className="page__title-pre">
                                        {getCategoryName(blog.category, categories)}
                                    </span>
                                </Link>
                                <h3 className="page__title-2">{blog?.blogtitle}</h3>
                                <div
                                    className="blog__meta d-flex align-items-center"
                                    style={{
                                        transition: "opacity 1s ease",
                                        opacity: visible.meta ? 1 : 0,
                                    }}
                                >
                                    <div className="blog__author d-flex align-items-center mr-40">
                                        <div className="blog__author-thumb mr-10">
                                            <img src="/img/blog/author/author-1.jpg" alt="" />
                                        </div>
                                        <div className="blog__author-info blog__author-info-2">
                                            <h5>CourseWorld</h5>
                                        </div>
                                    </div>
                                    <div className="blog__date blog__date-2 d-flex align-items-center">
                                        <i className="fal fa-clock" />
                                        <span>{new Date(blog.createdate || "").toDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="blog__area pt-50 pb-120">
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-8 col-xl-8 col-lg-8">
                            <div
                                className="blog__wrapper"
                                style={{
                                    transition: "opacity 1s ease",
                                    opacity: visible.content ? 1 : 0,
                                }}
                            >
                                {blog && sanitizedContent ? (
                                    <div className="blog__text mb-40">
                                        <p>{new Date(blog.createdate || "").toDateString()}</p>
                                        <article dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
                                    </div>
                                ) : (
                                    <div className="blog__text mb-40">
                                        <Skeleton className="w-[150px] h-[16px] mb-4" />
                                        <div className="space-y-3">
                                            <Skeleton className="w-full h-[20px] rounded" />
                                            <Skeleton className="w-[95%] h-[20px] rounded" />
                                            <Skeleton className="w-[90%] h-[20px] rounded" />
                                            <Skeleton className="w-[85%] h-[20px] rounded" />
                                            <Skeleton className="w-[75%] h-[20px] rounded" />
                                            <Skeleton className="w-[90%] h-[20px] rounded" />
                                            <Skeleton className="w-[60%] h-[20px] rounded" />
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4">
                            <div className="blog__sidebar md:pl-70 pl-0">
                                {RecentPosts && <RecentPosts />}
                                {CategoryList && <CategoryList />}
                                {TagsList && <TagsList tags={blog.tags || []} />}
                                {AdBanner && <AdBanner />}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>

    )


}