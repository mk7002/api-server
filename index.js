const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Dummy user data for testing
const users = [
  {
    email: "test@example.com",
    password: "password123", // In real applications, use hashed passwords
    name: "Test User"
  }
];

// Login API
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required."
    });
  }

  // Find user
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password."
    });
  }

  // Successful login
  return res.status(200).json({
    success: true,
    message: "Login successful.",
    user: {
      name: user.name,
      email: user.email
    },
    token: "dummy-jwt-token" // Replace with real JWT in production
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
