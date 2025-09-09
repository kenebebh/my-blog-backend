import express from "express";
import { Router } from "express";
import {
  createUser,
  getUsers,
  getUserById,
  editUser,
  deleteUser,
  searchUsersByName,
  getUserbyName,
  loginUser,
  logoutUser,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", getUsers);
router.post("/login", loginUser);
router.get("/name", getUserbyName);
router.post("/", createUser);
router.post("/logout", logoutUser);
router.get("/search", searchUsersByName);
router.get("/:id", getUserById);
router.patch("/:id", protect, editUser);
router.delete("/:id", protect, deleteUser);

export default router;
