"use client";

import SimpleEditor from "@/components/editor/SimpleEditor";
import axios from "axios";
import { useEffect, useState } from "react";
import { showConfirmationDialog, showErrorToast, showSuccessToast } from "@/components/alert/AlertToast";
import { Pencil, Trash2 } from "lucide-react";

type Blog = {
  _id: string;
  blogtitle: string;
  slug: string;
  blogcontent: string;
  category: string | {
    _id: string;
    cat_name: string;
    icon?: string;
  };
  createdate?: string;
  image?: string;
  tags?: string[];
};

type BlogCategory = {
  _id: string;
  cat_name: string;
  icon?: string;
};

type FormDataType = {
  blogtitle: string;
  slug: string;
  blogcontent: string;
  category: string;
  createdate?: string;
  image?: File | null;
  tags: string[];
};

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [editBlog, setEditBlog] = useState<Blog | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editCategory, setEditCategory] = useState<BlogCategory | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");

  const [formData, setFormData] = useState<FormDataType>({
    blogtitle: "",
    slug: "",
    blogcontent: "",
    category: "",
    createdate: "",
    image: null,
    tags: [],
  });

  const blogApi = process.env.NEXT_PUBLIC_ADMIN_BLOG!;
  const categoryApi = process.env.NEXT_PUBLIC_ADMIN_BLOG_CATEGORY!;

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(blogApi);
      setBlogs(res.data);
      console.log(res.data);

    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(categoryApi);
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("blogtitle", formData.blogtitle);
      data.append("slug", formData.slug);
      data.append("blogcontent", formData.blogcontent);
      data.append("category", formData.category);
      data.append("createdate", formData.createdate || new Date().toISOString());
      data.append("tags", JSON.stringify(formData.tags));  // serialize tags as JSON string

      if (formData.image) data.append("image", formData.image);

      if (editBlog) {
        data.append("blog_id", editBlog._id);
        await axios.put(blogApi, data);
        showSuccessToast("Blog updated");
      } else {
        await axios.post(blogApi, data);
        showSuccessToast("Blog created");
      }

      fetchBlogs();
      setModalOpen(false);
      resetForm();
    } catch (err) {
      console.error("Error submitting blog:", err);
      showErrorToast("Submission failed");
    }
  };

  const resetForm = () => {
    setFormData({
      blogtitle: "",
      slug: "",
      blogcontent: "",
      category: "",
      createdate: "",
      image: null,
      tags: [],      // reset tags to empty array
    });
    setEditBlog(null);
    setImagePreview(null);
  };

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !formData.tags.includes(trimmed)) {
      setFormData({ ...formData, tags: [...formData.tags, trimmed] });
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tagToRemove),
    });
  };

  // Add tag on Enter or comma key
  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (tagInput.trim() !== "") {
        addTag(tagInput);
        setTagInput("");
      }
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditBlog(blog);
    setFormData({
      blogtitle: blog.blogtitle,
      slug: blog.slug,
      blogcontent: blog.blogcontent,
      category: typeof blog.category === "string" ? blog.category : blog.category?._id || "",
      createdate: blog.createdate || "",
      image: null,
      tags: blog.tags || [],     // set existing tags for edit
    });
    setImagePreview(blog.image || null);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const isConfirmed = await showConfirmationDialog("This will permanently delete the blog.");
    if (isConfirmed) {
      try {
        await axios.delete(blogApi, {
          data: { id },
          headers: {
            "Content-Type": "application/json"
          }
        });
        fetchBlogs();
        showSuccessToast("Blog deleted");
      } catch (error) {
        console.error("Delete blog error:", error);
        showErrorToast("Failed to delete blog");
      }
    }
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editCategory) {
        const res = await axios.put(categoryApi, {
          cat_id: editCategory._id,
          cat_name: newCategoryName
        });
        const updated = res.data;
        setCategories(categories.map(cat => cat._id === updated._id ? updated : cat));
        showSuccessToast("Category updated");
      } else {
        const res = await axios.post(categoryApi, { cat_name: newCategoryName });
        const data = res.data;
        setCategories([...categories, data]);
        setFormData({ ...formData, category: data._id });
        showSuccessToast("Category added");
      }

      setShowAddCategory(false);
      setNewCategoryName("");
      setEditCategory(null);
    } catch (error) {
      console.error("Category save error", error);
      showErrorToast("Failed to save category");
    } finally {
      fetchCategories();
    }
  };

  const deleteCategory = async (id: string) => {
    const isConfirmed = await showConfirmationDialog("This will permanently delete the category.");
    if (isConfirmed) {
      try {
        await axios.delete(categoryApi, {
          data: { id },
          headers: {
            "Content-Type": "application/json"
          }
        });
        fetchCategories();
        showSuccessToast("Category deleted");
      } catch (error) {
        console.error("Delete category error:", error);
        showErrorToast("Failed to delete category");
      }
    }
  };

  // Clean the tags array to extract proper strings
  const cleanTags = formData.tags.map(tag => {
    // Remove any leading/trailing square brackets and quotes
    return tag.replace(/^\[?"?/, '').replace(/"?\]?$/, '');
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Blog Management</h1>
      </div>

      {/* Category Section */}
      <div className="col-5 mt-8 mb-3 border p-4 bg-gray-50">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold text-black">Category List</h3>
          <button
            onClick={() => {
              setEditCategory(null);
              setNewCategoryName("");
              setShowAddCategory(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add Category
          </button>
        </div>

        <table className="w-full table-auto border text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Category Name</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id}>
                <td className="border p-2">{cat.cat_name}</td>
                <td className="border p-2 space-x-2 flex justify-center gap-3">
                  <button
                    className="bg-gray-500 hover:bg-gray-600  text-white p-2 mb-2 rounded"
                    onClick={() => {
                      setNewCategoryName(cat.cat_name);
                      setEditCategory(cat);
                      setShowAddCategory(true);
                    }}
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    className="text-red-800 bg-red-400 hover:bg-red-500 h-[35px] p-2 rounded"
                    onClick={() => deleteCategory(cat._id)}
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Blog List Section */}
      <div className="border" style={{ padding: "10px" }}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="block font-bold mb-3 text-black">Blog List</h3>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => {
              setModalOpen(true);
              setEditBlog(null);
              resetForm();
            }}
          >
            Add Blog
          </button>
        </div>
        <table className="w-full table-auto border text-center">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Slug</th>
              <th className="p-2 border">Content</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Tags</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id}>
                <td className="border p-2">{blog.blogtitle}</td>
                <td className="border p-2">{blog.slug}</td>
                <td className="border p-2">{blog.blogcontent.slice(0, 50)}...</td>
                <td className="border p-2">
                  {typeof blog.category === "string"
                    ? categories.find((cat) => cat._id === blog.category)?.cat_name || blog.category
                    : blog.category?.cat_name}
                </td>

                <td className="border p-2">
                  {Array.isArray(blog.tags) && blog.tags.length > 0 ? (
                    <>
                      {blog.tags
                        .slice(0, 2)
                        .map((tag) =>
                          // Clean tag by removing leading/trailing brackets and quotes
                          tag.replace(/^\[?"?/, '').replace(/"?\]?$/, '')
                        )
                        .map((cleanTag) => (
                          <span
                            key={cleanTag}
                            className="inline-block bg-blue-100 text-blue-800 text-xs rounded px-2 py-0.5 mr-1"
                          >
                            {cleanTag}
                          </span>
                        ))}
                      {blog.tags.length > 2 && (
                        <span className="inline-block text-gray-500 text-xs">and more...</span>
                      )}
                    </>
                  ) : (
                    "—"
                  )}
                </td>

                <td className="border p-2 space-x-2 flex gap-3">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="bg-gray-500 hover:bg-gray-600  text-white p-2 mb-2 rounded"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="text-red-800 bg-red-400 hover:bg-red-500 h-[35px] p-2 rounded"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Blog Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-white bg-opacity-40 flex justify-center items-center">
          <div
            className="bg-white border rounded-lg w-full max-w-5xl overflow-y-auto max-h-[90vh] p-6 relative"
            style={{ padding: "10px" }}
          >
            <h2 className="text-xl font-bold mb-4">{editBlog ? "Edit" : "Add"} Blog</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-2">
                <select
                  className="w-[50%] border p-2 mb-2"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.cat_name}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Title"
                  className="w-[50%] border p-2 mb-2"
                  value={formData.blogtitle}
                  onChange={(e) => setFormData({ ...formData, blogtitle: e.target.value })}
                  required
                />
              </div>

              <label htmlFor="Slug" className="font-bold mt-3">
                Slug
              </label>
              <input
                type="text"
                placeholder="Slug"
                className="w-full border p-2 mb-2"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              />

              <label htmlFor="Content" className="font-bold mt-3">
                Content
              </label>
              <SimpleEditor
                value={formData.blogcontent}
                onChange={(html) => setFormData({ ...formData, blogcontent: html })}
              />

              <label htmlFor="image" className="col-12 font-bold mt-3">
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                className="col-4 border p-2 mb-2"
                onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
              />

              {imagePreview && (
                <div className="mt-2">
                  <img src={imagePreview} alt="Preview" className="h-28 w-28 object-cover" />
                </div>
              )}

              <div className="my-4">
                <label htmlFor="tags" className="block mb-1 font-semibold">
                  Tags
                </label>
                <input
                  id="tags"
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInputKeyDown}
                  placeholder="Type a tag and press Enter or comma"
                  className="border rounded px-2 py-1 w-full"
                />

                <div className="mt-2 flex flex-wrap gap-2">
                  {cleanTags.map(tag => (
                    <span
                      key={tag}
                      className="flex gap-2   items-center bg-blue-100 text-blue-700 rounded px-2 py-0.5 text-sm cursor-default"
                    >
                      {tag}
                      <button
                        type="button"
                        className="ml-1 text-blue-900 hover:text-blue-600"
                        onClick={() => removeTag(tag)}
                        aria-label={`Remove tag ${tag}`}
                        style={{fontSize:"25px"}}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>

              </div>

              <div className="flex gap-2 justify-end mt-4">
                <button
                  type="button"
                  className="btn btn-secondary px-4 py-2"
                  onClick={() => {
                    setModalOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary px-4 py-2">
                  {editBlog ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add/Edit Category Modal */}
      {showAddCategory && (
        <div className="fixed inset-0 z-50 bg-white bg-opacity-40 flex justify-center items-center">
          <div
            className="bg-white border rounded-lg w-96 p-6 relative"
            style={{ padding: "10px" }}
          >
            <h2 className="text-xl font-bold mb-4">{editCategory ? "Edit" : "Add"} Category</h2>
            <form onSubmit={handleCategorySubmit}>
              <input
                type="text"
                placeholder="Category Name"
                className="w-full border p-2 mb-4"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                required
              />
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  className="btn btn-secondary px-4 py-2"
                  onClick={() => {
                    setShowAddCategory(false);
                    setNewCategoryName("");
                    setEditCategory(null);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary px-4 py-2">
                  {editCategory ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
