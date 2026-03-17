import mongoose from "mongoose";


const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("db connected")
        
    } catch (error) {
         console.log("db not connected", error.message)
         throw error
    }
}

export default connectDb;
