import Post from "../models/postsModel.js";

// CREATE a new blog post
const createPost = async (request, res) => {
  try {
    const { title, author, body, excerpt } = request.body;

    // create new post
    const newPost = await Post.create({ title, author, body, excerpt });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: newPost,
      populatedPost: await newPost.populate("author"),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// // Get all blog posts
// const getPosts = async (req, res) => {
//   try {
//     const posts = await Post.find().populate("author");

//     res.status(200).json({
//       success: true,
//       count: posts.length,
//       data: posts,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// Get all blog posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(200).json({
      success: true,
      // data: posts,
      paginatedData: res.locals.paginatedResults,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single blog post by ID
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author");

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Edit a blog post
const editPost = async (req, res) => {
  try {
    const { title, author, body, excerpt } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      req.post._id,
      { title, author, body, excerpt },
      { new: true } // returns updated document
    );

    if (!updatedPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE a blog post
const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.post._id);

    if (!deletedPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
      data: deletedPost,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { createPost, getPosts, getPostById, editPost, deletePost };
