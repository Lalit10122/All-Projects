import Category from "../models/category.model.js"



export const getAllCategories = async (req,res)=>{
  try {
    const categories = await Category.find()
    res.status(200).json({
      success:true,
      categories
    })


  } catch (error) {
    res.status(500).json({
      success:false,
      message:"Fauled to retrive catefories",
      error:error.message
    })
  }
}
