import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
       title:{
        type:String,
        required:true
       },
       image:{
         type:String,
         default:""
       },
       description:{
          type:String
       },
       likes:{
          type:Number,
          default:0
       },
       likedBy:{
          type:[mongoose.Types.ObjectId],
           ref:"User"
       },
       createdBy:{
          type: mongoose.Types.ObjectId,
          ref:"User",
          required:true
       }
},{timestamps:true})

export default mongoose.model("Post",postSchema);