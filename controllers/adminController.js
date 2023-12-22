// controllers/adminController.js
const InventoryItem = require('../models/inventory');

const adminDashboard = async (req, res) => {
  try {
    // Fetch all inventory items from the database
    const inventoryItems = await InventoryItem.find();

    // Render the admin dashboard with inventory data
    res.render('adminDashboard', { inventoryItems });
  } catch (error) {
    console.error('Error in adminDashboard:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const approveInventoryUpdate = async (req, res) => {
  const { itemId } = req.params;

  try {
    // Fetch the specific inventory item by ID and update its status
    const inventoryItem = await InventoryItem.findByIdAndUpdate(itemId, { $set: { approved: true } }, { new: true });

    if (!inventoryItem) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }

    res.json({ message: 'Inventory update approved successfully' });
  } catch (error) {
    console.error('Error in approveInventoryUpdate:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  adminDashboard,
  approveInventoryUpdate,
};
