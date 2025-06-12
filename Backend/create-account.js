require('dotenv').config();

const mongoURI = process.env.DATABASE_URL;

const mongoose = require('mongoose');
mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

require('./model/DonorAccount.js');
require('./model/RecipientAccount.js');
const DonorAccount = mongoose.model('donorAccounts');
const RecipientAccount = mongoose.model('recipientAccounts');

const bcrypt = require('bcryptjs');

async function createDonorAccount(req, res) {
const error = [];
const {
    rUsername, rPassword, rFirstName, rLastName, rAge, rPhoneNo, rPasswordChecked,
    rAddress, rDisease, rBloodType, rGender, rGenotype, rSugarLevel, rPcv, rSecurityAnswer
} = req.body;

try {
    const existingUser = await DonorAccount.findOne({ username: rUsername });

    if (existingUser) {
        error.push("Username already exists");
    } else if(rPassword != rPasswordChecked) {
        error.push("Passwords do not match")
    }  else if(rSugarLevel > 125 ) {
        error.push("Unable to register, your sugar level is too high, please contact your doctor")
    } else if (rGender === "Male" && rPcv < 40) {
        error.push("Unable to register, your PCV is too low");
    } else if (rGender === "Male" && rPcv < 40) {
        error.push("Unable to register, your PCV is too low");
    } else if (rGender === "Male" && rPcv > 54) {
        error.push("Unable to register, your PCV is too high");
    } else if(rGender === "Female" && rPcv < 37) {
        error.push("Unable to register, your PCV is too low")
    } else if(rGender === "Female" && rPcv > 48) {
        error.push("Unable to register, your PCV is too high")
    } else if(rBloodType === "Unknown") {
        error.push("Unable to register, Invalid blood type")
    } else if(rGenotype === "Unknown") {
        error.push("Unable to register, Invalid genotype")
    } else if(rGender === "Unknown") {
        error.push("Unable to register, Invalid gender")
    }

    if (error.length > 0) {
        return res.status(409).send({ msg: error });
    }

    const hashedPassword = await bcrypt.hash(rPassword, 10);
    const hasedAnswer = await bcrypt.hash(rSecurityAnswer, 10)

    const newAccount = new DonorAccount({
        username: rUsername,
        password: hashedPassword,
        firstName: rFirstName,
        lastName: rLastName,
        age: rAge,
        phoneNo: rPhoneNo,
        address: rAddress,
        disease: rDisease,
        gender: rGender,
        genotype: rGenotype,
        sugarLevel: rSugarLevel,
        pcv: rPcv,
        securityAnswer: hasedAnswer,
        bloodType: rBloodType,
        lastAuth: Date.now(),
    });

    await newAccount.save();

    res.status(200).send({ msg: "Your account has been created!" });
    console.log("Donor account created!");
} catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Internal server error" });
}
}


async function createRecipientAccount(req, res) {
const error = [];
const {
    rUsername, rPassword, rFirstName, rLastName, rAge, rPhoneNo, rPasswordChecked,
    rAddress, rDisease, rBloodType, rGender, rGenotype, rSugarLevel, rPcv, rSecurityAnswer
} = req.body;

try {
    const existingUser = await RecipientAccount.findOne({ username: rUsername });

    if (existingUser) {
        error.push("Username already exists");
    } else if(rPassword != rPasswordChecked) {
        error.push("Passwords do not match")
    } else if (rGender === "Male" && rPcv < 40) {
        error.push("Unable to register, your PCV is too low");
    } else if (rGender === "Male" && rPcv < 40) {
        error.push("Unable to register, your PCV is too low");
    } else if (rGender === "Male" && rPcv > 54) {
        error.push("Unable to register, your PCV is too high");
    } else if(rGender === "Female" && rPcv < 37) {
        error.push("Unable to register, your PCV is too low")
    } else if(rGender === "Female" && rPcv > 48) {
        error.push("Unable to register, your PCV is too high")
    } else if(rSugarLevel > 125 ) {
        error.push("Unable to register, your sugar level is too high, please contact your doctor")
    } else if(rBloodType === "Unknown") {
        error.push("Unable to register, Invalid blood type")
    } else if(rGenotype === "Unknown") {
        error.push("Unable to register, Invalid genotype")
    } else if(rGender === "Unknown") {
        error.push("Unable to register, Invalid gender")
    }

    if (error.length > 0) {
        return res.status(409).send({ msg: error });
    }

    const hashedPassword = await bcrypt.hash(rPassword, 10);
    const hasedAnswer = await bcrypt.hash(rSecurityAnswer, 10)

    const newAccount = new RecipientAccount({
        username: rUsername,
        password: hashedPassword,
        firstName: rFirstName,
        lastName: rLastName,
        age: rAge,
        phoneNo: rPhoneNo,
        address: rAddress,
        disease: rDisease,
        gender: rGender,
        genotype: rGenotype,
        securityAnswer: hasedAnswer,
        sugarLevel: rSugarLevel,
        pcv: rPcv,
        bloodType: rBloodType,
        lastAuth: Date.now(),
    });

    await newAccount.save();

    res.status(200).send({ msg: "Your account has been created!" });
    console.log("Donor account created!");
} catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Internal server error" });
}
}

async function getAllDonors(req, res) {
    try {
        const donors = await DonorAccount.find();
        if (donors.length === 0) return res.status(200).json([]);
        return res.status(200).json(donors);
    } catch (err) {
        console.error(err)
        res.status(500).json({
            msg: 'Server error',
            error: err.message
        });
    }
}

async function getAllRecipients(req, res) {
    try {
        const recipients = await RecipientAccount.find();
        if (recipients.length === 0) return res.status(200).json([]);
        return res.status(200).json(recipients);
    }
    catch (err) {
        console.error(err)
        res.status(500).json({
            msg: 'Server error',
            error: err.message
        });
    }
}

async function updateDonorProfile(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedUser = await DonorAccount.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedUser) {
        return res.status(404).json({ msg: "Donor Account not found" });
    }

    res.status(200).json({ msg: "Profile updated successfully", user: updatedUser });
    console.log("Profile updated successfully", updatedUser)
} catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
}}

async function updateRecipientProfile(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
  
      const updatedUser = await RecipientAccount.findByIdAndUpdate(id, updates, { new: true });
  
      if (!updatedUser) {
          return res.status(404).json({ msg: "Recipient Account not found" });
      }
  
      res.status(200).json({ msg: "Profile updated successfully", user: updatedUser });
      console.log("Profile updated successfully", updatedUser)
  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Server error" });
  }}
  


module.exports = {
    createDonorAccount: createDonorAccount,
    createRecipientAccount: createRecipientAccount,
    getAllDonors: getAllDonors,
    getAllRecipients: getAllRecipients,
    updateDonorProfile: updateDonorProfile,
    updateRecipientProfile: updateRecipientProfile
}