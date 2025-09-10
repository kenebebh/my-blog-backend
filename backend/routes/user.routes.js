import express from "express";
import { Router } from "express";
import {
  createUser,
  getUsers,
  getUserById,
  editUser,
  deleteUser,
  searchUsersByName,
  updateUserRole,
  loginUser,
  logoutUser,
} from "../controllers/user.controller.js";
import {
  protect,
  authorizeUserAccess,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router = Router();

router.post("/login", loginUser);
router.post("/", createUser);
router.post("/logout", logoutUser);
router.get("/search", searchUsersByName);
router.get("/:id", getUserById);

//all routes below this line are protected
router.use(protect);

// only logged in user or admin can access these routes
router.patch("/:id", authorizeUserAccess, editUser);
router.delete("/:id", authorizeUserAccess, deleteUser);

//Only admin can access thee routes below
router.get("/", adminOnly, getUsers);
router.patch("/:id/role", adminOnly, updateUserRole);

export default router;
