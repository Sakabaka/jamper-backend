const router = require('express').Router();
const User = require('../models/User');

router.post('/update-score', async (req, res) => {
  const { username, score } = req.body;
  // Logic: Find user, update timesPlayed, and check if score is a new High Score
  const user = await User.findOneAndUpdate(
    { username },
    { $inc: { timesPlayed: 1 }, $max: { highScore: score } },
    { new: true }
  );
  res.json(user);
});