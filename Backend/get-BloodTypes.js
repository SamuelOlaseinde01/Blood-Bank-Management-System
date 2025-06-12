require('dotenv').config();
const mongoose = require('mongoose');
require('./model/BloodStock.js');
const BloodStock = mongoose.model('bloodStocks');

async function getBloodStocks(req, res) {
  try {
    const stocks = await BloodStock.find({});
    res.status(200).json(stocks);
  } catch (error) {
    console.error('Error fetching blood stocks:', error);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
}

module.exports = { getBloodStocks: getBloodStocks };
