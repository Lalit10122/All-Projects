import dotenv from 'dotenv'
import mongoose,{Types} from 'mongoose'

import Product from './models/product.model.js'
import Category from './models/category.model.js'
import { categoriesData,productData } from './seedData.js'


dotenv.config()
async function seedDatabase(){
  try {
    await mongoose.connect(process.env.MONGO_URI)

    await Product.deleteMany({})
    await Category.deleteMany({})

    const categoryDocs = await Category.insertMany(categoriesData)

    const categoryMap = categoryDocs.reduce((map,category)=>{
      map[category.name] = category._id;
      return map;
    })

    const productWithCategoryId = productData.map((product)=>({
      ...product,
      category:categoryMap[product.category]
    }))

    await Product.insertMany(productWithCategoryId)

    console.log("Database seeded successfully")
  } catch (error) {
    console.error("Error seeding database : ",error)
  }finally{
    mongoose.connection.close()
  }
}

seedDatabase()