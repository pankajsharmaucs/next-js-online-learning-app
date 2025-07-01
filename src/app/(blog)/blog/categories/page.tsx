'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import PageBreadcrumb from '@/components/PageBreadcrumb'

interface Blog {
    _id: string
    blogtitle: string
    slug: string
    image?: string
    category?: string
    author?: string
    authorImage?: string
    createdate?: string
}

interface BlogCategory {
    _id: string
    cat_name: string
}

const CategoryPage = () => {
    const [categories, setCategories] = useState<BlogCategory[]>([])
    const [blogs, setBlogs] = useState<Blog[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, blogRes] = await Promise.all([
                    axios.get(process.env.NEXT_PUBLIC_ADMIN_BLOG_CATEGORY!),
                    axios.get(process.env.NEXT_PUBLIC_ADMIN_BLOG!)
                ])
                setCategories(catRes.data)
                setBlogs(blogRes.data)
                
            } catch (err) {
                console.error('Error fetching data:', err)
            }
        }

        fetchData()
    }, [])

    const getCategoryName = (categoryId: string): string => {
        const cat = categories.find(c => c._id === categoryId)
        return cat?.cat_name || 'Generic'
    }

    // Only categories that have at least one blog
    const filteredCategories = categories.filter(cat =>
        blogs.some(blog => blog.category === cat._id)
    )

    return (
        <main>
            <section
                className="page__title-area page__title-height page__title-overlay d-flex align-items-center"
                style={{
                    backgroundImage: `url("/assets/blog/blogBG2.jpg")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-12">
                            <div className="page__title-wrapper mt-110">
                                <h3 className="page__title mb-20">All Blog Categories</h3>
                                 <PageBreadcrumb homeLabel="All Blog" homeHref="/blog" pageName={'Categories'} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="blog__area pt-120 pb-120">
                <div className="container">
                    <div className="row">
                        {filteredCategories.map((category) => {
                            // Find the first blog of this category
                            const firstBlog = blogs.find(blog => blog.category === category._id)
                            if (!firstBlog) return null // safety check

                            // Prepare slug like in your blog card
                            const sanitizedSlug = firstBlog.slug.replace(/\s+/g, '-').toLowerCase() + '/' + firstBlog._id

                            return (
                                <div key={category._id} className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                                    <div className="blog__wrapper">
                                        <div className="blog__item white-bg mb-30 transition-3 fix">
                                            <div className="blog__thumb w-img fix">
                                                <Link href={`/blog/category/${category.cat_name.replace(' ','-').toString()}`}>
                                                    <img src={firstBlog.image} alt={category.cat_name} />
                                                </Link>
                                            </div>
                                            <div className="p-3">
                                                <h3 className="">
                                                    <Link href={`/blog/category/${category.cat_name.replace(' ','-').toString()}`}>
                                                        {category.cat_name}
                                                    </Link>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default CategoryPage
