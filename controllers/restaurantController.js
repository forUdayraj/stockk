// controllers/restaurantController.js
const Restaurant = require('../models/restaurant');
const Inventory = require('../models/inventory');

exports.restaurantDashboard = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ 'owner.id': req.user._id }).populate('inventory');
    res.render('restaurant/dashboard', { restaurant });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.showInventoryUpdateForm = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ 'owner.id': req.user._id }).populate('inventory');
    res.render('restaurant/updateInventory', { restaurant });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    const inventory = await Inventory.findById(itemId);

    if (!inventory) {
      return res.status(404).send('Inventory item not found');
    }

    inventory.quantity = quantity;
    await inventory.save();
    
    res.redirect('/restaurant/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
