import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs"
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import Google from "next-auth/providers/google"

interface NewUser extends User{
    email_verified:string
}
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
        }),
        Google({
            clientId: process.env.AUTH_GOOGLE_ID || "",
            clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
            async profile(profile) {
                console.log("i am in profile section of google provider");
                console.log(profile)
                await dbConnect();
                const dbUser = await UserModel.findOne({ email: profile.email });
                const userid:any=dbUser?._id  
                const userStringID=userid.toString()
                return { ...profile,id:userStringID }
              },
        }),
        // {
        //     id: "my-provider", // signIn("my-provider") and will be part of the callback URL
        //     name: "My Provider", // optional, used on the default login page as the button text.
        //     type: "oauth", // or "oauth" for OAuth 2 providers
        //     issuer: "https://my.oidc-provider.com", // to infer the .well-known/openid-configuration URL
        //     clientId: process.env.AUTH_CLIENT_ID, // from the provider's dashboard
        //     clientSecret: process.env.AUTH_CLIENT_SECRET, // from the provider's dashboard
        // }
    ],
    callbacks:{
        async session({ session, token }) {
            if(token){
                console.log("bhai mai callbacks ke session function mai hu")
                console.log(token)
                session.user._id=token._id
                session.user.isVerified= token.isVerified
                session.user.email=token.email
                session.user.fullname=token.fullname as string
            }
            return session
        },
        async jwt({ token, user}) {
            console.log("bhai mai callbacks ke jwt function mai hu")
            console.log(user)
            const newUser:any=user
            if(user){
                token._id=user._id?.toString() || user.id
                token.isVerified=user.isVerified || newUser?.email_verified;
                token.email=user.email
                token.fullname=user.fullname as string || user.name as string
            }
            return token
        },
        async signIn({ profile }) {
            console.log("Sign-in callback triggered with profile:", profile);
            await dbConnect();
      
            if (profile?.email) {
              let user = await UserModel.findOne({ email: profile.email });
      
              if (!user) {
                console.log("No user found, creating a new one...");
                
                user = new UserModel({
                  fullname: profile.name,
                  email: profile.email,
                  password: 1234, // No password for OAuth users
                  verifyCode: undefined,
                  verifyCodeExpiry: undefined,
                  forgotPasswordToken: undefined,
                  forgotPasswordTokenExpiry: undefined,
                  isVerified: true, // Google accounts are verified by default
                  affilation: "Enter Your Affilation",
                  country: "Enter Your Country",
                  contactNumber: 123456,
                  isReviewer: false,
                });
      
                await user.save();
                console.log("New user created:", user);
                // Redirect to complete-profile page
                return `/complete-profile`;
              }
            }
      
            return true;
          },
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