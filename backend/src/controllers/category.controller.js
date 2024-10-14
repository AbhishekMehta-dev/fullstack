import { User } from "../models/user.model.js";
import { Category } from "../models/category.model.js";

const createCategory = async (req, res) => {
  try {
    // Check if the logged-in user is an admin or agency
    const user = await User.findById(req.user._id);
    if (user.role !== "admin" && user.role !== "agency") {
      return res.status(403).json({ message: "Access denied. Admins or Agencies only." });
    }

    const { name, description } = req.body;
    const newCategory = new Category({
      name,
      description,
      createdBy: req.user._id,
    });

    await newCategory.save();
    return res.status(201).json({
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Get all categories (accessible to all users)
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({
      isActive: true,
    });
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Get single category by ID (accessible to all users)
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Update a category (admin or agency only)
const updateCategory = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== "admin" && user.role !== "agency") {
      return res.status(403).json({
        message: "Access denied. Admins or Agencies only.",
      });
    }

    const { name, description, isActive } = req.body;
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    category.name = name || category.name;
    category.description = description || category.description;
    category.isActive = isActive !== undefined ? isActive : category.isActive;
    category.updatedBy = req.user._id;

    await category.save();
    return res.status(200).json({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete a category (admin or agency only)
const deleteCategory = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== "admin" && user.role !== "agency") {
      return res.status(403).json({ message: "Access denied. Admins or Agencies only." });
    }

    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await Category.findByIdAndDelete(req.params.id); // Using findByIdAndDelete
    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
};
