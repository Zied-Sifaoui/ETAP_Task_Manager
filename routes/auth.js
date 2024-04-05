const express = require('express');
const router = express.Router();
const { register, login} = require('../controllers/auth');

// User Registration
router.post('/register', register);

// User Login
router.post('/login', login);

module.exports = router;
