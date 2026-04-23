const users = require('../models/users_model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Username, email, and password are required" });
    }

   
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new users({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({ message: "User created successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // 1️⃣ Validation
    if (!identifier || !password) {
      return res.status(400).json({ message: "email or username and password are required" });
    }

    // 2️⃣ Find user by email OR username
    const user = await users.findOne({
      $or: [
        { email: identifier },
        { username: identifier }
      ]
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // 3️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 4️⃣ Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 5️⃣ Send response
    res.json({ token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};