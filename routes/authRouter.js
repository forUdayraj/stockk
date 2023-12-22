// routes/authRouter.js
const express = require('express');
const router = express.Router();
const { showLoginPage, showSignupPage, handleLogin, handleLogout, handleSignup } = require('../controllers/authController');

// Login page route
router.get('/login', showLoginPage);

// Signup page route
router.get('/signup', showSignupPage);

// Login POST route
router.post('/login', handleLogin);

// Logout route
router.get('/logout', handleLogout);

// Signup POST route
router.post('/signup', handleSignup);

module.exports = router;
