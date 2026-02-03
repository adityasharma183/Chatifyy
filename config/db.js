import mongoose from "mongoose";
import { ENV } from "../utils/env.js";
export const connectDB=async ()=>{
    try {
        
        const conn=await mongoose.connect(ENV.MONGODB_URI)
        console.log('MONGODB CONNECTED',conn.connection.host);
        
    } catch (error) {
        console.error('error connecting to mongodb',error)
        process.exit(1)//1 means fail
        
    }
}