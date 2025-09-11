// import mongoose from "mongoose";

// const connectDB =(url)=>{
//   return mongoose.connect(url)
// }
// export default connectDB;



import mongoose  from "mongoose";


const connectDB = async()=>{
  try{

    const connect = await mongoose.connect(process.env.MONGO_URI)
    console.log("Mongo db is connected : ",connect.connection.host)
  }catch(err){
    console.log("error in connection mongo db ",err)
    process.exit(1)
  }
}

export default connectDB