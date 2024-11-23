"use server"

import UserModel from "@/model/User";
import bcryptjs from "bcryptjs"

export const resetPasswordAction=async(token:string, newPassword:string)=>{
    try {

        // Log the incoming token
        console.log("Reset Token:", token);
    
        // Find the user with the provided reset token and ensure the token hasn't expired
        const user = await UserModel.findOne({
          forgotPasswordToken: token,
          forgotPasswordTokenExpiry: { $gt: Date.now() },
        });
    
        if (!user) {
          return {success:false, message: "Invalid or expired reset token." , status: 400 }
        }
    
        console.log("User Found:", user);
    
        // Hash the new password
        const hashedPassword = await bcryptjs.hash(newPassword, 10);
    
        // Update the user's password and clear the reset token fields
        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
    
        await user.save();
    
        return {
          message: "Password reset successfully. You can now log in.",
          success: true,
          status:200
        };
      } catch (error: any) {
        console.error("Error resetting password:", error.message);
        return { message: "Error resetting password",status: 500 };
      }
}