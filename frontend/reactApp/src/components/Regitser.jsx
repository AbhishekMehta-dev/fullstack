import React, { useState } from "react";

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
        setShowMessage(true);

        // Clear form fields
        setFormData({
          fullname: "",
          username: "",
          email: "",
          password: "",
          role: "user",
        });
      } else {
        setMessage(data.message || "Registration failed."); // Error message
        setShowMessage(true);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again."); // Error message for any other failure
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
        <div className="fixed top-0 right-0 left-0 bg-blue-600 text-white p-4 font-semibold shadow-lg transform transition-all duration-500 ease-in-out translate-y-0 animate-slide-in">
          <p className="text-center">{message}</p>
        </div>
      )}
    </div>
  );
};

export default Register;
