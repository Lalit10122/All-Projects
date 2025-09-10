import jwt from 'jsonwebtoken'

import User from "../models/user.model.js";


const generateTokens =(user)=>{
  const accessToken = jwt.sign(
    {userId:user?._id},
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:"2d"}
  )

   const refreshToken = jwt.sign(
    {userId:user?._id},
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn:"9d"}
  )

  return {accessToken,refreshToken}
}



export const loginOrSignUp = async (req,res)=>{
  const {phone , address}=req.body;

  // create user 
  try {
    const user = await User.findOne({phone})

    if(!user){
      user = new User({address , phone})
      await user.save()
    }
    else{
      user.address = address
      await user.save()
    }

    // generate token 

    const {accessToken , refreshToken} = generateTokens(user.toObject())

    res.status(200).json({
      user ,
      accessToken,
      refreshToken
    })

  } catch (error) {
    console.log("error in uesr controller js",error)
    res.status(500).json({
      error:error.message
    })
  }
}