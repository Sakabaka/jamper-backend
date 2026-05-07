const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Ensure you have a User model!

// Update or Create a user score
router.post("/score", async (req, res) => {
  const { username, score } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { username }, // Find by username
      { 
        $max: { highScore: score }, // Only update if new score is higher
        $inc: { timesPlayed: 1 }     // Increment play count every time
      },
      { upsert: true, new: true }    // Create user if they don't exist
    );
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get Top 10 Leaderboard (Missing feature idea!)
router.get("/leaderboard", async (req, res) => {
  try {
    const topPlayers = await User.find().sort({ highScore: -1 }).limit(10);
    res.json(topPlayers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/users/login
router.post("/login", async (req, res) => {
  const { username } = req.body;

  try {
    // 1. Try to find the user
    let user = await User.findOne({ username });

    // 2. If they don't exist, create a new one
    if (!user) {
      user = await User.create({ username });
      console.log(`New player joined: ${username}`);
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;