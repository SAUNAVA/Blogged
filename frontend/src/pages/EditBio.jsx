import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const EditBio = () => {
  const [bio, setBio] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('/auth/bio', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setBio(res.data.bio || '') // Pre-populate bio if it exists
      } catch (error) {
        console.error('Error fetching bio:', error)
      }
    }
    fetchBio()
  }, [])

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token')
      await axios.post(
        'auth/bio',
        { bio },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      navigate('/profile') // Redirect back to profile page
    } catch (error) {
      console.error('Error saving bio:', error)
    }
  }
  

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Edit Your Bio</h2>
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
        rows="5"
        placeholder="Write something about yourself..."
      ></textarea>
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Save Bio
      </button>
    </div>
  )
}

export default EditBio