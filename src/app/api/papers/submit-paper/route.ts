import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import PaperModel from '@/model/PaperSchema';
import { getServerSession, User } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/options';
import ConferenceModel from '@/model/Conference';
import { generatePaperID } from '@/helpers/PaperId';
import {
  handleFileUpload
} from '@/helpers/FileUpload';
import UserModel from '@/model/User';
import { sendEmailToAuthorForLogin } from '@/helpers/sendEmailToAuthorForLogin';


interface paperAuthorType {
  name:string,
  email: string;
  Country: string;
  Affiliation: string;
  WebPage: string;
  isCorrespondingAuthor: boolean;
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


export async function POST(request: NextRequest) {
  await dbConnect();

  const formData = await request.formData();
  const paperTitle = formData.get('paperTitle') as string;
  const paperKeywords =
    formData.get('paperKeywords')?.toString().split(',') || [];
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
      { status: 400 },
    );
  }

  if (paperAuthorsArray.length === 0) {
    return NextResponse.json(
      {
        success: false,
        message: 'Please add at least yourself as Author',
      },
      { status: 400 },
    );
  }

  try {
    const { Authors, CorrespondingAuthors } =
      await validateAuthors(paperAuthorsArray,paperTitle);



    const conferenceExists = await ConferenceModel.exists({
      conferenceAcronym: conference,
    });
    
    if (!conferenceExists) {
      return NextResponse.json(
        {
          success: false,
          message:
            'The conference is not available in the database. Please check the URL again.',
        },
        { status: 404 },
      );
    }

    const paperID = await generatePaperID(conference);
    const uploadedFileUrl = await handleFileUpload(paperFile,paperID,conference);

    const newPaper = await PaperModel.create({
      paperAuthor: Authors,
      correspondingAuthor: CorrespondingAuthors,
      paperTitle,
      paperFile: uploadedFileUrl,
      paperKeywords,
      paperAbstract,
      paperSubmissionDate: new Date(),
      conference: conferenceExists._id,
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
    console.log(error)
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
