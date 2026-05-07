const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define a simple POST route for login
router.post('/login', userController.loginOrCreateUser);
router.post('/equip', userController.equipSkin);
module.exports = router;