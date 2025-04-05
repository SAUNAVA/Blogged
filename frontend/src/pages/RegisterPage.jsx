import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('') // Added error state
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const username = name
      await axios.post('/auth/register', { username, email, password })
      navigate('/login')
      setError('') // Clear error on successful registration
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || error.response.statusText
        if (errorMessage.toLowerCase().includes('duplicate')) {
          setError('Email or username already exists. Please use a different one.') // Specific error message
        } else {
          console.error("Registration failed", errorMessage)
          setError('Registration failed. Please try again.') // General error message
        }
      } else {
        console.error("Registration failed", error.message)
        setError('Registration failed. Please try again.') // General error message
      }
    }
  }

  return (
    <div className="login-form flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Register</h2>
      {error && <p className="error-message text-red-500 mb-4">{error}</p>} {/* Styled error message */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <div className="form-group mb-4">
          <label htmlFor="username" className="block text-gray-700 mb-2">Username</label> {/* Added label */}
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">Email</label> {/* Added label */}
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">Password</label> {/* Added label */}
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default RegisterPage
