'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { Skeleton } from '@/components/ui/skeleton' // adjust path as needed

interface BlogCategory {
  _id: string
  cat_name: string
  icon?: string
}

const CategoryList = () => {
  const [categories, setCategories] = useState<BlogCategory[]>([])

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_ADMIN_BLOG_CATEGORY as string)
      .then((response) => {
        setCategories(response.data)
      })
      .catch((error) => {
        console.error('Failed to fetch categories:', error)
      })
  }, [])

  return (
    <div className="sidebar__widget mb-55">
      <div className="sidebar__widget-head mb-35">
        <h3 className="sidebar__widget-title">Category</h3>
      </div>
      <div className="sidebar__widget-content">
        <div className="sidebar__category">
          <ul>
            {categories.length > 0 ? (
              <>
                {categories.slice(0, 4).map((category) => (
                  <li key={category._id}>
                    <Link href={`/blog/category/${category.cat_name.replace(' ','-').toString()}`}>
                      {category.cat_name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/blog/categories">More...</Link>
                </li>
              </>
            ) : (
              // Render 4 skeleton items
              Array.from({ length: 4 }).map((_, i) => (
                <li key={i}>
                  <Skeleton className="h-[18px] w-[120px] mb-2 rounded" />
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CategoryList
