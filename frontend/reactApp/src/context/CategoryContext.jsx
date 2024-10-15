import React, { createContext, useState, useContext } from 'react';

// Create the Category Context
const CategoryContext = createContext();

// Create a provider component
export const CategoryProvider = ({ children }) => {
  const [categoryData, setCategoryData] = useState(null);

  const updateCategoryData = (category) => {
    setCategoryData(category);
  };

  return (
    <CategoryContext.Provider value={{ categoryData, updateCategoryData }}>
      {children}
    </CategoryContext.Provider>
  );
};

// Create a custom hook to use the Category Context
export const useCategory = () => {
  return useContext(CategoryContext);
};
