/**
 * Cloudinary Helper for Image Uploads & Optimization
 * 
 * Supports uploading via Cloudinary Unsigned Upload Preset.
 * Fallback mode handles local data URLs if environment variables are not set.
 */

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "";
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "";

export const uploadToCloudinary = async (file: File): Promise<string> => {
  // If Cloudinary credentials are provided, perform direct upload
  if (CLOUD_NAME && UPLOAD_PRESET) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image to Cloudinary");
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.warn("Cloudinary upload failed, using local file reader fallback:", error);
    }
  }

  // Fallback: Read as Data URL (Base64) for immediate client preview
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to convert image to data URL"));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
