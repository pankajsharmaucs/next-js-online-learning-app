'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'

interface Blog {
    _id: string
    blogtitle: string
    slug: string
    createdate: string
    image: string // Assuming there's a thumbnail or image URL field
}

const RecentPosts = () => {
    const [blogs, setBlogs] = useState<Blog[]>([])

    const fetchBlogs = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_ADMIN_BLOG}?limit=3`)
            setBlogs(response.data)
        } catch (error) {
            console.error('Failed to fetch blogs:', error)
        }
    }

    useEffect(() => {
        fetchBlogs()
    }, [])

    return (
        <div className="sidebar__widget mb-55">
            <div className="sidebar__widget-head mb-35">
                <h3 className="sidebar__widget-title">Recent posts</h3>
            </div>
            <div className="sidebar__widget-content">
                <div className="rc__post-wrapper">
                    {blogs.map((blog) => {
                        const sanitizedSlug = blog.slug.replace(/\s+/g, '-').toLowerCase() + '/' + blog._id;
                        return (
                            <div key={blog._id} className="rc__post d-flex align-items-center">
                                <div className="rc__thumb mr-20">
                                    <Link href={`/blog/${sanitizedSlug}`}>
                                        <img src={blog.image || '/img/blog/sm/default.jpg'} alt={blog.slug} />
                                    </Link>
                                </div>
                                <div className="rc__content">
                                    <div className="rc__meta">
                                        <span>{new Date(blog.createdate).toLocaleDateString()}</span>
                                    </div>
                                    <h6 className="rc__title">
                                        <Link href={`/blog/${sanitizedSlug}`}>
                                            {blog.blogtitle.length > 30
                                                ? blog.blogtitle.slice(0, 30) + "..."
                                                : blog.blogtitle}
                                        </Link>
                                    </h6>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        </div>
    )
}

export default RecentPosts
