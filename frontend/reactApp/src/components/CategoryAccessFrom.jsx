import React, { useState, useEffect } from "react";
import { getCategories, deleteCategory } from "../api/Category";
import { useNavigate } from "react-router-dom";
import { useCategory } from "../context/CategoryContext"; // Import the context
import { useAuth } from "../context/AuthContext"; // Import authentication context
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const CategoryAccessForm = () => {
  const [categories, setCategories] = useState([]);
  const { updateCategoryData } = useCategory(); // Use the context
  const { user } = useAuth(); // Use authentication context to get the user role
  const navigate = useNavigate();

  // Fetch categories when the component loads
  useEffect(() => {
    refreshCategories();
  }, []);

  const refreshCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found. Please log in again.");
      }

      await deleteCategory(categoryId, accessToken);
      setCategories(categories.filter((cat) => cat._id !== categoryId));
    } catch (err) {
      console.error("Failed to delete category:", err);
    }
  };

  const startEditing = (category) => {
    updateCategoryData(category); // Pass category data to context
    navigate("/new-category"); // Redirect to /new-category form
  };

  // Function to check if the user is admin
  const isAdmin = () => {
    return user?.role === "admin";
  };

  // Function to check if the user is an agency
  const isAgency = () => {
    return user?.role === "agency";
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Existing Categories</h2>
        {/* Only admins can see the Create Category button */}
        {isAdmin() && (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
            onClick={() => navigate("/new-category")}
          >
            Create Category
          </button>
        )}
      </div>

      {categories.length === 0 ? (
        <p className="text-center text-gray-500">No categories available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Description</th>
                {/* Conditionally render the Actions column header */}
                {(isAdmin() || isAgency()) && (
                  <th className="py-2 px-4 border-b text-left">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{category.name}</td>
                  <td className="py-2 px-4 border-b">{category.description}</td>
                  {/* Conditionally render the Actions buttons */}
                  {(isAdmin() || isAgency()) && (
                    <td className="py-2 px-4 border-b flex space-x-2">
                      {/* Update button (for both admin and agency) */}
                      <button
                        className="text-yellow-500 hover:text-yellow-600 transition duration-300"
                        onClick={() => startEditing(category)}
                      >
                        <FaEdit size={30} />
                      </button>
                      {/* Delete button (for admin only) */}
                      {isAdmin() && (
                        <button
                          className="text-red-500 hover:text-red-600 transition duration-300"
                          onClick={() => handleDelete(category._id)}
                        >
                          <FaTrashAlt size={30} />
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CategoryAccessForm;
