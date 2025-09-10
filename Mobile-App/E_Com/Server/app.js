import express from 'express';
import dotenv from 'dotenv'
import userRoutes from './routes/user.routes.js'


dotenv.config()
const app = express();

app.use(express.json());

// adding routes
app.use('/user',userRoutes)

// server code
const start = async () => {
  try {
    // app.listen({port:3000,host:"0.0.0.0"},(err,address)=>{
    app.listen(3000, '0.0.0.0', (err, address) => {
      if (err) {
        console.log('error : ', err);
      } else {
        console.log('Server is running on http://localhost:3000 ');
      }
    });
  } catch (error) {
    console.log('Error in starting server : ', error);
  }
};

start();
