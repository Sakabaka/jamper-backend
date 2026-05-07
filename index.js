const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

dotenv.config(); // Render will find your vars here automatically

// 1. Database Connection
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log(`✅ Connection to the DB secured !!!`))
  .catch((e) => console.log(`❌ DB Error: ${e} !!!`));

const app = express();

// 2. Middleware
app.use(cors());
app.use(express.json());

// 3. Routes
// Adding a prefix like '/api' is a best practice to avoid route conflicts
app.use("/api/users", userRoutes);

// 4. Health Check (Missing)
// This is helpful to check if Render is alive without calling a real API
app.get("/", (req, res) => {
  res.send("Jamper Backend is Running! 🚀");
});

// 5. Global Error Handler (Missing)
// This prevents your server from crashing if a route fails
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong on the server!" });
});

const port = process.env.PORT || 10000; // Use Render's port or 10000
app.listen(port, () => {
  console.log(`📡 Server running on Port: ${port} !!!`);
});