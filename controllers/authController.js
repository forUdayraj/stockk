// controllers/authController.js
const passport = require('passport');
const User = require('../models/user');

const showLoginPage = (req, res) => {
  res.render('login');
};

const showSignupPage = (req, res) => {
  res.render('signup');
};

const handleLogin = passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true,
});

const handleLogout = (req, res) => {
  req.logout();
  res.redirect('/');
};

const handleSignup = async (req, res) => {
  const { username, email, name, password } = req.body;
  try {
    const user = await User.register(new User({ username, email, name }), password);

    // Manually log in the user after successful registration
    req.login(user, (err) => {
      if (err) {
        console.error('Error logging in after registration:', err);
        return res.redirect('/login');
      }
      return res.redirect('/dashboard');
    });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.redirect('/signup');
  }
};

module.exports = {
  showLoginPage,
  showSignupPage,
  handleLogin,
  handleLogout,
  handleSignup,
};
