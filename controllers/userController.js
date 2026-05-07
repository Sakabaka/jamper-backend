const User = require('../models/userModel');

exports.loginOrCreateUser = async (req, res) => {
  const { username } = req.body;
  const user = await User.findOneAndUpdate(
    { username },
    { username },
    { upsert: true, new: true }
  );
  res.json({
    username: user.username,
    equippedSkin: user.equippedSkin || 'starter',
    ownedSkins: user.ownedSkins || ['starter'],
    stats: user.stats || { highScore: 0 }
  });
};

exports.equipSkin = async (req, res) => {
  const { username, skinId } = req.body;
  
  const user = await User.findOneAndUpdate(
    { username },
    { 
      $set: { equippedSkin: skinId },
      $push: { "gameLogs": { event: "change_skin", value: skinId, timestamp: new Date() } }
    },
    { new: true }
  );
  res.json(user);
};