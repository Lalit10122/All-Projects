import express from 'express';
import dotenv from 'dotenv'

import userRoutes from './routes/user.routes.js'
import categoryRoutes from './routes/categoty.routes.js'
import productRoutes from './routes/product.routes.js'
import orderRoutes from './routes/order.routes.js'
import connectDB from './config/db.connect.js';
import { PORT } from './config/config.js';
import { buildAdminJS } from './config/setup.js';

dotenv.config()
const app = express();

app.use(express.json());

// adding routes
app.use('/user',userRoutes)

app.use('/category',categoryRoutes)

app.use('/products',productRoutes)

app.use('/order',orderRoutes)

// server code
const start = async () => {

  try {

    connectDB();

    await buildAdminJS(app)

    // app.listen({port:3000,host:"0.0.0.0"},(err,address)=>{      
    app.listen(PORT, '0.0.0.0', (err, address) => {
      if (err) {
        console.log('error : ', err);
      } else {
        console.log(`Server is running on http://localhost:${PORT}/admin`);
      }
    });
  } catch (error) {
    console.log('Error in starting server : ', error);
  }
};

start();
