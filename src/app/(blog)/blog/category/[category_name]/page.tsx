'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import '../../blog.css'
import { useParams } from 'next/navigation'
import RecentPosts from '@/components/blog/RecentPosts'
import CategoryList from '@/components/blog/CategoryList'
import AdBanner from '@/components/blog/AdBanner'
import BlogCard from '@/components/blog/BlogCard'

interface BlogType {
  _id: string
  blogtitle: string
  slug: string
  image?: string
  category?: string
  author?: string
  authorImage?: string
  createdate: string
}

interface BlogCategory {
  _id: string
  cat_name: string
  icon?: string
}

const categorypage = () => {
  const params = useParams() as { category_name: string }
  const categoryName = params.category_name || ''

  const [blogs, setBlogs] = useState<BlogType[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const blogsPerPage = 6

  // Fetch blogs and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogRes, catRes] = await Promise.all([
          axios.get(process.env.NEXT_PUBLIC_ADMIN_BLOG!),
          axios.get(process.env.NEXT_PUBLIC_ADMIN_BLOG_CATEGORY!)
        ])
        setBlogs(blogRes.data)
        setCategories(catRes.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  // Get readable category name
  const getCategoryName = (categoryId: string): string => {
    const category = categories.find(cat => cat._id === categoryId)
    return category?.cat_name || 'Generic'
  }

  // Filter blogs by category name
  const categoryObj = categories.find(
    cat => cat.cat_name.toLowerCase() === categoryName.toLowerCase()
  )
  const filteredBlogs = categoryObj
    ? blogs.filter(blog => blog.category === categoryObj._id)
    : []

  // Pagination
  const indexOfLastBlog = currentPage * blogsPerPage
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog)
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage)

  return (
    <main>
      {/* Page Title */}
      <section
        className="page__title-area page__title-height page__title-overlay d-flex align-items-center"
        style={{
          backgroundImage: `url("/assets/blog/blogBG2.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '400px',
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="page__title-wrapper mt-110">
                <h3 className="page__title mb-20">Blog Category</h3>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link href="/blog">All Blog</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {categoryName}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="blog__area pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xxl-8 col-xl-8 col-lg-8">
              <div className="row">
                {/* {currentBlogs.map((blog) => {
                  const sanitizedSlug = blog.slug.replace(/\s+/g, '-').toLowerCase() + '/' + blog._id;
                  return (
                    <div key={blog._id} className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                      <div className="blog__wrapper">
                        <div className="blog__item white-bg mb-30 transition-3 fix">
                          <div className="blog__thumb w-img fix">
                            <Link href={`/blog/${sanitizedSlug}`}>
                              <img src={blog.image || '/img/blog/blog-1.jpg'} alt={blog.blogtitle} />
                            </Link>
                          </div>
                          <div className="blog__content">
                            <div className="blog__tag">
                              <span className="blue">{getCategoryName(blog.category || '')}</span>
                            </div>
                            <h3 className="blog__title">
                              <Link href={`/blog/${sanitizedSlug}`}>{blog.blogtitle}</Link>
                            </h3>
                            <div className="blog__meta d-flex align-items-center justify-content-between">
                              <div className="blog__author d-flex align-items-center">
                                <div className="blog__author-thumb mr-10">
                                  <img src={blog.image} alt={blog.slug} />
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

                {currentBlogs.map((blog) => (
                  <BlogCard key={blog._id} blog={blog} categories={categories} />
                ))}

              </div>

              {/* Pagination - optional */}
              {totalPages > 1 && (
                <div className="pagination mt-40">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={currentPage === index + 1 ? 'active' : ''}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar - keep as-is or update with dynamic data */}
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

export default categorypage
