import path from 'path';
import fs from 'fs/promises';
import UserModel from '@/model/User';
import os from 'os'; // Import os for temp directory
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from '@/helpers/cloudinaryUploadFile';
import { sendEmailToAuthorForLogin } from './sendEmailToAuthorForLogin';

interface paperAuthorType {
  name:string,
  email: string;
  Country: string;
  Affiliation: string;
  WebPage: string;
  isCorrespondingAuthor: boolean;
}

export async function handleFileUpload(paperFile: File) {
  const tempDir = os.tmpdir(); // Use system temp directory
  const tempFilePath = path.join(tempDir, paperFile.name);

  const arrayBuffer = await paperFile.arrayBuffer();
  await fs.writeFile(tempFilePath, Buffer.from(arrayBuffer)); // Write to temp dir

  const uploadedFile = await uploadOnCloudinary(tempFilePath,paperFile.name);

  await fs.unlink(tempFilePath); // Clean up temp file

  if (!uploadedFile) {
    throw new Error('File is unable to upload on Cloudinary');
  }

  return uploadedFile.secure_url;
}

export async function validateAuthors(paperAuthorsArray: paperAuthorType[],paperTitle:string) {
  let Authors: any[] = [];
  let CorrespondingAuthors: any[] = [];
  // let ErrorOfNotGettingUser: { success: boolean; message: string }[] = [];

  const authorChecks = paperAuthorsArray.map(
    async (paperAuthor: paperAuthorType) => {
      try {
        const User = await UserModel.findOne({
          $and: [{ email: paperAuthor.email }, { isVerified: true }],
        });
        // if (!User) {
        //   ErrorOfNotGettingUser.push({
        //     success: false,
        //     message: `The author ${paperAuthor.FirstName} ${paperAuthor.LastName} with the email id ${paperAuthor.email} is not registered in our system. Please ensure the author creates an account on our platform before adding them as a paper author.`,
        //   });
        // }
        if (paperAuthor.isCorrespondingAuthor) {
          const AuthorObj:any={email:paperAuthor.email,name:paperAuthor.name}
          if(User?._id){
            AuthorObj["userId"]=User?._id
          }
          CorrespondingAuthors.push(AuthorObj);
        } else {
          const AuthorObj:any={email:paperAuthor.email,name:paperAuthor.name}
          if(User?._id){
            AuthorObj["userId"]=User?._id
          }
          Authors.push(AuthorObj);
        }
        
        if(!User?._id){
          sendEmailToAuthorForLogin(paperAuthor.email,paperAuthor.isCorrespondingAuthor,paperTitle)
        }
      } catch (error) {
        console.log(error)
      }
    },
  );

  await Promise.all(authorChecks);

  // if (ErrorOfNotGettingUser.length !== 0) {
  //   throw new Error(ErrorOfNotGettingUser[0].message);
  // }

  return { Authors, CorrespondingAuthors };
}
