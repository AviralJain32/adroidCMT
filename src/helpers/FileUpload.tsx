import path from 'path';
import fs from 'fs/promises';
import UserModel from '@/model/User';
import os from 'os'; // Import os for temp directory
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from '@/helpers/cloudinaryUploadFile';

export async function handleFileUpload(paperFile: File,paperID:string,conference:string) {
  const tempDir = os.tmpdir(); // Use system temp directory
  const parts = paperID.split("-");
  const paperNumber = parts[parts.length - 1];
  const originalName = paperFile.name;
  const renamedFile = `_${paperNumber}_${originalName}`;
  
  const tempFilePath = path.join(tempDir,renamedFile);

  const arrayBuffer = await paperFile.arrayBuffer();
  await fs.writeFile(tempFilePath, Buffer.from(arrayBuffer)); // Write to temp dir

  const uploadedFile = await uploadOnCloudinary(tempFilePath,renamedFile,conference);

  await fs.unlink(tempFilePath); // Clean up temp file

  if (!uploadedFile) {
    throw new Error('File is unable to upload on Cloudinary');
  }

  return uploadedFile.secure_url;
}

