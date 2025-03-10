import axios from "axios";
import User from "../models/userModel.js";
import FormData from "form-data";

const generateImage = async (req, res) => {
  try {
    const { userId, prompt } = req.body;

    const user = await User.findById(userId);

    if (!user || !prompt) {
      return res.status(400).json({ message: "Missing details!" });
    }

    if (user.creditBalance === 0 || User.creditBalance < 0) {
      return res.status(400).json({
        message: "Insufficient credits!",
        creditBalance: user.creditBalace,
      });
    }

    const formdata = new FormData();
    formdata.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formdata,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API,
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

    await User.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    });

    res.json({
      success: true,
      message: "Image generated successfully!",
      creditBalace: user.creditBalance - 1,
      resultImage,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: err.message,
    });
  }
};

export {generateImage};
