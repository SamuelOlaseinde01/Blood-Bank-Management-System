const mongoose = require('mongoose');
const {Schema} = mongoose;

const donorDonationSchema = new Schema({
    username: String,
    bloodUnit: Number,
    genotype: String,
    bloodType: String, 
    phoneNo: String,
    disease: String,
    status: String,
    gender: String,
    nextDate: String,
    sugarLevel: Number,
    pcv: Number,
    dates: String,
    lastAuth: Date
});

mongoose.model('donorDonations', donorDonationSchema);