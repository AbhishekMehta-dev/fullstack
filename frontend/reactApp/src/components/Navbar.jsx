import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-grey-500 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
            <Link to="/home" className="flex items-center">
            <img
              src="https://static-00.iconduck.com/assets.00/react-icon-512x456-ej1s859d.png"
              className="mr-3 h-12"
              alt="Logo"
            />
          </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <>
                <Link to="/" className="py-2 px-2 text-black hover:text-gray-200 transition duration-300">Home</Link>
                <button onClick={handleLogout} className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded transition duration-300">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="py-2 px-2 text-black hover:text-gray-200 transition duration-300">Login</Link>
                <Link to="/register" className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded transition duration-300">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;