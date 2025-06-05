const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());


const otpRoutes = require("./auth/otpAuth");
// Use routes

app.use("/csa/otpAuth", otpRoutes);

// Catch-all for undefined routes (404)
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
//run

//node index.js
