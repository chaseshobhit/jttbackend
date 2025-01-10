const express = require("express");
const connectDB = require("./db");
require("dotenv").config();
const cors = require("cors");
const app = express();

// Corrected CORS options for specific origin and methods
const corsOptions = {
  origin: [
    "https://jttfront-gamma.vercel.app",
    "https://jttfront-gamma.vercel.app/",
    "https://jttbackend.vercel.app/submit",
    "https://jttbackend.vercel.app/",
    "https://jttbackend.onrender.com/submit",
    "https://jttbackend.onrender.com",
  ], // Allow only your frontend's origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow the http methods, you can just use 'GET,POST' for your needs
  credentials: true, // For cookies, authorization headers, etc.
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(express.json());

const User = require("./schema");

const PORT = process.env.PORT || 5000; // Use dynamic port

connectDB();

app.post("/submit", async (req, res) => {
  const { name, phone } = req.body;

  try {
    const newUser = new User({
      name,
      phone,
    });
    await newUser.save();
    res.status(201).json({ message: "User Created", user: newUser });
  } catch (err) {
    console.error("Error with user creation:", err.message);
    res.status(500).json({ error: "Server error", message: err.message });
  }
});

app.post("/submitTest", (req, res) => {
  const recivedData = req.body;

  res.json({
    message: "Data received successfully",
    recivedData: recivedData,
  });
});

app.get("/", (req, res) => {
  res.send("Route");
});

app.get("/about", (req, res) => {
  res.send("Reached about");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
