import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false); // Controls notification visibility
  const [messageType, setMessageType] = useState("success"); // Controls message type
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("User registered successfully!"); // Success message
        setMessageType("success");
        setShowMessage(true);

        // Clear form fields
        setFormData({
          fullname: "",
          username: "",
          email: "",
          password: "",
          role: "user",
        });

        // Automatically redirect after successful registration
        setTimeout(() => {
          navigate("/login"); // Redirect to login page or desired route
        }, 2000); // Redirect after 2 seconds
      } else {
        setMessage(data.message || "Registration failed."); // Error message
        setMessageType("error");
        setShowMessage(true);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again."); // Error message for any other failure
      setMessageType("error");
      setShowMessage(true);
    }

    // Automatically hide the message after 5 seconds
    setTimeout(() => setShowMessage(false), 5000);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">Create Account</h2>
        <form onSubmit={handleSubmit}>
          {/* Full Name Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="fullname">
              Full Name:
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
              placeholder="Enter your full name"
            />
          </div>

          {/* Username Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="username">
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

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
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

          {/* Role Select */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="role">
              Role:
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="agency">Agency</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-purple-600 hover:to-blue-600 focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-300"
          >
            Register
          </button>
        </form>
      </div>

      {/* Sliding Notification Bar */}
      {showMessage && (
  <div
    className={`fixed top-1/2 right-5 transform -translate-y-1/2 p-4 rounded-lg shadow-lg transition-all duration-500 ease-in-out animate-slide-in ${
      messageType === "success"
        ? "bg-green-500"
        : messageType === "error"
        ? "bg-red-500"
        : "bg-blue-500"
    } text-white font-semibold`}
  >
    <p>{message}</p>
  </div>
)}
    </div>
  );
};

export default Register;
