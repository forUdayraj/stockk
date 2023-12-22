// models/restaurant.js
const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: String,
  owner: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    username: String,
  },
  inventory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Inventory',
    },
  ],
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
