import express from 'express'
import { loginOrSignUp } from '../controllers/user.controller.js';

const router = express.Router();

router.post("/logIn",loginOrSignUp)

export default router;