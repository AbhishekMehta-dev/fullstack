import React, { useState, useEffect } from "react";
import { Link,NavLink,useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import './Loader.css';  // Import the loader CSS

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();  
  const navigate = useNavigate();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is already logged in on page load
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("accessToken");
    if (isLoggedIn) {
      // Redirect to home if already logged in
      navigate("/home");
      
    }
  }, [login, navigate]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true); // Show loader during form submission

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Save token in localStorage
        localStorage.setItem("accessToken", data.accessToken);

        // Redirect after showing loader for 2 seconds
        setTimeout(() => {
          setIsLoading(false); // Hide loader
          navigate("/home"); 
          window.location.reload(); // Redirect to home
        }, 300);
      } else {
        // Handle errors if login fails
        setIsLoading(false); // Hide loader
        alert(data.message || "Login failed.");
      }
    } catch (error) {
      setIsLoading(false); // Hide loader on error
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          Login
        </h2>
        

        {isLoading ? (
          // Show loader if loading is true
          <div className="flex justify-center items-center">
            <div className="loader"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Username Field */}
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="username"
              >
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
                placeholder="Enter your username"
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="password"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
                placeholder="Enter your password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-purple-600 hover:to-blue-600 focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-300"
            >
              Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
