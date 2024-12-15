import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../config";
// import blogs from "../data/blogs";

function NewPost() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const navigate = useNavigate();
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${API_URL}/blogs`, { title, author, excerpt })
      .then(() => navigate("/"))
      .catch((error) => console.error("Error creating blog:", error));
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Create a New Blog Post</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto flex flex-col gap-4 bg-white p-6 shadow-md rounded-lg"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded p-2"
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border border-gray-300 rounded p-2"
          required
        />
        <textarea
          ref={textareaRef}
          placeholder="Excerpt"
          value={excerpt}
          onChange={(e) => {
            setExcerpt(e.target.value);
            adjustTextareaHeight();
          }}
          className="border border-gray-300 rounded p-2"
          required
          rows="3"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Add Blog Post
        </button>
      </form>
    </div>
  );
}

export default NewPost;
