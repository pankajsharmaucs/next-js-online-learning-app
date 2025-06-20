'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'
import '../../blog.css'
import RecentPosts from '@/components/blog/RecentPosts'
import CategoryList from '@/components/blog/CategoryList'
import AdBanner from '@/components/blog/AdBanner'
import BlogCard from '@/components/blog/BlogCard'
import PageBreadcrumb from '@/components/PageBreadcrumb'

interface BlogType {
  _id: string
  blogtitle: string
  slug: string
  image?: string
  category?: string
  author?: string
  authorImage?: string
  createdate: string
  tags?: string[]
}

interface BlogCategory {
  _id: string;      // MongoDB document ID
  cat_name: string; // Category name
  icon?: string;    // Optional icon string
}

export default function Page() {
  const { tag } = useParams()
  const [blogs, setBlogs] = useState<BlogType[]>([])
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<BlogCategory[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_ADMIN_BLOG as string)
        const allBlogs = response.data
        const filtered = allBlogs.filter((blog: BlogType) =>
          blog.tags?.some(t => t.toLowerCase().replace(/\s+/g, '-') === (tag as string).toLowerCase())
        )
        setBlogs(filtered)
      } catch (error) {
        console.error('Failed to fetch blogs:', error)
      } finally {
        setLoading(false)
      }
    }

    if (tag) fetchBlogs()
  }, [tag])

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

  if (loading) return <div>Loading...</div>
  if (!blogs.length) return <div>No blogs found for tag: {tag}</div>

  return (
    <main>
      {/* Title Area */}
      <section
        className="page__title-area page__title-height page__title-overlay d-flex align-items-center"
        style={{
          backgroundImage: `url("/assets/blog/blogBG2.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "400px",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="page__title-wrapper mt-110">
                <h3 className="page__title mb-20">Blogs tagged: {tag}</h3>
                <PageBreadcrumb homeLabel="Home" homeHref="/" pageName={`${tag}`} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="blog__area pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xxl-8 col-xl-8 col-lg-8">
              <div className="row">

                {blogs.map((blog) => (
                  <BlogCard key={blog._id} blog={blog} categories={categories} />
                ))}

              </div>
            </div>

            <div className="col-xxl-4 col-xl-4 col-lg-4">
              <div className="blog__sidebar pl-70">

                {<RecentPosts />}

                {<CategoryList />}

                {<AdBanner />}

              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
