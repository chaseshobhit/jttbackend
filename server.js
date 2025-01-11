const express = require("express");
const connectDB = require("./db");
require("dotenv").config();
const cors = require("cors");
const app = express();

// CORS options to allow all origins
const corsOptions = {
  origin: 'https://jttfront.onrender.com', // Be specific here!
  methods: "GET,POST", 
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

const User = require("./schema");

const PORT = process.env.PORT || 5000;

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