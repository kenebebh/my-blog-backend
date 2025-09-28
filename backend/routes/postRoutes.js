import express from "express";
import { Router } from "express";
import {
  createPost,
  getPosts,
  getPostById,
  editPost,
  deletePost,
} from "../controllers/postsController.js";
import {
  protect,
  authorizePostAccess,
  adminOnly,
} from "../middleware/authMiddleware.js";
import paginate from "../middleware/paginate.js";
import Post from "../models/postsModel.js";
import { validateBody } from "../middleware/schemaValidation.js";
import { createPostSchema } from "../validations/postsSchema.js";

const router = Router();

router.post("/", validateBody(createPostSchema), createPost);
router.get("/:id", getPostById);
router.get(
  "/",
  paginate(Post, {
    populate: {
      path: "author",
      select: "-password",
    },
  }),
  getPosts
);

router.use(protect);
router.patch("/:id", authorizePostAccess, editPost);
router.delete("/:id", authorizePostAccess, deletePost);

export default router;
