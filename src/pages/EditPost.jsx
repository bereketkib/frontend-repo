import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../config";
// import blogsData from "../data/blogs";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/blogs/${id}`)
      .then((response) => {
        const { title, author, excerpt } = response.data;
        setTitle(title);
        setAuthor(author);
        setExcerpt(excerpt);
      })
      .catch((error) => console.error("Error fetching blog:", error));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    axios
      .put(`${API_URL}/blogs/${id}`, { title, author, excerpt })
      .then(() => navigate("/"))
      .catch((error) => console.error("Error updating blog:", error));
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [excerpt]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Edit Blog Post</h2>
      <form
        onSubmit={handleUpdate}
        className="max-w-md mx-auto flex flex-col gap-4 bg-white p-6 shadow-md rounded-lg"
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded p-2"
          required
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border border-gray-300 rounded p-2"
          required
        />
        <textarea
          ref={textareaRef}
          value={excerpt}
          onChange={(e) => {
            setExcerpt(e.target.value);
            adjustTextareaHeight();
          }}
          className="border border-gray-300 rounded p-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Update Blog Post
        </button>
      </form>
    </div>
  );
}

export default EditPost;
