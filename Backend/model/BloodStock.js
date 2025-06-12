const mongoose = require('mongoose');

const bloodStockSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    unique: true
  },
  units: {
    type: Number,
    default: 0
  }
});

mongoose.model('bloodStocks', bloodStockSchema);
