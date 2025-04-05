import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import logo from '../assets/logo.png' // Import the logo image

const NavBar = () => {
  const {user , logout} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () =>{
    logout()
    navigate('/login')
  }
  return (
    <nav className="sticky top-0 w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white p-4 flex justify-between items-center shadow-lg z-50 ">
      <div className="flex space-x-6">
        <Link to='/'>
          <img 
            src={logo} 
            alt="Logo" 
            style={{ width: 'auto', height: '30px' }} // Adjust proportions
          />
        </Link>
        
      </div>
      <div className="flex space-x-6">
      <Link to='/explore' className="hover:text-yellow-300 transition duration-300">Blogs</Link>
        {user ? (
          <>
            <Link to='/createBlog' className="hover:text-yellow-300 transition duration-300">Create Post</Link>
            <Link to='/profile' className="hover:text-yellow-300 transition duration-300">Your Profile</Link>
            <button 
              onClick={handleLogout} 
              className="hover:text-yellow-300 transition duration-300"
            >
              LogOut
            </button>
          </>
        ) : (
          <>
            <Link to='/login' className="hover:text-yellow-300 transition duration-300">Login</Link>
            <Link to='/register' className="hover:text-yellow-300 transition duration-300">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default NavBar
