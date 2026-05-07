const users = require('../models/users_model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register
exports.register = async (req, res) => {
  console.log("=== REGISTER ENDPOINT HIT ===");
  console.log("Request body:", req.body);
  
  try {
    const { username, email, password } = req.body;

    console.log("Register attempt - Username:", username, "| Email:", email);
    
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Username, email, and password are required" });
    }

   
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      console.log("Email already in use:", email);
      return res.status(400).json({ message: "Email already in use" });
    }

   
    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed. Hash starts with:", hashedPassword.substring(0, 10));

    const user = new users({
      username,
      email,
      password: hashedPassword
    });

    await user.save();
    console.log("User saved to database:", username);

    // Generate token for auto-login
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("Token generated. Sending response with user data...");
    const responseData = {
      message: "User created successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    };
    console.log("Response object to send:", responseData);
    res.status(201).json(responseData);
    console.log("Response sent successfully!");

  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    console.log("Login attempt - Identifier:", identifier);

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
      console.log("User not found for identifier:", identifier);
      return res.status(400).json({ message: "User not found" });
    }

    console.log("User found:", user.username, "| Email:", user.email);
    console.log("Stored password hash starts with:", user.password.substring(0, 10));
    console.log("Comparing password...");

    // 3️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    console.log("Password match result:", isMatch);

    if (!isMatch) {
      console.log("Password mismatch for user:", user.username);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 4️⃣ Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 5️⃣ Send response with user info
    console.log("Login successful for:", user.username);
    res.json({ 
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get current user info
exports.getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const user = await users.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      bio: user.bio
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};