require('dotenv').config();

const mongoURI = process.env.DATABASE_URL;

require('./model/BloodStock.js');


const mongoose = require('mongoose');
mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

const BloodStock = mongoose.model('bloodStocks');

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

async function seedBloodTypes(req, res) {
  try {
    for (const type of bloodTypes) {
        await BloodStock.updateOne(
          { type: type },
          { $set: { units: 0 } },
          { upsert: true }
        );
      }      
    console.log('✅ Blood types seeded successfully.');
    res.status(200).json({ msg: '✅ Blood types seeded successfully.' });
  } catch (error) {
    console.error('❌ Seeding error:', error);
    res.status(500).json({ msg: '❌ Seeding error', error: error.message });
  }
}

module.exports = {
  seedBloodTypes: seedBloodTypes
};