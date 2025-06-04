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
import FadeInBlogContent from "./FadeInBlogContent";

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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!blog) return <div>Blog not found.</div>;

    const backgroundImage = blog?.image;

    const sanitizedContent = DOMPurify.sanitize(blog.blogcontent || '');


    return (

        <FadeInBlogContent
            blog={blog}
            sanitizedContent={sanitizedContent}
            backgroundImage={backgroundImage}
            categories={categories}
            getCategoryName={getCategoryName}
            RecentPosts={RecentPosts}
            CategoryList={CategoryList}
            TagsList={TagsList}
            AdBanner={AdBanner}
        />

    )


}