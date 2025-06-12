require('dotenv').config();

const mongoURI = process.env.DATABASE_URL;

const mongoose = require('mongoose');
mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

require('./model/BloodRequests.js');
require('./model/BloodStock.js');

const BloodStock = mongoose.model('bloodStocks');

const BloodRequests = mongoose.model('bloodRequests');


async function request(req, res) {
    const error = []
    const {
    rUsername, rPhoneNo, 
    rDisease, rBloodType, rGenotype, rBloodUnit, rStatus, rDate, rSugarLevel, rGender, rPcv} = req.body;

    try {
        
        if(rSugarLevel > 125 ) {
            error.push("Unable to request, your sugar level is too high, please contact your doctor")
        } else if (rGender === "Male" && rPcv < 40) {
            error.push("Unable to request, your PCV is too low");
        } else if (rGender === "Male" && rPcv < 40) {
            error.push("Unable to request, your PCV is too low");
        } else if (rGender === "Male" && rPcv > 54) {
            error.push("Unable to request, your PCV is too high");
        } else if(rGender === "Female" && rPcv < 37) {
            error.push("Unable to request, your PCV is too low")
        } else if(rGender === "Female" && rPcv > 48) {
            error.push("Unable to request, your PCV is too high")
        }

    if (error.length > 0) {
        return res.status(409).send({ msg: error });
    }
    const newAccount = new BloodRequests({
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

    res.status(200).send({ msg: "Blood request successful" });
    console.log("Blood request successful");
    console.log(newAccount)
} catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Internal server error" });
}
}

async function getRequests(req, res) {
    try {
        const requests = await BloodRequests.find({ username: req.params.username });
        if (requests.length === 0) return res.status(200).json([]);
        return res.status(200).json(requests);
    } catch(err) {
        console.error(err);
        res.status(500).send({ msg: "Internal server error" });
    }
}

async function getAllRequests(req, res) {
    try {
        const requests = await BloodRequests.find();
        if (requests.length === 0) return res.status(200).json([]);
        return res.status(200).json(requests);
    } catch(err) {
        console.error(err);
        res.status(500).send({ msg: "Internal server error" });
    }
}

async function updateRequestStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const request = await BloodRequests.findById(id);
    if (!request) return res.status(404).json({ error: "Request not found" });

    if (status === "Accepted" && request.status !== "Accepted") {
      // Get current blood stock
      const stock = await BloodStock.findOne({ type: request.bloodType });

      if (!stock) {
        return res.status(404).json({ error: `No stock record for blood type ${request.bloodType}` });
      }

      if (stock.units < request.bloodUnit) {
        return res.status(404).json({ error: `Not enough blood available. Requested: ${request.bloodUnit}ml, Available: ${stock.units}ml` });
      }

      // Subtract blood units
      stock.units -= request.bloodUnit;
      await stock.save();
    }

    request.status = status;
    await request.save();
    if(status === "Accepted") {
        res.status(200).json({ message: `Blood stock updated, ${request.bloodUnit}ml removed from ${request.bloodType} stock`, request });
    } else if (status === "Rejected") {
        res.status(200).json({ message: `Blood request rejected`, request })
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getPendingRequests(req, res) {
    try {
        const count = await BloodRequests.countDocuments({ status: "Pending" });
        res.status(200).json({count});
    } catch (err) {
        res.status(500).json({ error: "Failed to get pending count" });
    }
}

async function getPendingUserRequests(req, res) {
    const { username } = req.query;
    console.log(username)

    try {
        const query = { status: "Pending" };

        if (username) {
            query.username = username;
        }

        const count = await BloodRequests.countDocuments(query);
        res.json({ count });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

async function getAcceptedUserRequests(req, res) {
    const { username } = req.query;
    console.log(username)

    try {
        const query = { status: "Accepted" };

        if (username) {
            query.username = username;
        }

        const count = await BloodRequests.countDocuments(query);
        res.json({ count });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

async function getRejectedUserRequests(req, res) {
    const { username } = req.query;
    console.log(username)

    try {
        const query = { status: "Rejected" };

        if (username) {
            query.username = username;
        }

        const count = await BloodRequests.countDocuments(query);
        res.json({ count });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

async function getLastRequest(req, res) {
    try {
    const { username } = req.params;

    // Find all requests by username, sort by lastAuth (real Date), most recent first
    const lastRequest = await BloodRequests
        .find({ username })
        .sort({ lastAuth: -1 })  // sort by Date descending
        .limit(1);               // get only the latest one

        res.status(200).json(lastRequest[0] || null);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch last request." });
    } 
}


module.exports = {
    request: request,
    getRequests: getRequests,
    getAllRequests: getAllRequests,
    updateRequestStatus: updateRequestStatus,
    getPendingRequests: getPendingRequests,
    getPendingUserRequests: getPendingUserRequests,
    getAcceptedUserRequests: getAcceptedUserRequests,
    getRejectedUserRequests: getRejectedUserRequests,
    getLastRequest: getLastRequest
}