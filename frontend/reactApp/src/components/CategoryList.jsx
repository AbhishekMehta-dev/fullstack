import React, { useState, useEffect } from 'react';
import { getCategories } from '../api/Category.js';
import { useAuth } from '../context/AuthContext.jsx';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();  // Get the user details from the AuthContext

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);  // Set the categories data in state
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);  // Set loading to false after data is fetched
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="text-center">Loading categories...</div>;  // Show loading message while fetching data
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Category List</h2>
      {categories.length === 0 ? (
        <p className="text-center text-gray-500">No categories available.</p>  // Show message if no categories are found
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category._id} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{category.name}</h3>
              <p className="text-gray-700 mb-4">{category.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
