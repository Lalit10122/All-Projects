import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import session from 'express-session';
import ConnectMongoDBSession from 'connect-mongodb-session';
import * as AdminJSMongoose from '@adminjs/mongoose';
import { dark, light, noSidebar } from '@adminjs/themes';

import Product from '../models/product.model.js';
import Category from '../models/category.model.js';
import Order from '../models/order.model.js';
import User from '../models/user.model.js';
import Transaction from '../models/transaction.model.js';
import { COOKIE_PASSWORD } from './config.js';

AdminJS.registerAdapter(AdminJSMongoose);

const DEFAULT_ADMIN = {
  email:process.env.EMAIL ,
  password: process.env.PASS,
};

const authenticate = async (email, password) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

export const buildAdminJS = async app => {
  const admin = new AdminJS({
    resources: [
      { resource: Product },
      { resource: Category },
      { resource: Order },
      { resource: User },
      { resource: Transaction },
    ],
    branding:{
      companyName:"Kart",
      withMadeWithLove:false,
      favicon:"https://i.postimg.cc/0N8XbVbW/file-00000000ed7462439b3e0345fc878482.png",
      logo:"https://i.postimg.cc/0N8XbVbW/file-00000000ed7462439b3e0345fc878482.png"
    },
    defaultTheme:dark.id,
    availableThemes:[dark,light,noSidebar],
    rootPath:"/admin"
  });


  const MongoDBStore = ConnectMongoDBSession(session)
  const sessionStore = new MongoDBStore({
    uri:process.env.MONGO_URI,
    collection:"sessions"
  })

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName:'adminjs',
      cookiePassword:COOKIE_PASSWORD
    },
    null,
    {
      store:sessionStore,
      resave:true,
      saveUninitialized:true,
      secret:COOKIE_PASSWORD,
      cookie:{
        httpOnly:process.env.NODE_ENV==="production",
        secure:process.env.NODE_ENV==="production"
      },
      name:"adminjs"

    }
  )
  app.use(admin.options.rootPath,adminRouter)
};
