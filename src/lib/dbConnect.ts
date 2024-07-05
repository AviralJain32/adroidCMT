import mongoose from "mongoose";

type  ConnectionObject={
    isConnected?:number
}

const connection:ConnectionObject={}

async function dbConnect():Promise<void>{ //yha void ka mtlb hai ki merko parvah ni hai ki kya content aara hai
    //if not dome causes database choaking
    if(connection.isConnected){
        console.log("Already connected to database")
        return
    }
    try {
        const db=await mongoose.connect(process.env.MONGODB_URI || "",{})
        console.log(db)
        connection.isConnected=db.connections[0].readyState
        console.log("DB connected successfully")
    } catch (error) {
        console.log("Database connection failed",error);
        process.exit(1)
    }
}

export default dbConnect;