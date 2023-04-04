import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    // Find User
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    // Check password
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Generate token
    const token = jwt.sign({ userId: user._id }, "mysecretkey");
    res.json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

router.post('/register', async (req, res) => {
    try {
      console.log("req.body", req.body)
      const { username, name, password, email } = req.body;
      // Check if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }
      // Create new user
      
      // Hash password
      const salt = await bcrypt.genSalt();
      console.log("password", password);
      const passwordHash = await bcrypt.hash(password, salt);
      console.log("passwordHash", passwordHash)
      user = new User({ username, name, password: passwordHash, email, createdAt: new Date() });
      await user.save();
      // Generate token
      const token = jwt.sign({ userId: user._id }, 'mysecretkey');
      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
});

export default router;
  
