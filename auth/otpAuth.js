const express = require("express");
const router = express.Router();

// Temporary store (in-memory) — Replace with DB or Redis in production
const otpStore = {}; // Format: { "emailOrPhone": { otp: "1234", expires: timestamp } }

// Helper: Generate 4-digit OTP
function generateOTP() {
    return 1234;
}

// Helper: Send OTP (mocked here)
function sendOTPToUser(recipient, otp) {
    console.log(`Sending OTP ${otp} to ${recipient}`);
    // In real app, integrate with SMS or Email service here
}

// 1. Send OTP
router.post("/send-otp", (req, res) => {
    const { contact } = req.body; // can be email or phone

    if (!contact) {
        return res.status(400).json({ success: false, message: "Contact is required." });
    }

    const otp = generateOTP();
    const expires = Date.now() + 5 * 60 * 1000; // 5 minutes

    otpStore[contact] = { otp, expires };
    sendOTPToUser(contact, otp);

    return res.json({ success: true, message: "OTP sent." });
});

// 2. Verify OTP
router.post("/verify-otp", (req, res) => {
    const { contact, otp } = req.body;

    if (!contact || !otp) {
        return res.status(400).json({ success: false, message: "Contact and OTP are required." });
    }

    const entry = otpStore[contact];
    if (!entry) {
        return res.status(404).json({ success: false, message: "OTP not found. Please request again." });
    }

    if (Date.now() > entry.expires) {
        delete otpStore[contact];
        return res.status(410).json({ success: false, message: "OTP expired. Please request again." });
    }

    if (otp !== entry.otp) {
        return res.status(401).json({ success: false, message: "Invalid OTP." });
    }

    delete otpStore[contact]; // Clean up after success

    return res.json({ success: true, message: "OTP verified successfully.", data: { token: "dummy-jwt-token" } });
});

// 3. Resend OTP
router.post("/resend-otp", (req, res) => {
    const { contact } = req.body;

    if (!contact) {
        return res.status(400).json({ success: false, message: "Contact is required." });
    }

    const otp = generateOTP();
    const expires = Date.now() + 5 * 60 * 1000;

    otpStore[contact] = { otp, expires };
    sendOTPToUser(contact, otp);

    return res.json({ success: true, message: "OTP resent." });
});

module.exports = router;
