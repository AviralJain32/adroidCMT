// import { NextRequest, NextResponse } from 'next/server';
// import mongoose from 'mongoose';
// import path from 'path';
// import fs from 'fs/promises';
// import dbConnect from '@/lib/dbConnect';
// import PaperModel from '@/model/PaperSchema';
// import UserModel from '@/model/User';
// import { getServerSession, User } from 'next-auth';
// import { authOptions } from '../auth/[...nextauth]/options';
// import { uploadOnCloudinary } from '@/helpers/cloudinaryUploadFile';
// import ConferenceModel from '@/model/Conference';
// import { generatePaperID } from '@/lib/PaperId';

// export const config = {
//   api: {
//     bodyParser: false, // Disallow body parsing, as we'll handle it manually
//   },
// };

// interface paperAuthorType{
//   FirstName: string,
//     LastName: string,
//     email: string,
//     Country: string,
//     Affiliation: string,
//     WebPage: string,
//     isCorrespondingAuthor: boolean
// }

// export async function POST(request: NextRequest) {
//   await dbConnect();
//   const session = await getServerSession(authOptions);
//   const user: User = session?.user as User;

//   if (!session || !session.user) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Not Authenticated',
//       },
//       { status: 401 }
//     );
//   }

//   const formData = await request.formData();
//   const paperTitle = formData.get('paperTitle') as string;
//   const paperKeywords = formData.get('paperKeywords')?.toString().split(',') || [];
//   const paperAbstract = formData.get('paperAbstract') as string;
//   const conference = formData.get('conference') as string;
//   const paperFile = formData.get('paperFile') as File;
//   const paperAuthors=formData.get('paperAuthors') as string;
//   const paperAuthorsArray=JSON.parse(paperAuthors) // some unnecessary data is also there

//   if (!paperFile) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'File is required',
//       },
//       { status: 400 }
//     );
//   }

//   if(paperAuthorsArray.length===0){
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Please add atleast one author',
//       },
//       { status: 400 }
//     );
//   }

//   let Authors:any=[];
//   let CorrespondingAuthors:any=[];
//   let ErrorOfNotGettingUser:{success:boolean,message:string}[]=[];

//   const authorChecks =paperAuthorsArray.map(async(paperAuthor:paperAuthorType)=>{
//     const User=await UserModel.findOne({$and:[{"email":paperAuthor.email},{"isVerified":true}]})
//     if(!User){
//         ErrorOfNotGettingUser.push({
//           success: false,
//           message: `The author ${paperAuthor.FirstName} ${paperAuthor.LastName} with the email id ${paperAuthor.email} is not registered in our system. Please ensure the author creates an account on our platform before adding them as a paper author.`,
//         })
//     }
//     if(paperAuthor.isCorrespondingAuthor){
//       CorrespondingAuthors.push(User?._id)
//     }
//     else{
//       Authors.push(User?._id)
//     }
//   })
//   await Promise.all(authorChecks);

//   if(ErrorOfNotGettingUser.length!=0){
//     return NextResponse.json(
//       {
//         success: false,
//         message: ErrorOfNotGettingUser[0].message,
//       },
//       { status: 400 }
//     );
//   }
//   // Save the file locally
//   const tempDir = path.join(process.cwd(), 'public', 'temp');
//   await fs.mkdir(tempDir, { recursive: true });

//   const tempFilePath = path.join(tempDir, `${paperFile.name}`);//${Date.now()}
//   const arrayBuffer = await paperFile.arrayBuffer();
//   await fs.writeFile(tempFilePath, Buffer.from(arrayBuffer));

//   try {
//     // Upload the file to Cloudinary
//     const uploadedFile =  await uploadOnCloudinary(tempFilePath);

//     if (!uploadedFile) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'File is unable to upload on Cloudinary',
//         },
//         { status: 400 }
//       );
//     }

//     const conferenceDocument = await ConferenceModel.findOne({
//       "conferenceAcronym": conference
//     });

//     if(!conferenceDocument){
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'The conference is not available in the database. please check the url again',
//         },
//         { status: 404 }
//       );
//     }

//     const paperID=await generatePaperID(conference)

//     // Create a new paper document
//     const newPaper = await PaperModel.create({
//       paperAuthor: Authors,
//       correspondingAuthor:CorrespondingAuthors,
//       paperTitle,
//       paperFile: uploadedFile.secure_url,
//       paperKeywords,
//       paperAbstract,
//       paperSubmissionDate: new Date(),
//       conference:conferenceDocument._id,
//       paperStatus: 'submitted',
//       paperID:paperID
//     });

//     newPaper.save()

//     // Remove the local temp file
//     await fs.unlink(tempFilePath);

//     return NextResponse.json({
//       success: true,
//       message: 'Paper submitted successfully',
//       paper: newPaper,
//     });
//   } catch (error: any) {
//     // Remove the local temp file in case of error
//     await fs.unlink(tempFilePath);
//     return NextResponse.json(
//       {
//         success: false,
//         message: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }


import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import PaperModel from '@/model/PaperSchema';
import { getServerSession, User } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import ConferenceModel from '@/model/Conference';
import { generatePaperID } from '@/helpers/PaperId';
import { handleFileUpload, validateAuthors } from '@/helpers/VerficationAuthorsAndCloudinaryCommonFunctions';

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, as we'll handle it manually
  },
};


export async function POST(request: NextRequest) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return NextResponse.json(
      {
        success: false,
        message: 'Not Authenticated',
      },
      { status: 401 }
    );
  }

  const formData = await request.formData();
  const paperTitle = formData.get('paperTitle') as string;
  const paperKeywords = formData.get('paperKeywords')?.toString().split(',') || [];
  const paperAbstract = formData.get('paperAbstract') as string;
  const conference = formData.get('conference') as string;
  const paperFile = formData.get('paperFile') as File;
  const paperAuthors = formData.get('paperAuthors') as string;
  const paperAuthorsArray = JSON.parse(paperAuthors);

  if (!paperFile) {
    return NextResponse.json(
      {
        success: false,
        message: 'File is required',
      },
      { status: 400 }
    );
  }

  if (paperAuthorsArray.length === 0) {
    return NextResponse.json(
      {
        success: false,
        message: 'Please add at least yourself as Author',
      },
      { status: 400 }
    );
  }

  try {
    const { Authors, CorrespondingAuthors } = await validateAuthors(paperAuthorsArray);
    const uploadedFileUrl = await handleFileUpload(paperFile);

    const conferenceDocument = await ConferenceModel.findOne({ conferenceAcronym: conference });

    if (!conferenceDocument) {
      return NextResponse.json(
        {
          success: false,
          message: 'The conference is not available in the database. Please check the URL again.',
        },
        { status: 404 }
      );
    }

    const paperID = await generatePaperID (conference);

    const newPaper = await PaperModel.create({
      paperAuthor: Authors,
      correspondingAuthor: CorrespondingAuthors,
      paperTitle,
      paperFile: uploadedFileUrl,
      paperKeywords,
      paperAbstract,
      paperSubmissionDate: new Date(),
      conference: conferenceDocument._id,
      paperStatus: 'submitted',
      paperID: paperID,
    });

    newPaper.save();

    return NextResponse.json({
      success: true,
      message: 'Paper submitted successfully',
      paper: newPaper,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
