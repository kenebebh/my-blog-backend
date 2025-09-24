import { Schema, SchemaTypes, model } from "mongoose";

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "A post title is required"],
      trim: true,
      minlength: [5, "Title must be at least 5 characters"],
      maxlength: [150, "Title cannot exceed 150 characters"],
    },
    excerpt: {
      type: String,
      required: [true, "A short excerpt is required"],
      trim: true,
      maxlength: [300, "Excerpt cannot exceed 300 characters"],
    },
    body: {
      type: String,
      required: [true, "Post content (body) is required"],
    },
    author: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    readTime: {
      type: String,
      // required: [true, "Estimated read time is required"],
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: function (arr) {
          return arr.length <= 10;
        },
        message: "You can specify a maximum of 10 tags",
      },
    },
    likes: {
      type: Number,
      default: 0,
      min: [0, "Likes cannot be negative"],
    },
    comments: {
      type: Number,
      default: 0,
      min: [0, "Comments count cannot be negative"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

const Post = model("Post", PostSchema);

export default Post;
