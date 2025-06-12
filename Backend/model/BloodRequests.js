const mongoose = require('mongoose');
const {Schema} = mongoose;

const bloodRequestSchema = new Schema({
    username: String,
    bloodUnit: Number,
    genotype: String,
    bloodType: String, 
    phoneNo: String,
    disease: String,
    status: String,
    gender: String,
    sugarLevel: Number,
    pcv: Number,
    lastAuth: Date,
    dates: String
});

mongoose.model('bloodRequests', bloodRequestSchema);