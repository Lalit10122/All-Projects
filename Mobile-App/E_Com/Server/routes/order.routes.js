import express from 'express'
import { createOrder, createTransaction, getOrderByUserId } from '../controllers/order.controller.js';

const router = express.Router();

router.post("/transaction",createTransaction)
router.get("/:userId",getOrderByUserId)
router.post("/",createOrder)

export default router;