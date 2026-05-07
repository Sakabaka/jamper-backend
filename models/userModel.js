const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
username: { type: String, required: true, unique: true },
password: { type: String, required: true }, // Simple string, no hashing needed for this project
  profile: {
    device: String,
    joinedAt: { type: Date, default: Date.now }
  },
  inventory: {
    equippedSkin: { type: String, default: 'starter_diamond' },
    ownedSkins: { type: [String], default: ['starter_diamond'] }
  },
  stats: {
    totalPlayTime: { type: Number, default: 0 }, // in seconds
    totalCoins: { type: Number, default: 0 },
    highScore: { type: Number, default: 0 }
  },
  // This is the "Big Data" part: an array of events
  gameLogs: [{
    score: Number,
    duration: Number,
    causeOfDeath: String,
    timestamp: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model('User', userSchema);