// routes/restaurantRouter.js
const express = require('express');
const router = express.Router();
const { restaurantDashboard, showInventoryUpdateForm, updateInventory } = require('../controllers/restaurantController');

// Middleware to ensure user is authenticated and has the restaurant_owner role
const isRestaurantOwner = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'restaurant_owner') {
    return next();
  }
  res.redirect('/login'); // Redirect to login if not authenticated or not a restaurant owner
};

// Restaurant owner dashboard route
router.get('/dashboard', isRestaurantOwner, restaurantDashboard);

// Inventory update form route
router.get('/updateinventory', isRestaurantOwner, showInventoryUpdateForm);

// Inventory update route
router.post('/updateinventory', isRestaurantOwner, updateInventory);

module.exports = router;
