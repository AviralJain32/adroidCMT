import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs"
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export const authOptions:NextAuthOptions={
    providers:[
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text"},
                password: { label: "Password", type: "password" }
              },
              async authorize(credentials:any):Promise<any>{
                await dbConnect()
                try {
                    const user=await UserModel.findOne({email:credentials.identifier})
                   
                    
                    if(!user){
                        throw new Error("No user found with this email")
                    }
                    if(!user.isVerified){
                        throw new Error("Please verify your account before login")
                    }
                    const isPasswordCorrect=await bcryptjs.compare(credentials.password,user.password)
                    if(isPasswordCorrect){
                        return user
                    }
                    else{
                        throw new Error("Incorrect Password")
                    }

                } catch (error:any) {
                    throw new Error(error.message || "Login failed");
                }
              }
        })
    ],
    callbacks:{
        async session({ session, token }) {
            if(token){
                session.user._id=token._id
                session.user.isVerified= token.isVerified
                session.user.email=token.email
                session.user.fullname=token.fullname
            }
            return session
        },
        async jwt({ token, user}) {
            if (user) {
                token._id=user._id?.toString()
                token.isVerified=user.isVerified;
                token.email=user.email
                token.fullname=user.fullname
            }
            return token
        }
    },
    //jo override krna hai use access kro
    pages:{
        signIn: '/sign-in',
    },
    session:{
        strategy:"jwt"
    },
    secret:process.env.NEXTAUTH_SECRET

}