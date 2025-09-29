import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import CloudinaryService from "../services/cloudinaryService.js";

// Create a new user
const createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      // Clean up uploaded file if user exists
      if (req.file) {
        CloudinaryService.deleteLocalFile(req.file.path);
      }
      res.status(400);
      throw new Error("User already exists");
    }

    //prepare user data
    const userData = {
      firstName,
      lastName,
      email,
      password,
      role: role || "reader",
    };

    //Handle profile picture upload if file is provided
    if (req.file) {
      try {
        // Create user first to get the ID
        const tempUser = new User(userData);
        const savedUser = await tempUser.save();

        // Upload profile picture to cloudinary
        const uploadResult = await CloudinaryService.uploadProfilePicture(
          req.file.path,
          savedUser._id
        );

        console.log(uploadResult);

        // Update user with profile picture data (just public_id and secure_url)
        savedUser.profilePicture = {
          public_id: uploadResult.public_id,
          secure_url: uploadResult.secure_url,
        };

        await savedUser.save();

        // Generate JWT token
        generateToken(res, savedUser._id);

        res.status(201).json({
          success: true,
          message: "User created successfully with profile picture",
          data: savedUser,
        });
      } catch (uploadError) {
        console.error("Profile picture upload failed:", uploadError);

        // Still create user without profile picture
        const newUser = await User.create(userData);
        generateToken(res, newUser._id);

        res.status(201).json({
          success: true,
          message: "User created successfully (profile picture upload failed)",
          data: newUser,
          warning: "Profile picture could not be uploaded",
        });
      }
    } else {
      //create user without profile image
      const newUser = await User.create(userData);

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
    }
  } catch (error) {
    // Clean up uploaded file on any error
    if (req.file) {
      CloudinaryService.deleteLocalFile(req.file.path);
    }
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

// Update user profile picture
const updateProfilePicture = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.params.id;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file provided",
      });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      CloudinaryService.deleteLocalFile(req.file.path);
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete old profile picture from cloudinary if exists
    if (user.profilePicture?.public_id) {
      await CloudinaryService.deleteImage(user.profilePicture.public_id);
    }

    // Upload new profile picture
    const uploadResult = await CloudinaryService.uploadProfilePicture(
      req.file.path,
      userId
    );

    // Update user profile picture (simplified)
    user.profilePicture = {
      public_id: uploadResult.public_id,
      secure_url: uploadResult.secure_url,
    };

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
      data: {
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    // Clean up uploaded file on error
    if (req.file) {
      CloudinaryService.deleteLocalFile(req.file.path);
    }
    next(error);
  }
};

// Remove user profile picture
const removeProfilePicture = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.params.id;

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if user has a profile picture
    if (!user.profilePicture?.public_id) {
      return res.status(400).json({
        success: false,
        message: "User has no profile picture to remove",
      });
    }

    // Delete from cloudinary
    const deleted = await CloudinaryService.deleteImage(
      user.profilePicture.public_id
    );

    if (deleted) {
      // Remove profile picture from user document
      user.profilePicture = {
        public_id: null,
        secure_url: null,
      };
      await user.save();

      res.status(200).json({
        success: true,
        message: "Profile picture removed successfully",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to remove profile picture from cloud storage",
      });
    }
  } catch (error) {
    next(error);
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
  updateProfilePicture,
  removeProfilePicture,
};
