require('dotenv').config();
const mongoose = require('mongoose');
const mongoURI = process.env.DATABASE_URL;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

require('./model/BloodStock.js');
const BloodStock = mongoose.model('bloodStocks');

async function addToStock(req, res) {
  try {
    const { type, units } = req.body;

    if (!type || !units) {
      return res.status(404).json({ error: "Blood type and units are required" });
    }

    const updated = await BloodStock.findOneAndUpdate(
      { type },
      { $inc: { units: units } },
      { new: true, upsert: true }
    );

    console.log("updated")

    res.status(200).json({ message: `Blood stock updated, ${units}ml added to ${type}`, stock: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("error")
  }
}

async function removeFromStock(req, res) {
  try {
    const { type, units } = req.body;

    if (!type || !units) {
      return res.status(400).json({ error: "Blood type and units are required" });
    }

    const stock = await BloodStock.findOne({ type });

    if (!stock) {
      return res.status(404).json({ error: "Blood type not found" });
    }

    if (stock.units < units) {
      return res.status(400).json({ error: "Not enough blood in stock" });
    }

    stock.units -= units;
    await stock.save();

    res.status(200).json({ message: `${units}ml removed from ${type}, ${stock.units}ml remaining `, stock });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { addToStock: addToStock, removeFromStock: removeFromStock };
