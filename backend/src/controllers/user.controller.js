import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";


// Add a new user
const generateAccessAndRefereshTokens = async(userId) =>{
  try {
      const user = await User.findById(userId)
      const accessToken = user.generateAccessToken()
      const refreshToken = user.generateRefreshToken()

      user.refreshToken = refreshToken
      await user.save({ validateBeforeSave: false })

      return {accessToken, refreshToken}


  } catch (error) {
      console.error("Error generating tokens:", error.message);
      throw new Error("Internal server error. Please try again later.");
      
  }
}



const registerUser = async (req, res) => {
  try {
    const { fullname, username, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const newUser = new User({ fullname, username, email, password, role });
    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully.",
      user: {
        fullname,
        username,
        email,
        role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};

const loginUser = async(req,res)=>{
   
  const {username,email, password} = req.body;

  if(!username ||!password){
      return res.status(400).json({error: "Please provide username and password"})
  }
  const user = await User.findOne({username}).select('+password')
  
  const isPasswordValid = await user.isPasswordCorrect(password)

  if (!isPasswordValid) {
      return res.status(401).json({error: "Invalid username or password"})
      
   
   }

const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

 const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

 const options = {
     httpOnly: true,
     secure: true
 }

 return res
 .status(200)
 .cookie("accessToken", accessToken, options)
 .cookie("refreshToken", refreshToken, options)
 .json({
     message: "User logged in successfully",
     user: loggedInUser,
     accessToken,
     refreshToken
 })


 
 
}   
const logoutUser= async(req, res) => {
  await User.findByIdAndUpdate(
      req.user._id,
      {
          $unset: {
              refreshToken: 1 // this removes the field from document
          }
      },
      {
          new: true
      }
  )

  const options = {
      httpOnly: true,
      secure: true
  }

  return res
  .status(200)
  .clearCookie("accessToken", options)
  .clearCookie("refreshToken", options)
  .json({
      message: "User logged out successfully"
  })
}

  



export { registerUser, loginUser,logoutUser };
