const User = require('../models/userModel');

exports.loginOrCreateUser = async (req, res) => {
  const { username, password } = req.body;
  let user = await User.findOne({ username });

  if (user) {
    if (user.password !== password) return res.status(401).json({ error: "Wrong password" });
  } else {
    user = await User.create({ username, password });
  }
  res.json(user);
};

exports.equipSkin = async (req, res) => {
  const { username, skinId } = req.body;
  const user = await User.findOneAndUpdate(
    { username },
    { 
      $set: { equippedSkin: skinId },
      $push: { gameLogs: { event: "equip_skin", value: skinId, time: new Date() } }
    },
    { new: true }
  );
  res.json(user);
};