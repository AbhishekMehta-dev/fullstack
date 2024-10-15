import React, { useState, useEffect } from "react";
import { getCategories, createCategory, updateCategory } from "../api/Category";
import { useAuth } from "../context/AuthContext";
import { useCategory } from "../context/CategoryContext"; // Import the context
import { useNavigate } from "react-router-dom"; // Import useNavigate

const CategoryForm = () => {
  const { categoryData, updateCategoryData } = useCategory(); // Use the context
  const [name, setName] = useState(categoryData?.name || '');
  const [description, setDescription] = useState(categoryData?.description || '');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (categoryData) {
      setName(categoryData.name);
      setDescription(categoryData.description);
    }
  }, [categoryData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description) {
      setError("Please provide both a category name and description.");
      return;
    }

    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found. Please log in again.");
      }

      if (categoryData) {
        await updateCategory(categoryData._id, { name, description }, accessToken);
        setSuccess("Category updated successfully!");
      } else {
        await createCategory({ name, description }, accessToken);
        setSuccess("Category created successfully!");
      }

      // Clear form fields and context
      setName('');
      setDescription('');
      updateCategoryData(null); // Clear the context
      setError(null); // Clear any previous errors

      // Redirect after successful creation or update
      navigate("/access-category"); // Redirect here after success
    } catch (err) {
      console.error("Failed to create or update category:", err);
      setError("Failed to process category. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {categoryData ? 'Update Category' : 'Add New Category'}
        </h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryName">
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryDescription">
              Description
            </label>
            <input
              type="text"
              id="categoryDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter category description"
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            type="submit" 
            className="bg-blue-500 text-white p-2 rounded-lg w-full hover:bg-blue-600 transition duration-300"
          >
            {categoryData ? 'Update Category' : 'Add Category'}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-500 mt-2">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
