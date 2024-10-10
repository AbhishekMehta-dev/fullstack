import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";


export const verifyJWT = async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
      
        if (!token) {
            throw new Error("Not authenticated")
          
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            throw new Error("Not authenticated")
        }
    
        req.user = user;
        next()
    } catch (error) {
        console.error(error)
        res.status(401).json({error: "Not authenticated"})
        next()
        
        
    }
    
}

