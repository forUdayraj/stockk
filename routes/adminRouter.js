// routes/adminRouter.js
const express = require('express');
const router = express.Router();
const { adminDashboard, approveInventoryUpdate } = require('../controllers/adminController');

// Middleware to ensure user is authenticated and has the admin role
const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'admin') {
    return next();
  }
  res.redirect('/login'); // Redirect to login if not authenticated or not an admin
};

// Admin dashboard route
router.get('/dashboard', isAdmin, adminDashboard);

// Inventory update approval route
router.get('/approve-inventory/:itemId', isAdmin, approveInventoryUpdate);

module.exports = router;
