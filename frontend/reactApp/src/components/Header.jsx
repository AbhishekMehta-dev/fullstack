import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check localStorage to determine if the user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true); // User is logged in
    } else {
      setIsLoggedIn(false); // User is not logged in
    }
  }, []);

  // Handle logout process
  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Clear token from localStorage
    setIsLoggedIn(false); // Update isLoggedIn state
    navigate("/home"); // Redirect to home page after logout
  };

  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/home" className="flex items-center">
            <img
              src="https://static-00.iconduck.com/assets.00/react-icon-512x456-ej1s859d.png"
              className="mr-3 h-12"
              alt="Logo"
            />
          </Link>

          <div className="flex items-center lg:order-2">
            {isLoggedIn ? (
              // Show Logout button if user is logged in
              <button
                onClick={handleLogout}
                className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              >
                Logout
              </button>
            ) : (
              // Show Register and Login buttons if user is not logged in
              <>
                <NavLink
                  to="/register"
                  className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                >
                  Register
                </NavLink>

                <NavLink
                  to="/login"
                  className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                >
                  Login
                </NavLink>
              </>
            )}
          </div>

          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/home"
                  className="block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0"
                >
                  Home
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
