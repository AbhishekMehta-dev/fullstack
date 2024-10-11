import React, { useState, useEffect } from 'react';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../api/Category';
import { useAuth } from '../context/AuthContext';

const CategoryForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null); // For editing
  const { user } = useAuth();

  // Fetch categories when the component loads
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();  // Ensure this function is correct
        console.log('Categories fetched:', data);  // Debugging line to inspect data
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description) {
      setError('Please provide both a category name and description.');
      return;
    }

    try {
      const accessToken = localStorage.getItem('accessToken');

      if (editingCategory) {
        // Update the category
        await updateCategory(editingCategory._id, { name, description }, accessToken);
        setSuccess('Category updated successfully!');

        // Update the categories list in the state to reflect the changes
        setCategories(
          categories.map((cat) =>
            cat._id === editingCategory._id ? { ...cat, name, description } : cat
          )
        );

        setEditingCategory(null);  // Reset form
      } else {
        // Create a new category
        await createCategory({ name, description }, accessToken);
        setSuccess('Category created successfully!');

        // Re-fetch the categories after creating the new one
        const updatedCategories = await getCategories();
        setCategories(updatedCategories); // Re-fetch the updated categories list
      }

      // Clear form fields and reset success/error messages
      setName('');
      setDescription('');
      setError(null);
    } catch (err) {
      console.error('Failed to create or update category:', err);
      setError('Failed to process category. Please try again.');
      setSuccess(null);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      await deleteCategory(categoryId, accessToken);
      setCategories(categories.filter(cat => cat._id !== categoryId));
      setSuccess('Category deleted successfully!');
    } catch (err) {
      console.error('Failed to delete category:', err);
      setError('Failed to delete category. Please try again.');
      setSuccess(null);
    }
  };

  const startEditing = (category) => {
    setName(category.name);
    setDescription(category.description);
    setEditingCategory(category);  // Set category for editing
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          {editingCategory ? 'Update Category' : 'Add New Category'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">Category Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              placeholder="Enter category name"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-2">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              placeholder="Enter category description"
            />
          </div>

          {error && <p className="text-red-500 text-sm italic mb-4">{error}</p>}
          {success && <p className="text-green-500 text-sm italic mb-4">{success}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none transition duration-300"
          >
            {editingCategory ? 'Update Category' : 'Add Category'}
          </button>
        </form>
      </div>

      {/* Category List with Edit/Delete Options */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Existing Categories</h2>
      {categories.length === 0 ? (
        <p className="text-center text-gray-500">No categories available.</p>
      ) : (
        <ul>
          {categories.map((category) => (
            <li key={category._id} className="flex justify-between items-center mb-4 bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-300">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
              <div className="flex space-x-3">
                <button 
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
                  onClick={() => startEditing(category)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                  onClick={() => handleDelete(category._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryForm;
