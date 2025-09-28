import Joi from "joi";

export const createPostSchema = Joi.object({
  title: Joi.string().min(5).max(150).required().messages({
    "string.min": "The title should have at least 5 characters",
    "string.max": "The title should not be more than 150 characters",
    "any.required": "Title is required",
  }),
  excerpt: Joi.string().min(5).max(300).required().messages({
    "string.min": "The excerpt should have at least 5 characters",
    "string.max": "The excerpt should not be more than 150 characters",
    "any.required": "Excerpt is required",
  }),
  body: Joi.string().min(100).required().messages({
    "string.min": "Post content should have at least 100 characters",
    "any.required": "Title is required",
  }),
  author: Joi.string().required(),
  publishedAt: Joi.date(),
  readTime: Joi.string(),
  tags: Joi.array().items(Joi.string()),
});
