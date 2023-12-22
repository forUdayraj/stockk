// models/inventory.js
const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },
  approved: { type: Boolean, default: false },
});

const InventoryItem = mongoose.model('InventoryItem', inventorySchema);

module.exports = InventoryItem;
