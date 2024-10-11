import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);

router.route("/categories").post(verifyJWT, isAdmin, createCategory); // Admins only
router.route("/categories").get(verifyJWT, getAllCategories); // Everyone
router.route("/categories/:id").get(verifyJWT, getCategoryById); // Everyone
router.route("/categories/:id").put(verifyJWT, isAdmin, updateCategory); // Admins only
router.route("/categories/:id").delete(verifyJWT, isAdmin, deleteCategory); // Admins only

export default router;
