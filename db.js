import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
          await mongoose.connect(process.env.MONGODB_URL_LOCAL)
          console.log("mongoDB database connected successfully")
    } catch (error) {
          console.log(error)
    }
}
export default connectDB;