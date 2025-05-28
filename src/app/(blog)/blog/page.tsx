'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import './blog.css'
import RecentPosts from '@/components/blog/RecentPosts'
import CategoryList from '@/components/blog/CategoryList'
import AdBanner from '@/components/blog/AdBanner'
import TagsList from '@/components/blog/TagsList'
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
  tags?: string[];
}

interface BlogCategory {
  _id: string;      // MongoDB document ID
  cat_name: string; // Category name
  icon?: string;    // Optional icon string
}

const Page = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6; // Adjust as needed
  const [categories, setCategories] = useState<BlogCategory[]>([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_ADMIN_BLOG as string)
      setBlogs(response.data)
      // console.log(response.data);
    } catch (error) {
      console.error('Failed to fetch blogs:', error)
    }
  }
  useEffect(() => {
    fetchBlogs()
  }, [])

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

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  return (
    <main>
      {/* page title area start */}
      <section
        className="page__title-area page__title-height page__title-overlay d-flex align-items-center"
        style={{
          backgroundImage: `url("/assets/blog/blogBG2.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "400px"
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="page__title-wrapper mt-110">
                <h3 className="page__title mb-20 ">Blog Grid</h3>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link href="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      All Blogs
                    </li>
                  </ol>
                </nav>
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
              <div className="row">
                {blogs.map((blog) => (
                  <BlogCard key={blog._id} blog={blog} categories={categories} />
                ))}
              </div>
              <div className="row">
                <div className="col-xxl-12">
                  <div
                    className="basic-pagination wow fadeInUp mt-30"
                    data-wow-delay=".2s"
                  >
                    <ul className="d-flex align-items-center">
                      <li className="prev">
                        <button
                          className="link-btn link-prev"
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                          }
                          disabled={currentPage === 1}
                        >
                          Prev
                          <i className="arrow_left" />
                          <i className="arrow_left" />
                        </button>
                      </li>

                      {[...Array(totalPages)].map((_, index) => (
                        <li
                          key={index}
                          className={currentPage === index + 1 ? "active" : ""}
                        >
                          <button onClick={() => setCurrentPage(index + 1)}>
                            <span>{index + 1}</span>
                          </button>
                        </li>
                      ))}

                      <li className="next">
                        <button
                          className="link-btn"
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(prev + 1, totalPages)
                            )
                          }
                          disabled={currentPage === totalPages}
                        >
                          Next
                          <i className="arrow_right" />
                          <i className="arrow_right" />
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
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
      {/* blog area end */}
    </main>

  )
}

export default Page