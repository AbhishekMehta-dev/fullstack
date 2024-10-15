import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

 
  // // If no user is logged in, display a message or redirect
  // if (!user) {
  //   return (
  //     <div className="container mx-auto mt-10 px-4">
  //       <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
  //         Welcome to Our App!
  //       </h1>
  //       <p className="text-lg text-gray-700 text-center mb-8">
  //         You must be logged in to view this page. Please{' '}
  //         <Link to="/login" className="text-blue-500 hover:underline font-semibold">
  //           login
  //         </Link>{' '}
  //         or{' '}
  //         <Link to="/register" className="text-blue-500 hover:underline font-semibold">
  //           register
  //         </Link>
  //         .
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <div className="container mx-auto mt-10 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
          Welcome, {user.fullname}!
        </h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          You are logged in as <strong>{user.role}</strong>. This is the home page, and it's only visible to authenticated users.
        </p>

        
        
      </div>
    </div>
  );
};

export default Home;