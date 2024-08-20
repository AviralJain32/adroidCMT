import path from 'path';
import fs from 'fs/promises';
import UserModel from '@/model/User';
import { uploadOnCloudinary, deleteFromCloudinary } from '@/helpers/cloudinaryUploadFile';

interface paperAuthorType {
    FirstName: string;
    LastName: string;
    email: string;
    Country: string;
    Affiliation: string;
    WebPage: string;
    isCorrespondingAuthor: boolean;
}

export async function handleFileUpload(paperFile: File) {
    const tempDir = path.join(process.cwd(), 'public', 'temp');
    await fs.mkdir(tempDir, { recursive: true });
  
    const tempFilePath = path.join(tempDir, `${paperFile.name}`);
    const arrayBuffer = await paperFile.arrayBuffer();
    await fs.writeFile(tempFilePath, Buffer.from(arrayBuffer));
  
    const uploadedFile = await uploadOnCloudinary(tempFilePath);
  
    await fs.unlink(tempFilePath);
  
    if (!uploadedFile) {
      throw new Error('File is unable to upload on Cloudinary');
    }
  
    return uploadedFile.secure_url;
  }
  
  export async function validateAuthors(paperAuthorsArray: paperAuthorType[]) {
    let Authors: any[] = [];
    let CorrespondingAuthors: any[] = [];
    let ErrorOfNotGettingUser: { success: boolean; message: string }[] = [];
  
    const authorChecks = paperAuthorsArray.map(async (paperAuthor: paperAuthorType) => {
      const User = await UserModel.findOne({ $and: [{ email: paperAuthor.email }, { isVerified: true }] });
      if (!User) {
        ErrorOfNotGettingUser.push({
          success: false,
          message: `The author ${paperAuthor.FirstName} ${paperAuthor.LastName} with the email id ${paperAuthor.email} is not registered in our system. Please ensure the author creates an account on our platform before adding them as a paper author.`,
        });
      }
      if (paperAuthor.isCorrespondingAuthor) {
        CorrespondingAuthors.push(User?._id);
      } else {
        Authors.push(User?._id);
      }
    });
  
    await Promise.all(authorChecks);
  
    if (ErrorOfNotGettingUser.length !== 0) {
      throw new Error(ErrorOfNotGettingUser[0].message);
    }
  
    return { Authors, CorrespondingAuthors };
  }