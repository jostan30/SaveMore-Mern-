
const Razorpay = require('razorpay');
const crypto = require('crypto');
const orderModel = require('../models/order-model');
const config = require('../config/Razorpaykeys');
const userModel = require('../models/user-model');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: config.razorpayKeyId,
  key_secret: config.razorpayKeySecret
});

// @desc    Create Razorpay order
// @access  Private
const createRazorpayOrder = async (req, res) => {
  try {
    const { amount, currency, receipt, notes } = req.body;
    console.log(req.body);
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: currency || 'INR',
      receipt: receipt,
      notes: notes || {}
    };

    const order = await razorpay.orders.create(options);
    console.log(order);
    if (!order) {
      return res.status(500).json({ msg: 'Error creating Razorpay order' });
    }

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Verify Razorpay payment
// @access  Private
const verifyRazorpayPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    console.log(req.body);

    // Step 1: Verify Signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", config.razorpayKeySecret)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      // ❌ Signature invalid — delete only the order linked to razorpay_order_id
      const failedOrder = await orderModel.findOne({ razorpayOrderId: razorpay_order_id });
      if (failedOrder) {
        await orderModel.findByIdAndDelete(failedOrder._id);
      }

      return res.status(400).json({ message: "Invalid signature. Order deleted." });
    }

    // Step 2: Mark Orders as Paid
    await orderModel.findByIdAndUpdate(orderId, {
      isPaid: true,
      status: "Paid",
    });

    // Step 3
    const sampleOrder = await orderModel.findById(orderId);
    const buyerId = sampleOrder.buyer;

    // Step 4
    const paidOrders = [sampleOrder]; // since only one order
    const paidProductItems = paidOrders.flatMap(order =>
      order.orderProduct.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
      }))
    );

    const paidProductIds = paidProductItems.map(item => item.product_id);

    // Step 5: Update User Document
    await userModel.findByIdAndUpdate(buyerId, {
      $pull: {
        cart: {
          product_id: { $in: paidProductIds },
        },
      },
      $push: {
        purchasedProducts: { $each: paidProductItems },
      },
    });

    return res.status(200).json({ message: "Payment verified, orders updated, cart cleared, products moved to purchased" });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


// @desc    Get Razorpay API key for frontend
// @access  Public
const getRazorpayKey = (req, res) => {
  console.log(config.razorpayKeyId);
  res.json({ key: config.razorpayKeyId });
};

module.exports = {
  createRazorpayOrder,
  verifyRazorpayPayment,
  getRazorpayKey
};
