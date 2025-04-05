import React, {  useEffect, useState } from 'react'
// import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FaEdit, FaTrash  } from 'react-icons/fa'; // Import icons
import { CiCirclePlus  } from 'react-icons/ci'; // Import icons

const YourProfile = () => {

  // const {user , isLoading} = useContext(AuthContext)
  const[blogs,setBlogs] = useState([])
  const[bio, setBio] = useState('')
  const[blogCount , setBlogCount] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    
    const fetchUserBlogs = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/blogs/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlogs(res.data);
        setBlogCount(res.data.length)
       

        const userBio = await axios.get('/auth/bio',{
          headers: { Authorization: `Bearer ${token}` },
        })
        setBio(userBio.data.bio || '')
      } catch (error) {
        console.error('Error fetching user blogs:', error);
      }
    };
    fetchUserBlogs();
  }, [bio])

  const handleDelete = async(id)=>{
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`/blogs/${id}`,{
        headers : {Authorization:`Bearer ${token}`}
      })
      setBlogs(blogs.filter((blog)=>blog._id !== id))
    } catch (error) {
      console.error('Error deleting blog:', error)
    }
  }

  const handleDeleteBio = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete('/auth/bio', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(bio)
      setBio('');
    } catch (error) {
      console.error('Error deleting bio:', error);
    }
  };

  return (
    <div
      className="container mx-auto p-4 mb-10 bg-gray-100 min-h-screen overflow-y-scroll"
      style={{ overflowY: 'auto' , height:'100vh' }}
      
    >
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center ">
        <div>
          <h2 className="text-xl font-bold mb-2">Your Profile</h2>
          <p className="text-gray-700 mb-2">
            <strong>Number of Blogs:</strong> {blogCount}
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Bio:</strong> {bio || 'No bio available.'}
          </p>
          <div>
          <button
            onClick={() => navigate('/edit-bio')}
            className="text-blue-500 hover:text-blue-600"
          >
            {bio ? 'Edit Your Bio' : 'Create Your Bio'}
          </button>
          {bio ? (
            <button
              onClick={handleDeleteBio}
              className="text-red-500 hover:text-red-600 ml-4"
            >
              Delete Your Bio
            </button>
          ) : null}
        </div>
        </div>
        {/*  Later add more details to the bio */}
        {/* <div>
          <button>hello</button>
          <button>hello</button>
        </div> */}
      </div>


      
      <h2 className="text-2xl font-bold mr-2">Your Blogs</h2>
      <div className="flex items-center mb-4">
        <h3 className="font-bold mr-2">Add a new blog</h3>
        <button onClick={()=>navigate('/createBlog')} className="text-gray-300 hover:text-gray-800 hover:scale-105"><CiCirclePlus size={20}/></button>
      </div>
      {blogs.length===0? <p className="text-gray-500">No blogs</p>:(
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-20" >
          {blogs.map((blog)=>(
            <div key={blog._id} className="border border-gray-300 rounded-lg p-4 shadow-md bg-white hover:shadow-2xl hover:scale-105 hover:bg-gray-50 transition-all duration-300 flex flex-col justify-between h-64 ">
              <div>
                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                <p className="text-gray-700 mb-4">{blog.content.substring(0,100)}...</p>
              </div>
              <div className="flex justify-end space-x-4 mt-auto">
                <span>{new Date(blog.createdAt).toLocaleString()}</span>
                <button onClick={()=>navigate(`/edit-blog/${blog._id}`)} className="text-blue-500 hover:text-blue-600" title="Edit">
                  <FaEdit size={20} />
                </button>
                <button onClick={()=>handleDelete(blog._id)} className="text-red-500 hover:text-red-600" title="Delete">
                  <FaTrash size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default YourProfile
