import { parse } from "dotenv";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

// Create a new user
const createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      role,
    });

    if (newUser) {
      generateToken(res, newUser._id);
      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: newUser,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);
      res.status(200).json({ message: "User logged in" });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res, next) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

//Get all users with pagination middleware
const getUsers = async (req, res, next) => {
  try {
    res.status(200).json({
      paginatedData: res.locals.paginatedResults,
    });
  } catch (error) {
    next(error);
  }
};

// //Get all users with simple pagination
// const getUsers = async (req, res, next) => {
//   try {
//     const page = parseInt(req.params.page) || 1;
//     const limit = parseInt(req.params.limit) || 5;

//     const users = await User.find()
//       .limit(limit * 1)
//       .skip((page - 1) * limit);

//     res.status(200).json({
//       success: true,
//       count: users.length,
//       data: users,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// //Get all users with pagination metadata
// const getUsers2 = async (req, res, next) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 5;

//     // Get total count for pagination calculations
//     const totalUsers = await User.countDocuments();
//     const totalPages = Math.ceil(totalUsers / limit);

//     const users = await User.find()
//       .limit(limit * 1)
//       .skip((page - 1) * limit);

//     // Calculate pagination metadata
//     const hasNextPage = page < totalPages;
//     const hasPrevPage = page > 1;

//     res.status(200).json({
//       success: true,
//       count: users.length,
//       data: users,
//       pagination: {
//         currentPage: page,
//         totalPages: totalPages,
//         totalItems: totalUsers,
//         hasNextPage: hasNextPage,
//         hasPrevPage: hasPrevPage,
//         nextPage: hasNextPage ? page + 1 : null,
//         prevPage: hasPrevPage ? page - 1 : null,
//         limit: limit
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// Get a user by ID
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// Edit a users details
const editUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, password },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a user
const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    next(error);
  }
};

const getUserbyName = async (req, res, next) => {
  try {
    const user = await User.find({
      $or: [{ firstName: "David" }, { lastName: "Daniels" }],
    });

    if (!user) {
      res.status(404).json({
        message: "No user with the name found",
      });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Admin only - update user role
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const userId = req.params.id;

    // Prevent admin from demoting themselves
    if (userId === req.user._id.toString() && role !== "admin") {
      return res.status(400).json({
        success: false,
        message: "You cannot change your own admin role",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: `User role updated to ${role}`,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating user role",
      error: error.message,
    });
  }
};

//search for a user by name
const searchUsersByName = async (req, res, next) => {
  try {
    const name = req.query.name;

    const users = await User.find({
      $or: [
        { firstName: { $regex: name, $options: "i" } },
        { lastName: { $regex: name, $options: "i" } },
      ],
    });

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found with that name",
      });
    }

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// Search for users by name better version
const searchUsersByName2 = async (req, res) => {
  try {
    // Get the search term from query parameters
    const { name } = req.query;

    // Validate that search term is provided
    if (!name || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Search term 'name' is required",
      });
    }

    // Clean up the search term
    const searchTerm = name.trim();

    // Get optional limit parameter (default to 10 results)
    const limit = parseInt(req.query.limit) || 10;

    // Build search query using MongoDB regex
    // This searches across firstName, lastName, and username fields
    const searchQuery = {
      $or: [
        { firstName: { $regex: searchTerm, $options: "i" } },
        { lastName: { $regex: searchTerm, $options: "i" } },
      ],
    };

    // Execute the search
    const users = await User.find(searchQuery)
      .select("-password") // Exclude password field
      .limit(limit);

    // Count total matching users (for pagination info)
    const totalFound = await User.countDocuments(searchQuery);

    // Return results
    res.status(200).json({
      success: true,
      message: `Search completed for "${searchTerm}"`,
      data: {
        searchTerm: searchTerm,
        results: users,
        totalFound: totalFound,
        resultsShown: users.length,
        limitApplied: limit,
      },
    });
  } catch (error) {
    console.error("Search user error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while searching for users",
    });
  }
};

export {
  createUser,
  getUsers,
  getUserById,
  editUser,
  deleteUser,
  updateUserRole,
  searchUsersByName,
  loginUser,
  logoutUser,
};
