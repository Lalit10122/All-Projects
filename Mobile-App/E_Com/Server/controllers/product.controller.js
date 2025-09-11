import Product from "../models/product.model.js";





export const getProductByCategoryId = async (req,res)=>{
  const {categoryId} = req.params;
  try {
    const products = await Product.find({category:categoryId})

    if(!products  || products.length === 0){
      return res.status(404).json({
        success:false,
        message:"No products found for this category"
      })
    }

    res.status(200).json({
      success:true,
      products
    })

  } catch (error) {
    res.status(500).json({
      success:false,
      message:"Fauled to retrive products",
      error:error.message
    })
  }
}