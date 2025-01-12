import "next-auth"

declare module "next-auth" {
    interface User{
        _id?:string;
        isVerified?:boolean,
        email?:string,
        fullname?:string
    }
    interface Session{
        user:{
            _id?:string;
            isVerified?:boolean,
            email?:string,
            fullname?:string
            email_verified:boolean
        } & DefaultSession['user']
    }
    // interface signIn{
    //     user:{
    //         _id?:string;
    //         isVerified?:boolean,
    //         email?:string,
    //         fullname?:string
    //     } & DefaultSession['user']
    // }
}

declare module "next-auth/jwt" {
    interface JWT {
        _id?:string; 
        isVerified?:boolean,
        email?:string,
        fullname?:string
    }
}