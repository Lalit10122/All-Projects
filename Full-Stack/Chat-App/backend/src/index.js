import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from "cors"


import { connectDB } from './lib/db.js';
import useAuthRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"

dotenv.config();
const PORT = process.env.PORT || 5000

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin:["http://localhost:5173"],
    credentials:true
  })
)

// auth routes

app.use("/api/auth",useAuthRoutes)

// message routes

app.use("/api/message",messageRoutes)



app.listen(PORT ,()=>{
  console.log(`Server is running on port ${PORT}`)
  connectDB()
})