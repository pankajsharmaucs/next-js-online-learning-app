import React, { useEffect, useState } from "react";
import Link from "next/link";

const FadeInBlogContent = ({
  blog,
  sanitizedContent,
  backgroundImage,
  categories,
  getCategoryName,
  RecentPosts,
  CategoryList,
  TagsList,
  AdBanner,
}) => {
  const [visible, setVisible] = useState({
    background: false,
    title: false,
    meta: false,
    content: false,
  });

  // Sequence fade-in on mount
  useEffect(() => {
    const timers = [];

    timers.push(setTimeout(() => setVisible(v => ({ ...v, background: true })), 0));
    timers.push(setTimeout(() => setVisible(v => ({ ...v, title: true })), 150));
    timers.push(setTimeout(() => setVisible(v => ({ ...v, meta: true })), 250));
    timers.push(setTimeout(() => setVisible(v => ({ ...v, content: true })), 350));

    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <main>
      <section
        className={`page__title-area page__title-overlay d-flex align-items-center ${visible.background ? "fade-in" : "fade-out"
          }`}
        style={{
          backgroundImage: `url("${backgroundImage}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "400px",
          transition: "opacity 1s ease",
          opacity: visible.background ? 1 : 0,
        }}
      >
        <div className="page__title-shape">
          <img
            className="page-title-shape-1"
            src="/img/page-title/page-title-shape-1.png"
            alt=""
          />
          <img
            className="page-title-shape-2"
            src="/img/page-title/page-title-shape-2.png"
            alt=""
          />
          <img
            className="page-title-shape-3"
            src="/img/page-title/page-title-shape-3.png"
            alt=""
          />
          <img
            className="page-title-shape-4"
            src="/img/page-title/page-title-shape-4.png"
            alt=""
          />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xxl-10 col-xl-10 col-lg-10">
              <div
                className="page__title-wrapper mt-110"
                style={{
                  transition: "opacity 1s ease",
                  opacity: visible.title ? 1 : 0,
                }}
              >
                <Link href={`/blog/category/${getCategoryName(blog.category, categories)}`}>
                  <span className="page__title-pre">
                    {getCategoryName(blog.category, categories)}
                  </span>
                </Link>
                <h3 className="page__title-2">{blog?.blogtitle}</h3>
                <div
                  className="blog__meta d-flex align-items-center"
                  style={{
                    transition: "opacity 1s ease",
                    opacity: visible.meta ? 1 : 0,
                  }}
                >
                  <div className="blog__author d-flex align-items-center mr-40">
                    <div className="blog__author-thumb mr-10">
                      <img src="/img/blog/author/author-1.jpg" alt="" />
                    </div>
                    <div className="blog__author-info blog__author-info-2">
                      <h5>Edusm</h5>
                    </div>
                  </div>
                  <div className="blog__date blog__date-2 d-flex align-items-center">
                    <i className="fal fa-clock" />
                    <span>{new Date(blog.createdate || "").toDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blog__area pt-50 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xxl-8 col-xl-8 col-lg-8">
              <div
                className="blog__wrapper"
                style={{
                  transition: "opacity 1s ease",
                  opacity: visible.content ? 1 : 0,
                }}
              >
                <div className="blog__text mb-40">
                  <p>{new Date(blog.createdate || "").toDateString()}</p>
                  <article dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
                </div>

                {/* Other blog content here, like meta, author, comments etc */}

                {/* You can insert your related posts, comments, comment form here */}
              </div>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-4">
              <div className="blog__sidebar pl-70">
                {RecentPosts && <RecentPosts />}
                {CategoryList && <CategoryList />}
                {TagsList && <TagsList tags={blog.tags || []} />}
                {AdBanner && <AdBanner />}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FadeInBlogContent;
