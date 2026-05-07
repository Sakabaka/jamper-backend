const User = require('../models/userModel');

exports.loginOrCreateUser = async (req, res) => {
  try {
    const { username } = req.body;
    
    // Attempt to find the user. If they don't exist, create them.
    let user = await User.findOneAndUpdate(
        { username },
        { username }, 
        { upsert: true, new: true, runValidators: true }
    );

    console.log(`User logged in/created: ${username}`);
    res.status(200).json(user);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};