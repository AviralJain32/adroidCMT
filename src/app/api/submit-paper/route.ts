import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs/promises';
import dbConnect from '@/lib/dbConnect';
import PaperModel from '@/model/PaperSchema';
import UserModel from '@/model/User';
import { getServerSession, User } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import { uploadOnCloudinary } from '@/helpers/cloudinaryUploadFile';
import ConferenceModel from '@/model/Conference';
import { generatePaperID } from '@/lib/PaperId';

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
  const paperKeyphrases = formData.get('paperKeyphrases')?.toString().split(',') || [];
  const paperAbstract = formData.get('paperAbstract') as string;
  const conference = formData.get('conference') as string;
  const paperFile = formData.get('paperFile') as File;

  if (!paperFile) {
    return NextResponse.json(
      {
        success: false,
        message: 'File is required',
      },
      { status: 400 }
    );
  }

  // Save the file locally
  const tempDir = path.join(process.cwd(), 'public', 'temp');
  await fs.mkdir(tempDir, { recursive: true });

  const tempFilePath = path.join(tempDir, `${paperFile.name}`);//${Date.now()}
  const arrayBuffer = await paperFile.arrayBuffer();
  await fs.writeFile(tempFilePath, Buffer.from(arrayBuffer));

  try {
    // Upload the file to Cloudinary
    const uploadedFile = await uploadOnCloudinary(tempFilePath);

    if (!uploadedFile) {
      return NextResponse.json(
        {
          success: false,
          message: 'File is unable to upload on Cloudinary',
        },
        { status: 400 }
      );
    }

    const conferenceDocument = await ConferenceModel.findOne({
      "conferenceAcronym": conference
    });

    if(!conferenceDocument){
      return NextResponse.json(
        {
          success: false,
          message: 'The conference is not available in the database. please check the url again',
        },
        { status: 404 }
      );
    }

    const paperID=await generatePaperID(conference)
    console.log(paperID)
    // Create a new paper document
    const newPaper = await PaperModel.create({
      paperAuthor: user._id,
      paperTitle,
      paperFile: uploadedFile.secure_url,
      paperKeywords,
      paperKeyphrases,
      paperAbstract,
      paperSubmissionDate: new Date(),
      conference:conferenceDocument._id,
      paperStatus: 'submitted',
      paperID:paperID
    });

    newPaper.save()

    // Update the user's submitted papers
    // const model=await UserModel.findByIdAndUpdate(user._id, {
    //   $push: { submittedPapers: newPaper._id },
    // });
    // console.log(model)

    // Update the user's submitted papers
    // const model2= await ConferenceModel.findByIdAndUpdate(conferenceDocument._id, {
    //   $push: { submittedPapers: newPaper._id },
    // });
    // console.log(model2)

    // Remove the local temp file
    await fs.unlink(tempFilePath);

    return NextResponse.json({
      success: true,
      message: 'Paper submitted successfully',
      paper: newPaper,
    });
  } catch (error: any) {
    // Remove the local temp file in case of error
    await fs.unlink(tempFilePath);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
