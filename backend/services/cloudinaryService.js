import cloudinary from "../config/cloudinaryConfig.js";
import fs from "fs";

class CloudinaryService {
  // Delete local file helper
  static deleteLocalFile(filePath) {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      console.error("Error deleting local file:", error);
    }
  }

  // Upload profile picture (simplified)
  static async uploadProfilePicture(filePath, userId) {
    try {
      const uploadResult = await cloudinary.uploader.upload(filePath, {
        folder: "profile_pictures",
        public_id: `profile_${userId}_${Date.now()}`,
        // Basic optimization - Cloudinary will handle the rest
        transformation: [
          { width: 500, height: 500, crop: "fill", gravity: "face" },
          { quality: "auto", fetch_format: "auto" },
        ],
        resource_type: "image",
      });

      // Clean up local file
      this.deleteLocalFile(filePath);

      return {
        public_id: uploadResult.public_id,
        secure_url: uploadResult.secure_url,
      };
    } catch (error) {
      // Clean up local file on error
      this.deleteLocalFile(filePath);
      throw error;
    }
  }

  // Delete image from cloudinary
  static async deleteImage(publicId) {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result.result === "ok";
    } catch (error) {
      console.error("Error deleting image from cloudinary:", error);
      return false;
    }
  }

  // Generate URL with specific size (when needed)
  static getResizedUrl(publicId, width = 400, height = 400) {
    return cloudinary.url(publicId, {
      width,
      height,
      crop: "fill",
      gravity: "face",
      quality: "auto",
      fetch_format: "auto",
    });
  }
}

export default CloudinaryService;
