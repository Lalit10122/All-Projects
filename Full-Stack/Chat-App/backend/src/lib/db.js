import mongoose from 'mongoose'


export const connectDB = async ()=>{
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI)
    console.log("mongodb connected : ",connect.connection.host)
  } catch (error) {
    console.log("mongo db connection failed ",error)
  }
}