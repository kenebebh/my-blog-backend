// import { Router } from "express";
// import cloudinary from "../config/cloudinaryConfig.js";
// import upload from "../middleware/multer.js";

// const router = Router();

// router.post("/", upload.single("image"), async (req, res) => {
//   try {
//     // Upload an image
//     const uploadResult = await cloudinary.uploader
//       .upload(req.file.path, {
//         public_id: "profilePictures",
//       })
//       .catch((error) => {
//         console.log(error);
//         return res.status(500).json({
//           success: false,
//           message: "An Error has occured",
//         });
//       });

//     console.log(uploadResult);
//   } catch (error) {
//     console.log(error);
//     res.json({
//       success: false,
//       message: "Could not upload your image",
//     });
//     next(error);
//   }
// });

// export default router;

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
        //create a user first, so we can get the user id
        const tempUser = new User(userData);
        const savedUser = await tempUser.save();

        //upload profile picture to cloudinary
        const uploadResult = await CloudinaryService.uploadProfilePicture(
          req.file.path,
          savedUser._id
        );

        console.log(uploadResult);

        //update user with profile picture data (just public_id and secure_url)
        savedUser.profilePicture = {
          public_id: uploadResult.public_id,
          secure_url: uploadResult.secure_url,
        };

        await savedUser.save();

        //generate JWT token
        generateToken(res, savedUser._id);

        res.status(201).json({
          success: true,
          message: "User created successfully with profile picture",
          data: savedUser,
        });
      } catch (error) {}
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
