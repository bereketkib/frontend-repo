import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../config";
// import blogsData from "../data/blogs";

function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/blogs`)
      .then((response) => setBlogs(response.data))
      .catch((error) => console.error("Error fetching blogs:", error));
  });

  const handleDelete = (id) => {
    axios
      .delete(`${API_URL}/blogs/${id}`)
      .then(() => {
        setBlogs(blogs.filter((blog) => blog._id !== id));
      })
      .catch((error) => console.error("Error deleting blog:", error));
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Latest Blog Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
            <p className="text-gray-600 mb-4">
              <strong>Author:</strong> {blog.author}
            </p>
            <p className="text-gray-700 line-clamp-2">{blog.excerpt}</p>
            <div className="mt-4 flex justify-between">
              <Link
                to={`/blogs/${blog._id}`}
                className="text-blue-500 hover:underline"
              >
                Read More
              </Link>
              <Link
                to={`/edit-post/${blog._id}`}
                className="text-lime-500 hover:underline"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(blog._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
