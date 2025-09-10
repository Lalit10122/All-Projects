import express from 'express'
import { checkAuth, logIn, logOut, signUp, update } from '../controllers/auth.controllers.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/signUp",signUp);
router.post("/logIn",logIn)
router.post("/logOut",logOut)


router.put("/update-profile",protectRoute,update)

router.checkout("/check",protectRoute,checkAuth)

export default router