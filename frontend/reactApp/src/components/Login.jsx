import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Login successful!"); // Success message
        setShowMessage(true);

        // Clear form fields
        setFormData({
          username: "",
          password: "",
        });
      } else {
        setMessage(data.message || "Login failed."); // Error message
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
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-purple-600 hover:to-blue-600 focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-300"
          >
            Login
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

export default Login;
