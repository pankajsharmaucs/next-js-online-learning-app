'use client'

import React from 'react'
import Link from 'next/link'

interface TagsListProps {
  tags: string[]
}

const TagsList: React.FC<TagsListProps> = ({ tags }) => {
  if (!tags || tags.length === 0) {
    return (
      <div className="sidebar__widget mb-55">
        <div className="sidebar__widget-head mb-35">
          <h3 className="sidebar__widget-title">Tags</h3>
        </div>
        <div className="sidebar__widget-content">
          <p>No tags available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="sidebar__widget mb-55">
      <div className="sidebar__widget-head mb-35">
        <h3 className="sidebar__widget-title">Tags</h3>
      </div>
      <div className="sidebar__widget-content">
        <div className="sidebar__tag text-sm flex flex-wrap items-center gap-2">
          {tags.map((tag, index) => {
            const cleanedTag = tag.replace(/[\[\]"]/g, '');
            return (
              <Link
                key={index}
                href={`/blog/tag/${cleanedTag.toLowerCase().replace(/\s+/g, '-')}`}
                className="tag-link"
                style={{ fontSize: "13px" }}
              >
                {cleanedTag.length > 30 ? cleanedTag.slice(0, 30) + "..." : cleanedTag}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default TagsList
