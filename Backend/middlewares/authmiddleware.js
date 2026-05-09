const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // 1️⃣ Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    // 2️⃣ Extract token (Bearer <token>)
    const token = authHeader.split(" ")[1];
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Attach user info to request
    req.user = decoded;

    // 5️⃣ Continue to next function
    next();

  } catch (err) {
    console.log("JWT ERROR:", err.message);

    res.status(401).json({
      message: "Invalid token",
      error: err.message
    });
  }
};

module.exports = authMiddleware;