const mongoose = require('mongoose');
const {Schema} = mongoose;

const donorAccountSchema = new Schema({
    username: String,
    password: String,
    passwordChecked: String, 
    firstName: String,
    lastName: String,
    age: Number,
    phoneNo: String,
    gender: String,
    securityAnswer: String,
    genotype: String,
    sugarLevel: Number,
    pcv: Number,
    address: String,
    disease: String,
    bloodType: String,
    lastAuth: Date,
});

mongoose.model('donorAccounts', donorAccountSchema);