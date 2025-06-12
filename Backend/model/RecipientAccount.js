const mongoose = require('mongoose');
const {Schema} = mongoose;

const recipientAccountSchema = new Schema({  
    username: String,
    password: String,
    passwordChecked: String,
    firstName: String,
    lastName: String,
    age: Number,
    phoneNo: String,
    gender: String,
    genotype: String,
    securityAnswer: String,
    sugarLevel: Number,
    pcv: Number,
    address: String,
    disease: String,
    bloodType: String,
    lastAuth: Date,
});

mongoose.model('recipientAccounts', recipientAccountSchema);