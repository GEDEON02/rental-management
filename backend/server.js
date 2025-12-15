const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

const app = express();
const productRoutes = require("./routes/productRoutes");

// middleware
app.use(cors());
app.use(express.json());
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);


// test route
app.get("/", (req, res) => {
  res.send("Backend running");
});

// connect DB and start server
connectDB();

const PORT = process.env.PORT || 4999;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
