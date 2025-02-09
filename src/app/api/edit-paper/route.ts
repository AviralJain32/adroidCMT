import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import PaperModel from '@/model/PaperSchema';
import { getServerSession, User } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import { deleteFromCloudinary } from '@/helpers/cloudinaryUploadFile';
import {
  handleFileUpload,
  validateAuthors,
} from '@/helpers/VerficationAuthorsAndCloudinaryCommonFunctions';

export async function PUT(request: NextRequest) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return NextResponse.json(
      {
        success: false,
        message: 'Not Authenticated',
      },
      { status: 401 },
    );
  }

  const formData = await request.formData();
  // const paperId = formData.get('paperId') as string;
  const paperTitle = formData.get('paperTitle') as string;
  const paperKeywords =
    formData.get('paperKeywords')?.toString().split(',') || [];
  const paperAbstract = formData.get('paperAbstract') as string;
  // const conference = formData.get('conference') as string;
  const paperFile = formData.get('paperFile') as File;
  const paperAuthors = formData.get('paperAuthors') as string;
  const paperAuthorsArray = JSON.parse(paperAuthors);

  if (paperAuthorsArray.length === 0) {
    return NextResponse.json(
      {
        success: false,
        message: 'Please add at least one author',
      },
      { status: 400 },
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const paperID = searchParams.get('paperID');

    const paperDocument = await PaperModel.findOne({ paperID: paperID });
    console.log(paperDocument);
    if (!paperDocument) {
      return NextResponse.json(
        {
          success: false,
          message: 'Paper not found',
        },
        { status: 404 },
      );
    }

    const { Authors, CorrespondingAuthors } =
      await validateAuthors(paperAuthorsArray);

    let updatedPaper: any = {
      paperTitle,
      paperKeywords,
      paperAbstract,
      paperAuthor: Authors,
      correspondingAuthor: CorrespondingAuthors,
    };

    if (paperFile) {
      // Delete the old file from Cloudinary
      const oldFileUrl = paperDocument.paperFile;
      await deleteFromCloudinary(oldFileUrl);

      // Upload the new file
      const uploadedFileUrl = await handleFileUpload(paperFile);
      updatedPaper.paperFile = uploadedFileUrl;
    }

    const updatedPaperDocument = await PaperModel.findByIdAndUpdate(
      paperDocument._id,
      updatedPaper,
      { new: true },
    );

    return NextResponse.json({
      success: true,
      message: 'Paper updated successfully',
      paper: updatedPaperDocument,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
