import React from 'react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome, {user.username}!</h1>
      <p className="text-black">This is the home page. You can only see this if you're logged in.</p>
    </div>
  );
};

export default Home;