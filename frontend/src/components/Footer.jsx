import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 text-center">
      <div className="flex justify-center space-x-6 mb-2">
        <Link to="/about" className="hover:text-yellow-300 transition duration-300">About</Link>
        <Link to="/contact" className="hover:text-yellow-300 transition duration-300">Contact</Link>
        <Link to="/privacy" className="hover:text-yellow-300 transition duration-300">Privacy Policy</Link>
      </div>
      <p className="text-sm">&copy; {new Date().getFullYear()} Perfect Blog App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
