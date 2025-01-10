const express = require("express");
const connectDB = require("./db");
require("dotenv").config();
const cors = require("cors");
const app = express();

// Updated CORS options to allow specific origin, you can also set it to true to all origins
const corsOptions = {
  origin: "https://jttfront-gamma.vercel.app", // Allow only your frontend's origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow the http methods, you can just use 'GET,POST' for your needs
  credentials: true, // For cookies, authorization headers, etc.
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(express.json());

const User = require("./schema");
const port = process.env.PORT || 5000;

connectDB();

app.post("/submit", async (req, res) => {
  const { name, phone } = req.body;

  try {
    const newUser = new User({
      name,
      phone,
    });
    console.log(newUser);
    await newUser.save();
    res.status(201).json({ message: "User Created", user: newUser });
  } catch (err) {
    console.error("Error with user creation:", err.message);
    res.status(500).json({ error: "Server error", message: err.message }); // Modified Error response
  }
});

app.post("/submitTest", (req, res) => {
  console.log("Post api");
  const recivedData = req.body;
  console.log(recivedData);

  res.json({
    message: "Data received successfully",
    recivedData: recivedData,
  });
});

app.get("/", (req, res) => {
  console.log("You are inside the / route");
  res.send("Route");
});

app.get("/about", (req, res) => {
  res.send("Reached about");
});

app.listen(port, () => {
  console.log(`Server is running on ${port} `);
});
