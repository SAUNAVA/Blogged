import React from 'react';
// import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to Perfect Blog App</h1>
      <p className="text-lg mb-6">Your one-stop solution for blogging and sharing ideas.</p>
      <button onClick={()=>navigate('/explore')} className="px-6 py-3 cursor-pointer bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:bg-gray-100">
        Explore ...
      </button>
      
    </div>
    
    </>
  );
};

export default LandingPage;
