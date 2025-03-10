import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ sucess: false, message: "Please fill in all fields" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ sucess: true, token, user: { name: user.name } });
  } catch (err) {
    console.log(err);
    res.json({ sucess: false, massage: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ sucess: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      res.json({ sucess: true, token, user: { name: user.name } });
    } else {
      return res({ sucess: false, message: "Invalid password" });
    }
  } catch (err) {
    console.log(err);
    res.json({ sucess: false, massage: err.message });
  }
};

const userCredits = async (req, res) => {
  try {
    const {userId} = req.body
    const user = await User.findById(userId)
    
    res.json({ sucess: true, credits: user.creditBalace, user: {name: user.name} });
  } catch (err) {
    console.log(err);
    res.json({ sucess: false, massage: err.message });
  }
};

export { registerUser, loginUser, userCredits };
