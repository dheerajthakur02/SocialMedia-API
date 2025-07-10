import User from "../models/user.model.js";

export const checkAdminRole = async (req,res,next) =>{
        try {
            const id =req.id;
            const person = await User.findById(id)
            
            if(person.role != "admin"){
                return res.status(400).json({message:"You are not admin, you are not authorised"})
            }
            next();
        } catch (error) {
            return res.status(500).json({message:"Internal server error", error: error.message})
        }
}

export const checkUserRole = async (req,res,next) =>{
        try {
            const id =req.id;
            const person = await User.findById(id)
            
            if(person.role != "user"){
                return res.status(400).json({message:"You are not user, you are not authorised"})
            }
            next();
        } catch (error) {
            return res.status(500).json({message:"Internal server error", error: error.message})
        }
}