import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import razorpay from "razorpay";
import Transaction from "../models/transactionModel.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill in all fields" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token, user: { name: user.name } });
  } catch (err) {
    console.log(err);
    res.json({ success: false, massage: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      res.json({ success: true, token, user: { name: user.name } });
    } else {
      return res({ success: false, message: "Invalid password" });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false, massage: err.message });
  }
};

const userCredits = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);

    res.json({
      success: true,
      credits: user.creditBalance,
      user: { name: user.name },
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false, massage: err.message });
  }
};

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const paymentRazorpay = async (req, res) => {
  try {
    const { userId, planId } = req.body;

    const userData = await User.findById(userId);

    if (!userId || !planId) {
      return res.json({ success: false, massage: "Missing Details" });
    }

    let credits, plan, amount, date;

    switch (planId) {
      case "Basic":
        plan = "Basic";
        credits = 100;
        amount = 10;
        break;

      case "Advanced":
        plan = "Advanced";
        credits = 500;
        amount = 50;
        break;

      case "Business":
        plan = "Business";
        credits = 5000;
        amount = 250;
        break;

      default:
        return res.json({ success: false, massage: "Invalid Plan" });
    }

    date = Date.now();

    const transactionData = {
      userId,
      plan,
      amount,
      credits,
      date,
    };

    const newTransaction = await Transaction.create(transactionData);

    const options = {
      amount: amount * 100,
      currency: process.env.CURRENCY,
      receipt: newTransaction._id,
    };

    await razorpayInstance.orders.create(options, (err, order) => {
      if (err) {
        console.log(err);
        return res.json({ success: false, massage: "Error in Payment" });
      }
      res.json({ success: true, order });
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false, massage: err.message });
  }
};

const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === "paid") {
      const transactionData = await Transaction.findById(orderInfo.receipt);
      if (transactionData.payment) {
        return res.json({ success: false, massage: "Payment Failed" });
      }

      const userData = await User.findById(transactionData.userId);

      const creditBalance = userData.creditBalance + transactionData.credits;
      await User.findByIdAndUpdate(userData._id, { creditBalance });

      await Transaction.findByIdAndUpdate(transactionData._id, {
        payment: true,
      });

      res.json({ success: true, massage: "Payment Successfull" });
    } else {
      res.json({ success: false, massage: "Payment Failed" });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false, massage: err.message });
  }
};

export {
  registerUser,
  loginUser,
  userCredits,
  paymentRazorpay,
  verifyRazorpay,
};
