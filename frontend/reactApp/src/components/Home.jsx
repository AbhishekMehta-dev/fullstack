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
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome!</h1>
        <p className="text-black">
          You must be logged in to view this page. Please{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            login
          </Link>{' '}
          or{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            register
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Welcome, {user.fullname}!
      </h1>
      <p className="text-black mb-4">
        You are logged in as <strong>{user.role}</strong>. This is the home page
        and is only visible to authenticated users.
      </p>

      <div className="flex space-x-4">
        {/* Conditionally render the "Go to Category" button for normal users */}
        {user.role === 'user' && (
          <Link
            to="/category"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Go to Category
          </Link>
        )}

        
      </div>
    </div>
  );
};

export default Home;
