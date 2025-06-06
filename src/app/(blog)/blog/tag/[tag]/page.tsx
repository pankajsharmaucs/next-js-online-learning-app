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
import Breadcrumb from '@/components/PageBreadcrumb'

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
                <Breadcrumb homeLabel="Home" homeHref="/" pageName={`${tag}`} />
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
                {/* {blogs.map((blog) => {
                  const sanitizedSlug = blog.slug.replace(/\s+/g, '-').toLowerCase() + '/' + blog._id
                  return (
                    <div key={blog._id} className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                      <div className="blog__wrapper">
                        <div className="blog__item white-bg mb-30 transition-3 fix">
                          <div className="blog__thumb w-img fix">
                            <Link href={`/blog/${sanitizedSlug}`}>
                              <img
                                src={blog.image || '/img/blog/blog-1.jpg'}
                                alt={blog.blogtitle}
                              />
                            </Link>
                          </div>
                          <div className="blog__content">
                            <div className="blog__tag">
                              <span className="blue">{blog.category || 'General'}</span>
                            </div>
                            <h3 className="blog__title">
                              <Link href={`/blog/${sanitizedSlug}`}>
                                {blog.blogtitle}
                              </Link>
                            </h3>
                            <div className="blog__meta d-flex align-items-center justify-content-between">
                              <div className="blog__author d-flex align-items-center">
                                <div className="blog__author-thumb mr-10">
                                  <img
                                    src={blog.authorImage || '/img/blog/author.png'}
                                    alt={blog.author || 'Author'}
                                  />
                                </div>
                                <div className="blog__author-info">
                                  <h5>{blog.author || 'Edusm'}</h5>
                                </div>
                              </div>
                              <div className="blog__date d-flex align-items-center">
                                <i className="fal fa-clock" />
                                <span>{new Date(blog.createdate || '').toDateString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })} */}

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
