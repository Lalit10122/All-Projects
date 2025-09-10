import bcrypt from 'bcryptjs'
import User from '../models/user.model.js';
import { generateToken } from '../utils/utils.js';
import cloudinary from "../lib/cloudinary.js"

export const signUp = async (req , res)=>{
  const {fullName , email ,password} = req.body;

  try {
    if(!fullName || !email || !password){
      return res.status(400).json({
        message:"All fields are required"
      })
    }
    if(password.length < 6){
      return res.status(400).json({
        message:"min pass length : 6"
      })
    }
    const user = await User.findOne({email})
    if(user){
      return res.status(400).json({
        message:"User already exists"
      })
    }

    // convert pass into hashpass 
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt)

    const newUser = new User({fullName,email,password:hashPassword})

    if(newUser){
      generateToken(newUser._id,res)

      await newUser.save()
      res.status(201).json({
        _id:newUser._id,
        fullName:newUser.fullName,
        email:newUser.email,
        profilePic:newUser.profilePic
      })
      console.log("User Sign Up : ",newUser.fullName)
    }
    else{
       res.status(400).json({
        message:"Invalid User"
      })
    }

  } catch (error) {
    console.log("Error in sign Up controller :", error.message)
    res.status(500).json({
      message:"Inernel server error"
    })
  }
}
// /////          LOG IN 
export const logIn = async (req , res)=>{
  const {email,password} = req.body
  try {
    const user = await User.findOne({email})
    if(!user){
      return res.status(400).json({
        message:"No user found with this email"
      })
    }

    const isPassCorrect = await bcrypt.compare(password,user.password)
    
    if(!isPassCorrect){
      res.status(400).json({
        message:"Invalid password"
      })
    }

    generateToken(user._id , res)
    const newUser = user;
    res.status(500).json({
       _id:newUser._id,
        fullName:newUser.fullName,
        email:newUser.email,
        profilePic:newUser.profilePic
    })
     console.log("User Log In : ",newUser.fullName)
  } catch (error) {
    console.log("Error in Log in controller :", error.message)
    res.status(500).json({
      message:"Inernel server error"
    })
  }
}
// //////////// log out (remove jwt token )

export const logOut = async (req , res)=>{
  try {
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({
      message:"logged out successfully"
    })
  } catch (error) {
    console.log("Error in log out controller ",error.message)
    res.status(500).json({
      message:"Internal server error"
    })
  }
}
// //////////// update

export const update = async (req , res)=>{
  try {
    const {profilePic} = req.body;

    const userId = req.user._id

    if(!profilePic){
      res.status(400).json({
        message:"Profile pic is required"
      })
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic)
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {profilePic:uploadResponse.secure_url},
      {new:true}
    )
    res.status(200).json({
      updatedUser
    })

  } catch (error) {
     console.log("Error in update profile controller ",error.message)
    res.status(500).json({
      message:"Internal server error"
    })
  }
}
// //////////// check auth 

export const checkAuth = async (req,res)=>{
  try {
    res.status(200).json(req.user)
  } catch (error) {
    console.log("error in check auth controller")
     console.log("Error in log out controller ",error.message)
    res.status(500).json({
      message:"Internal server error"
    })
  }
}