import { v2 as cloudinary } from "cloudinary";
import { PathLike } from "fs";
// import fs from "fs";
import fs from 'fs/promises';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string, 
  api_key: process.env.CLOUDINARY_API_KEY as string, 
  api_secret: process.env.CLOUDINARY_API_SECRET as string
});

type UploadResponse = {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  access_mode: string;
  original_filename: string;
};

const uploadOnCloudinary = async (localFilePath: String): Promise<UploadResponse | null> => {
    try {
      console.log("in the uopload on cloudinary function")
        console.log(localFilePath);
        if (!localFilePath) return null;
        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath.toString(), {
            resource_type: "auto",
            use_filename:true,
        });

        // File has been uploaded successfully
        // fs.unlinkSync(localFilePath); // Remove the locally saved temporary file
        // await fs.unlink(localFilePath as PathLike);
        return response;
    } catch (error) {
        // Remove the locally saved temporary file if the upload operation fails
        // fs.unlink(localFilePath);
        await fs.unlink(localFilePath as PathLike);
        console.log("File is unable to upload to Cloudinary", error);
        return null;
    }

};

export { uploadOnCloudinary };

