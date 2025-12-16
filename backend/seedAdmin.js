const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const createAdmin = async () => {
  try {
    const adminEmail = "admin@gmail.com";
    const userExists = await User.findOne({ email: adminEmail });

    if (userExists) {
      console.log("Admin user already exists");
      process.exit();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123", salt);

    await User.create({
      name: "Admin User",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin user created successfully");
    console.log("Email: admin@gmail.com");
    console.log("Password: admin123");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();
