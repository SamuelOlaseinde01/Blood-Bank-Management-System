require('dotenv').config();

const mongoURI = process.env.DATABASE_URL;

const mongoose = require('mongoose');
const { request } = require('./blood-requests.js');
mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

require('./model/DonorDonation.js');
require('./model/BloodStock.js');
const BloodStock = mongoose.model('bloodStocks');
const DonorDonations = mongoose.model('donorDonations');


async function donate(req, res) {
    const error = []
    const {
    rUsername, rPhoneNo, 
    rDisease, rBloodType, rGenotype, rBloodUnit, rStatus, rDate, rSugarLevel, rGender, rPcv} = req.body;

    try {
        
        if(rSugarLevel > 125 ) {
            error.push("Unable to donate, your sugar level is too high, please contact your doctor")
        } else if (rGender === "Male" && rPcv < 40) {
            error.push("Unable to donate, your PCV is too low");
        } else if (rGender === "Male" && rPcv < 40) {
            error.push("Unable to donate, your PCV is too low");
        } else if (rGender === "Male" && rPcv > 54) {
            error.push("Unable to donate, your PCV is too high");
        } else if(rGender === "Female" && rPcv < 37) {
            error.push("Unable to donate, your PCV is too low")
        } else if(rGender === "Female" && rPcv > 48) {
            error.push("Unable to donate, your PCV is too high")
        }

    if (error.length > 0) {
        return res.status(409).send({ msg: error });
    }
    const newAccount = new DonorDonations({
        username: rUsername,
        bloodUnit: rBloodUnit,
        status: rStatus,
        phoneNo: rPhoneNo,
        disease: rDisease,
        genotype: rGenotype,
        bloodType: rBloodType,
        gender: rGender,
        sugarLevel: rSugarLevel,
        pcv: rPcv,
        dates: rDate,
        lastAuth: Date.now()
    });

    await newAccount.save();

    res.status(200).send({ msg: "Donation successful!" });
    console.log("Donation successful!");
} catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Internal server error" });
}
}

async function getDonations(req, res) {
    try {
        const donation = await DonorDonations.find({ username: req.params.username });
        if (donation.length === 0) return res.status(200).json([]);
        return res.status(200).json(donation);
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: "Internal server error" });
    }
}

async function getAllDonations(req, res) {
    try {
        const donations = await DonorDonations.find();
        if (donations.length === 0) return res.status(200).json([]);
        return res.status(200).json(donations);
    }
    catch(err) {
        console.error(err);
        res.status(500).send({ msg: "Internal server error" });
    }
}

async function updateDonationStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const donation = await DonorDonations.findById(id);
    console.log(donation)
    if (!donation) return res.status(404).json({ error: "Donation not found" });

    if (status === "Accepted" && donation.status !== "Accepted") {
      await BloodStock.updateOne(
        { type: donation.bloodType },
        { $inc: { units: donation.bloodUnit } }
      );
    }

    donation.status = status;
    await donation.save();
    if(status === "Accepted") {
        res.status(200).json({ message: `Blood stock updated, ${donation.bloodUnit}ml added to ${donation.bloodType} stock`, donation });
    } else if (status === "Rejected") {
        res.status(200).json({ message: `Blood donation rejected`, request })
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getPendingDonations(req, res) {
    try {
        const count = await DonorDonations.countDocuments({ status: "Pending" });
        res.status(200).json({count});
    } catch (err) {
        res.status(500).json({ error: "Failed to get pending count" });
    }
}

async function getPendingUserDonations(req, res) {
    const { username } = req.query;
    console.log(username)

    try {
        const query = { status: "Pending" };

        if (username) {
            query.username = username;
        }

        const count = await DonorDonations.countDocuments(query);
        res.json({ count });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

async function getAcceptedUserDonations(req, res) {
    const { username } = req.query;
    console.log(username)

    try {
        const query = { status: "Accepted" };

        if (username) {
            query.username = username;
        }

        const count = await DonorDonations.countDocuments(query);
        res.json({ count });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

async function getRejectedUserDonations(req, res) {
    const { username } = req.query;
    console.log(username)

    try {
        const query = { status: "Rejected" };

        if (username) {
            query.username = username;
        }

        const count = await DonorDonations.countDocuments(query);
        res.json({ count });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

async function getLastDonation(req, res) {
    try {
        const { username } = req.params;
    
        // Find all requests by username, sort by lastAuth (real Date), most recent first
        const lastDonation = await DonorDonations
            .find({ username })
            .sort({ lastAuth: -1 })  // sort by Date descending
            .limit(1);               // get only the latest one
    
            res.status(200).json(lastDonation[0] || null);
        } catch (err) {
            res.status(500).json({ error: "Failed to fetch last donation." });
        }
}


module.exports = {
    donate: donate,
    getDonations: getDonations,
    getAllDonations: getAllDonations,
    updateDonationStatus: updateDonationStatus,
    getPendingDonations: getPendingDonations,
    getPendingUserDonations: getPendingUserDonations,
    getAcceptedUserDonations: getAcceptedUserDonations,
    getRejectedUserDonations: getRejectedUserDonations,
    getLastDonation: getLastDonation
}