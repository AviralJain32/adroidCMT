import { sendVerificationEmail } from '@/helpers/sendVerificationEmail';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import bcryptjs from 'bcryptjs';
import PaperModel from '@/model/PaperSchema';
import mongoose from 'mongoose';

const linkUserToPapers = async (email: string, userId: mongoose.Types.ObjectId) => {
  try {
    // 1. Update paperAuthor userId wherever email matches and userId is not set
    await PaperModel.updateMany(
      {
        paperAuthor: {
          $elemMatch: { email: email, userId: { $exists: false } },
        },
      },
      {
        $set: { 'paperAuthor.$[elem].userId': userId },
      },
      {
        arrayFilters: [{ 'elem.email': email, 'elem.userId': { $exists: false } }],
      }
    );

    // 2. Update correspondingAuthor userId wherever email matches and userId is not set
    await PaperModel.updateMany(
      {
        correspondingAuthor: {
          $elemMatch: { email: email, userId: { $exists: false } },
        },
      },
      {
        $set: { 'correspondingAuthor.$[elem].userId': userId },
      },
      {
        arrayFilters: [{ 'elem.email': email, 'elem.userId': { $exists: false } }],
      }
    );

    console.log('User linked to related papers successfully');
  } catch (err) {
    console.error('Error linking user to papers:', err);
  }
};


export async function POST(request: Request) {
  await dbConnect();
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      country,
      affilation,
      contactNumber,
      retypePassword,
    } = await request.json();
    const fullname = firstname + ' ' + lastname;

    const existingUerByEmail = await UserModel.findOne({ email });

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUerByEmail) {
      if (existingUerByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: 'User already exist with this email, Please sign-in',
          },
          {
            status: 400,
          },
        );
      } else {
        const hashedPassword = await bcryptjs.hash(password, 10);
        existingUerByEmail.password = hashedPassword;
        existingUerByEmail.verifyCode = verifyCode;
        existingUerByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);

        await existingUerByEmail.save();
      }
    } else {
      const hashedPassword = await bcryptjs.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        fullname: fullname,
        email,
        contactNumber,
        password: hashedPassword,
        country,
        affilation,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
      });
      await newUser.save();

      await linkUserToPapers(email, newUser._id as mongoose.Types.ObjectId);

    }
    //send verification email
    const emailResponse = await sendVerificationEmail(
      email,
      fullname,
      verifyCode,
    );
    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        {
          status: 500,
        },
      );
    }

  

    return Response.json(
      {
        success: true,
        message: 'User Registered Successfully. Please verify your email',
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error registering user', error);
    return Response.json(
      {
        success: false,
        message: 'Error registering user',
      },
      {
        status: 500,
      },
    );
  }
}
