import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BlogDetailsPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();
  const baseURL = 'http://localhost:5000'; // Replace with your server's base URL

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/blogs/${id}`);
        setBlog(res.data);
      } catch (error) {
        console.error('Error fetching blog details:', error);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) {
    return <p className="text-center text-gray-500 mt-10">Loading blog...</p>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Back
      </button>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {blog.thumbnail && (
          <img
            src={`${baseURL}${blog.thumbnail}`}
            alt={blog.title}
            className="w-full h-64  rounded-lg mb-4 object-contain"
          />
        )}
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <p className="text-gray-700 mb-6">{blog.content}</p>
        <div className="flex justify-between items-center text-gray-500 text-sm">
          <span>By {blog.author.username}</span>
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          <span>{blog.category}</span>
        </div>
        <div className="mt-4">
          <span className="text-gray-500">{blog.likes.length} Likes</span>
          <span className="ml-4 text-gray-500">{blog.comments.length} Comments</span>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
