const getCategories = async () => {
  const response = await fetch("/api/categories");
  return await response.json();
};

const createCategory = async (categoryData, accessToken) => {
  const response = await fetch("/api/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(categoryData),
  });
  return await response.json();
};

const deleteCategory = async (categoryId, accessToken) => {
  const response = await fetch(`/api/categories/${categoryId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return await response.json();
};

const updateCategory = async (categoryId, categoryData, accessToken) => {
  const response = await fetch(`/api/categories/${categoryId}`, {
    method: "PUT", // Using PUT method to update the category
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(categoryData),
  });
  return await response.json();
};

export {updateCategory,deleteCategory,createCategory,getCategories};