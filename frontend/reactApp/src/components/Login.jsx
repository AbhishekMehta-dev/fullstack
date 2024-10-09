import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false); // Controls notification visibility
  const [messageType, setMessageType] = useState(""); // To differentiate message styles
  const navigate = useNavigate();

  // Check if the user is already logged in on page load
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("accessToken");
    if (isLoggedIn) {
      // Show a message and redirect if user is already logged in
      setMessage("You are already logged in!");
      setMessageType("info"); // Message type for styling
      setShowMessage(true);

      // Automatically hide the message after 2 seconds and redirect
      setTimeout(() => {
        setShowMessage(false);
        navigate("/home");
      }, 2000);
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the user is already logged in during form submission
    const isLoggedIn = localStorage.getItem("accessToken");
    if (isLoggedIn) {
      setMessage("You are already logged in!");
      setMessageType("info");
      setShowMessage(true);

      setTimeout(() => {
        setShowMessage(false);
        navigate("/home");
      }, 2000);
      return;
    }

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
        setMessage("Login successful!");
        setMessageType("success");
        setShowMessage(true);

        // Save token in localStorage
        localStorage.setItem("accessToken", data.accessToken);

        // Clear form fields
        setFormData({
          username: "",
          password: "",
        });

        // Redirect to home page after displaying success message for 2 seconds
        setTimeout(() => {
          setShowMessage(false);
          navigate("/home");
        }, 2000);
      } else {
        setMessage(data.message || "Login failed.");
        setMessageType("error");
        setShowMessage(true);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      setMessageType("error");
      setShowMessage(true);
    }

    // Hide the message after 3 seconds (for login errors)
    setTimeout(() => setShowMessage(false), 3000);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          Login
        </h2>
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

export default Login;
