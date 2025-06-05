const express = require("express");
const router = express.Router();

// Dummy data
const users = [
    { email: "test@example.com", password: "password123", name: "Test User" }
];

// /auth/login
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Missing fields." });
    }

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ success: false, message: "Invalid credentials." });
    }

    return res.json({
        success: true,
        message: "Login successful",
        user: { name: user.name, email: user.email },
        token: "dummy-jwt-token"
    });
});

module.exports = router;
