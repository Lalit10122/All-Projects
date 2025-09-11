import Razorpay from 'razorpay';
import crypto from 'crypto';

import Order from '../models/order.model.js';
import Transaction from '../models/transaction.model.js';

export const createTransaction = async (req, res) => {
  const { amount, userId } = req.body;

  const razorpay = new Razorpay({
    key_id: process.env.RAZOR_PAY_KEY_ID,
    key_secret: process.env.RAZOR_PAY_SECRET,
  });
  const options = {
    amount: amount,
    currency: 'INR',
    receipt: `receipt${Date.now()}`,
  };

  try {
    if (!amount || !userId) {
      return res.status(400).json({
        success: false,
        message: 'Amount and userid required',
      });
    }

    const rezorpayOrder = await razorpay.orders.create(options);

    res.status(201).json({
      success: false,
      message: 'Order created successfully',
      key: process.env.RAZOR_PAY_KEY_ID,
      amount: rezorpayOrder.amount,
      currency: rezorpayOrder.currency,
      order_id: rezorpayOrder.id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create Transaction',
      error: error.message,
    });
  }
};

export const createOrder = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    userid,
    cartItems,
    deliveryDate,
    address,
  } = req.body;

  const key_secret = process.env.RAZOR_PAY_SECRET;

  const generated_signature = crypto
    .createHmac('sha256', key_secret)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');

  if (generated_signature === razorpay_signature) {
    try {
      const transaction = Transaction.create({
        user: userid,
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        status: 'Success',
        amount: cartItems.reduce(
          (total, item) => total + item?.quantity * item.price,
          0,
        ),
      });
      const order = await Order.create({
        user: userid,
        address,
        deliveryDate,
        items: cartItems?.map(item => ({
          product: item?._id,
          quantity: item?.quantity,
        })),
        status: 'Order Placed',
      });

      transaction.order = order._id;
      (await transaction).save();

      res.json({
        success: true,
        meassage: 'Payment veryfied and order created',
        order,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to create transaction',
        error: error.message,
      });
    }
  }
};

export const getOrderByUserId = async (req, res) => {
  const { userid } = req.params;
  try {
    const orders = await Order.find({ user: userid })
      .populate('user', 'name email')
      .populate('items.product','name price image_uri ar_uri')
      .sort({ createdAt: -1 });
      if(!orders || orders.length === 0){
        return res.status(401).json({
          success:false,
          message:"No orders found for this user"
        })
      }

      res.status(200).json({
        success:true,
        orders
      })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:"Failed to retrieve orders",
      error:error.message
    })
  }
};
