import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import categories from "../data/categories"; // Assuming you have a categories.js file with an array of categories

const EditBlogPage = () => {
  const { id } = useParams(); // Get blog ID from URL
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`/blogs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTitle(res.data.title);
        setContent(res.data.content);
        setCategory(res.data.category);
      } catch (err) {
        console.error("Error fetching blog", err);
        setError("Failed to load blog");
      }
    };

    fetchBlog();
  }, [id]);

  const handleSubmit= async (e) => {
    e.preventDefault();

    if (!title || !content || !category) {
      setError("All fields are required");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/blogs/${id}`,
        { title, content, category ,image},
        { headers: { Authorization: `Bearer ${token}`,
      'Content-Type':'multipart/form-data' } }
      );

      navigate("/profile"); // Redirect back to profile page after updating
    } catch (err) {
      console.error("Error updating blog", err);
      setError("Error updating blog");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex items-center justify-center">
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Create a New Blog</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Enter the title ..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              placeholder="Enter the content ..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="6"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat.toLowerCase()}>
                  {cat}
                </option>
              ))}
            </select>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              Create
            </button>
          </form>
        </div>
      </div>
      
    </div>
  );
};

export default EditBlogPage;
