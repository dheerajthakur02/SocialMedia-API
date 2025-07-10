import jwt from  'jsonwebtoken'

const isAuthenticated = async (req,res,next) =>{
      try {
          const token = req.cookies.token;

          if(!token){
              return res.status(404).json({message:"No token is provided, Authentication failed"});
          }

          const decoded = jwt.verify(token,process.env.SECRET_KEY)

          if(!decoded){
             return res.status(400).json({message:"Invalid Token, Authentication failed"});
          }
          req.id= decoded.userId;
          next(); 
      } catch (error) {
        return res.status(500).json({message:"Interval server error",error:error.message})
      }
} 



export default isAuthenticated;