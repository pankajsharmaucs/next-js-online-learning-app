'use client';

import Link from 'next/link';

interface Blog {
  _id: string;
  blogtitle: string;
  slug: string;
  image?: string;
  category?: string;
  createdate: string;
}


interface BlogCategory {
  _id: string;
  cat_name: string;
}

interface BlogCardProps {
  blog: Blog;
  categories: BlogCategory[];
}

function BlogCard({ blog, categories }: BlogCardProps) {
  const getCategoryName = (categoryId: string): string => {
    if (!categoryId) return 'Generic';
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.cat_name : 'Generic';
  };

  const sanitizedSlug =
    blog.slug.replace(/\s+/g, '-').toLowerCase() + '/' + blog._id;

  return (
    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
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
              <Link
                href={`/blog/category/${getCategoryName(blog.category || '')}`}
                className="blue"
              >
                {getCategoryName(blog.category || '')}
              </Link>
            </div>
            <h3 className="blog__title">
              <Link href={`/blog/${sanitizedSlug}`}>{blog.blogtitle}</Link>
            </h3>
            <div className="blog__meta d-flex align-items-center justify-content-between">
              <div className="blog__author d-flex align-items-center">
                <div className="blog__author-thumb mr-10">
                  <img
                    src={blog.image || '/img/blog/author.png'}
                    alt={blog.slug}
                  />
                </div>
                <div className="blog__author-info">
                  <h5>Courseworld</h5>
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
  );
}

export default BlogCard;
