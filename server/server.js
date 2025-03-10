import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/mongodb.js";

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(cors());
await connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => console.log("Sever running on " + PORT));
