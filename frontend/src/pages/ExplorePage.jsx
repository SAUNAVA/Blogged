import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {FcLike , FcLikePlaceholder} from 'react-icons/fc'

const ExplorePage = () => {
  const [blogs, setBlogs] = useState([])
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const navigate = useNavigate()
  const baseURL = 'http://localhost:5000'; // Replace with your server's base URL

  const handleLike = async (blogId) => {
    try {
      const token = localStorage.getItem('token')
      if(!token){
        alert('Please login to like a blog')
        // navigate('/login')
        return
      }
      const userId = JSON.parse(atob(token.split('.')[1])).id // Decode user ID from token
      await axios.put(
        `/blogs/like/${blogId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      // Toggle the like in the blogs state
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === blogId
            ? {
                ...blog,
                likes: blog.likes.includes(userId)
                  ? blog.likes.filter((id) => id !== userId) // Remove like
                  : [...blog.likes, userId], // Add like
              }
            : blog
        )
      )
    } catch (error) {
      console.error('Error liking the blog:', error)
    }
  }

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('/blogs', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setBlogs(res.data)
        console.log(res.data[0])
      } catch (error) {
        console.error('Error fetching user blogs:', error)
      }
    }
    fetchUserBlogs()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollToTop(true)
      } else {
        setShowScrollToTop(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen scrollBar">
      <h2 className="text-2xl font-bold mb-4">Explore Blogs</h2>
      {blogs.length === 0 ? (
        <p className="text-gray-500">No blogs</p>
      ) : (
        <div className="snap-y snap-mandatory h-140 overflow-y-scroll ">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              
              className="snap-center border border-gray-300 rounded-lg p-4 shadow-md bg-white hover:shadow-2xl hover:scale-101 hover:bg-gray-50 transition-all duration-300 flex flex-col justify-between h-full "
            >
              <div className="flex items-start p-2">
                {blog.thumbnail && (
                  <img
                    src={`${baseURL}${blog.thumbnail}`}
                    alt={blog.title}
                    className="w-1/3 h-100 object-contain mr-4"
                  />
                )}
                <div className="flex-1 ml-3 mt-20">
                  <h3 className="text-3xl font-semibold mb-4">{blog.title}</h3>
                  <p className="text-gray-700 mb-6">{blog.content.substring(0, 300)}
                    <p
                      onClick={() => navigate(`/blogs/${blog._id}`)}
                      className="cursor-pointer text-blue-500 hover:underline"
                    >
                      read more ...
                    </p>
                  </p>

                </div>
                <span className="text-gray-700 font-medium">By {blog.author.username}</span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleLike(blog._id)}
                  className=" "
                >
                  {(() => {
                    const token = localStorage.getItem('token');
                    if (token) {
                      const userId = JSON.parse(atob(token.split('.')[1])).id;
                      return blog.likes.includes(userId) ? (
                        <FcLike className="text-2xl" />
                      ) : (
                        <FcLikePlaceholder className="text-2xl" />
                      );
                    }
                    return <FcLikePlaceholder className="text-2xl" />;
                  })()}
                  {blog.likes.length}
                </button>
                <span className="text-gray-500 text-sm">
                  {blog.comments.length} Comments
                </span>
              </div>
              <div className="flex justify-between items-center mt-auto">

                <span className="text-gray-500 text-sm">Approx: {Math.ceil(blog.content.split(' ').length / 200)} min read</span>
                  
                  <span className="text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</span>
                  
                  <span className="text-gray-700 font-medium">{blog.category}</span>

                
              </div>
            </div>
          ))}
        </div>
      )}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
        >
          ↑
        </button>
      )}
    </div>
  )
}

export default ExplorePage