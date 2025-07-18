import { v2 as cloudinary } from 'cloudinary';
import { PathLike } from 'fs';
// import fs from "fs";
import fs from 'fs/promises';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
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

const uploadOnCloudinary = async (
  localFilePath: String,
  fileName:string,
  conference:string
): Promise<UploadResponse | null> => {
  try {
    if (!localFilePath) return null;
    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(
      localFilePath.toString(),
      {
        folder: `${process.env.NEXT_FOLDER}/${conference}`,
        resource_type: 'auto',
        use_filename: true,
      },
    );

    return response;
  } catch (error) {

    await fs.unlink(localFilePath as PathLike);
    console.log('File is unable to upload to Cloudinary', error);
    return null;
  }
};const deleteFromCloudinary = async (
  fileURL: string,
): Promise<{ result: string } | null> => {
  try {
    if (!fileURL) return null;

    // Extract the full public ID from the Cloudinary URL
    const url = new URL(fileURL);
    const pathname = url.pathname; // e.g. /conferencePapers/myfile.pdf

    // Remove the file extension (e.g. .pdf)
    const withoutExtension = pathname.replace(/\.[^/.]+$/, '');

    // Remove leading slash if present
    const publicId = withoutExtension.startsWith('/')
      ? withoutExtension.slice(1)
      : withoutExtension;

    console.log('Deleting file with public ID:', publicId);

    // Delete the file from Cloudinary
    const response = await cloudinary.uploader.destroy(publicId);

    console.log('Delete response:', response);

    return response;
  } catch (error) {
    console.log('File was unable to delete from Cloudinary:', error);
    return null;
  }
};


export { uploadOnCloudinary, deleteFromCloudinary };
