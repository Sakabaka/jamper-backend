const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  highScore: { type: Number, default: 0 },
  gamesPlayed: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', userSchema);