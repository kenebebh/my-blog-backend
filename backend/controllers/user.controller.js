import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

// Create a new user
const createUser = async (req, res) => {
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

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({ message: "User logged in" });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
};

//Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Edit a users details
const editUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, password, role },
      { new: true }
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
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
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
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserbyName = async (req, res) => {
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
  } catch (error) {}
};

//search for a user by name
const searchUsersByName = async (req, res) => {
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
    res.status(500).json({ success: false, message: error.message });
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
  getUserbyName,
  searchUsersByName,
  loginUser,
};
