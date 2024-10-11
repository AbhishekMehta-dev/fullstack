import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Handling the logout action
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // If no user is logged in, display a message or redirect
  if (!user) {
    return (
      <div className="container mx-auto mt-10 px-4">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
          Welcome to Our App!
        </h1>
        <p className="text-lg text-gray-700 text-center mb-8">
          You must be logged in to view this page. Please{' '}
          <Link to="/login" className="text-blue-500 hover:underline font-semibold">
            login
          </Link>{' '}
          or{' '}
          <Link to="/register" className="text-blue-500 hover:underline font-semibold">
            register
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
          Welcome, {user.fullname}!
        </h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          You are logged in as <strong>{user.role}</strong>. This is the home page, and it's only visible to authenticated users.
        </p>

        <div className="flex justify-center space-x-6">
          {/* Conditionally render the "Go to Category" button for normal users */}
          {user.role === 'user' && (
            <Link
              to="/category"
              className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105"
            >
              Click to see all Categories
            </Link>
          )}
        </div>

        
      </div>
    </div>
  );
};

export default Home;
