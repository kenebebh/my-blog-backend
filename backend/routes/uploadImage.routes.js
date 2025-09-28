import { Router } from "express";
import cloudinary from "../config/cloudinaryConfig.js";
import upload from "../middleware/multer.js";

const router = Router();

router.post("/", upload.single("image"), async (req, res) => {
  // cloudinary.uploader.upload(req.file.path,  function (err, result) {
  //   if (err) {
  //     console.log(err);
  //     return res.status(500).json({
  //       success: false,
  //       message: "An Error has occured",
  //     });
  //   }

  //   res.status(200).json({
  //     succes: true,
  //     message: "Image Successfully Uploaded",
  //     data: result,
  //   });
  // });

  try {
    // Upload an image
    const uploadResult = await cloudinary.uploader
      .upload(req.file.path, {
        public_id: "profilePictures",
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "An Error has occured",
        });
      });

    console.log(uploadResult);
  } catch (error) {
    next(error);
  }
});

export default router;
