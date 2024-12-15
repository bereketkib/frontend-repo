import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../config";
// import blogs from "../data/blogs";

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/blogs/${id}`)
      .then((response) => {
        setBlog(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Blog not found!");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6"> {blog.title} </h2>
      <p className="text-gray-600 mb-4">
        <strong>Author:</strong> {blog.author}
      </p>
      <p className="text-gray-700">{blog.excerpt}</p>
    </div>
  );
}

export default BlogDetails;
