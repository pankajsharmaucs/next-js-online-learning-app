"use client";

import SimpleEditor from "@/components/editor/SimpleEditor";
import axios from "axios";
import { useEffect, useState } from "react";
import { showConfirmationDialog } from "@/components/alert/AlertToast";

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
};

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [editBlog, setEditBlog] = useState<Blog | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editCategory, setEditCategory] = useState<BlogCategory | null>(null);

  const [formData, setFormData] = useState<FormDataType>({
    blogtitle: "",
    slug: "",
    blogcontent: "",
    category: "",
    createdate: "",
    image: null,
  });
  const blogApi = process.env.NEXT_PUBLIC_ADMIN_BLOG!;
  const categoryApi = process.env.NEXT_PUBLIC_ADMIN_BLOG_CATEGORY!;

  const fetchBlogs = async () => {
    const res = await axios.get(blogApi);
    setBlogs(res.data);
  };

  const fetchCategories = async () => {
    const res = await axios.get(categoryApi);
    setCategories(res.data);
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
      data.append("createdate", formData.createdate || new Date().toISOString());
      data.append("category", formData.category);
      if (formData.image) data.append("image", formData.image);

      if (editBlog) {
        data.append("blog_id", editBlog._id);
        await axios.put(blogApi, data);
      } else {
        await axios.post(blogApi, data);
      }

      fetchBlogs();
      setModalOpen(false);
      setFormData({ blogtitle: "", slug: "", blogcontent: "", category: "", image: null });
      setEditBlog(null);
    } catch (error) {
      console.error("Submit error", error);
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
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const isConfirmed = await showConfirmationDialog("This will permanently delete the category.");
    if (isConfirmed) {
      try {
        await axios.delete(blogApi, {
          data: { id },
          headers: {
            "Content-Type": "application/json"
          }
        });
        fetchBlogs();
      } catch (error) {
        console.error("Delete category error:", error);
      }
    }
  };


  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editCategory) {
        const res = await axios.put(`${categoryApi}`, {
          cat_id: editCategory._id,
          cat_name: newCategoryName
        });
        const updated = res.data;
        setCategories(categories.map(cat => cat._id === updated._id ? updated : cat));
      } else {
        const res = await axios.post(categoryApi, { cat_name: newCategoryName });
        const data = res.data;
        setCategories([...categories, data]);
        setFormData({ ...formData, category: data._id });
      }

      setShowAddCategory(false);
      setNewCategoryName("");
      setEditCategory(null);
    } catch (error) {
      console.error("Category save error", error);
    } finally {
      fetchCategories()
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
      } catch (error) {
        console.error("Delete category error:", error);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Blog Management</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => {
            setModalOpen(true);
            setEditBlog(null);
            setFormData({ blogtitle: "", slug: "", blogcontent: "", category: "", image: null });
          }}
        >
          Add Blog
        </button>
      </div>

      <div className="mt-8 border p-4 bg-gray-50">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold text-black">Category List</h3>
          <button
            onClick={() => {
              setEditCategory(null); // make sure it's a new category
              setNewCategoryName(""); // clear input
              setShowAddCategory(true); // show modal
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
                <td className="border p-2 space-x-2">
                  <button
                    className="bg-gray-600 text-white px-3 me-2 py-1 rounded"
                    onClick={() => {
                      setNewCategoryName(cat.cat_name);
                      setEditCategory(cat);
                      setShowAddCategory(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-800 text-white px-3 me-2 py-1 rounded"
                    onClick={() => deleteCategory(cat._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border " style={{ padding: "10px" }} >
        <h3 className="block font-bold mb-3 text-black">Blog List </h3>
        <table className="w-full table-auto border text-center">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Slug</th>
              <th className="p-2 border">Content</th>
              <th className="p-2 border">Category</th>
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
                <td className="border p-2 space-x-2">
                  <button onClick={() => handleEdit(blog)} className="bg-gray-600 w-[70px] text-white px-4 py-2 me-2  rounded">Edit</button>
                  <button onClick={() => handleDelete(blog._id)} className="bg-red-800 w-[100px] text-white px-4 me-2 py-2 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-white bg-opacity-40 flex justify-center items-center">
          <div className="bg-white border rounded-lg w-full max-w-5xl overflow-y-auto max-h-[90vh] p-6 relative" style={{ padding: "10px" }}>
            <h2 className="text-xl font-bold mb-4">{editBlog ? "Edit" : "Add"} Blog</h2>
            <form onSubmit={handleSubmit} className="space-y-4 ">

              <div className="flex gap-2">
                <select
                  className="w-[50%] border p-2 mb-2"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
                />
              </div>

              <input
                type="text"
                placeholder="Slug"
                className="w-full border p-2 mb-2"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              />

              <SimpleEditor
                value={formData.blogcontent}
                onChange={(html) => setFormData({ ...formData, blogcontent: html })}
              />

              <div className="flex justify-end gap-2 my-3">
                <button
                  type="button"
                  className="bg-gray-400 px-4 py-2 rounded"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                  {editBlog ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddCategory && (
        <div className="fixed inset-0 bg-white bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded shadow-md w-[400px]">
            <h3 className="text-lg font-bold mb-2">Add Category</h3>
            <form onSubmit={handleCategorySubmit} >
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Category name"
                className="border p-2 w-full mb-4"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-3 py-1 bg-gray-300 rounded"
                  onClick={() => setShowAddCategory(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  {!editCategory ? 'Add' : 'Edit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
