"use server";

import { sendPasswordResetLinkEmail } from "@/helpers/sendPasswordResetLinkEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcryptjs from "bcryptjs";

export const resetPassword = async (email: string) => {
  // Ensure the email is provided
  if (!email) {
    return {
      success: false,
      message: "Email is required.",
      status: 400,
    };
  }

  // Connect to the database
  await dbConnect();

  try {
    // Check if the user exists
    const existingUserByEmail = await UserModel.findOne({ email });

    if (!existingUserByEmail) {
      return {
        success: false,
        message: "User with this Email ID does not exist. Please create a new account.",
        status: 400,
      };
    }

    // Generate a secure reset token
    const resetToken = await bcryptjs.hash(`${email}-${Date.now()}`, 10);

    // Save the reset token and its expiry to the database
    await UserModel.findByIdAndUpdate(existingUserByEmail._id, {
      $set: {
        forgotPasswordToken: resetToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000, // Token expires in 1 hour
      },
    });

    // Send the password reset email
    const emailResponse = await sendPasswordResetLinkEmail(resetToken, email);

    if (!emailResponse.success) {
      return {
        success: false,
        message: emailResponse.message,
        status: 500,
      };
    }

    return {
      success: true,
      message: "Password reset link sent to your email successfully.",
      status: 200,
    };
  } catch (error) {
    console.error("Error during password reset process:", error);
    return {
      success: false,
      message: "An error occurred while processing the password reset request.",
      status: 500,
    };
  }
};
