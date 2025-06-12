require('dotenv').config();

const mongoURI = process.env.DATABASE_URL;

const mongoose = require('mongoose');
mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

require('./model/DonorAccount.js');
require('./model/RecipientAccount.js');
const DonorAccount = mongoose.model('donorAccounts');
const RecipientAccount = mongoose.model('recipientAccounts');

const bcrypt = require('bcryptjs');

async function loginDonorAccount(req, res) {
    var response = {}
    const {rUsername, rPassword} = req.body;

    try {
        const userAccountbyName = await DonorAccount.findOne({username: rUsername});
        if (userAccountbyName == null) {
            res.status(401).json({
                msg: 'Invalid username or password',
                username: null,
                userId: null
            });
        } else {
            bcrypt.compare(rPassword, userAccountbyName.password, (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({
                        msg: 'Server error'
                    });
                    return;
                }
                
                if (result) {
                    res.status(200).json({
                        msg: 'Login successful',
                        username: userAccountbyName.username,
                        userId: userAccountbyName._id
                    });
                    console.log("Login successful")
                } else {
                    res.status(401).json({
                        msg: 'Invalid username or password',
                        username: null,
                        userId: null
                    });
                }
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Server error',
            error: error.message
        });
    }
}


async function loginRecipientAccount(req, res) {
    var response = {}
    const {rUsername, rPassword} = req.body;

    try {
        const userAccountbyName = await RecipientAccount.findOne({username: rUsername});
        if (userAccountbyName == null) {
            res.status(401).json({
                msg: 'Invalid username or password',
                username: null,
                userId: null
            });
        } else {
            bcrypt.compare(rPassword, userAccountbyName.password, (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({
                        msg: 'Server error'
                    });
                    return;
                }
                
                if (result) {
                    res.status(200).json({
                        msg: 'Login successful',
                        username: userAccountbyName.username,
                        userId: userAccountbyName._id
                    });
                    console.log("login successful")
                } else {
                    res.status(401).json({
                        msg: 'Invalid username or password',
                        username: null,
                        userId: null
                    });
                }
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Server error',
            error: error.message
        });
    }
}

async function getDonorAccount(req, res) {
    try {
        const user = await DonorAccount.findOne({username: req.params.username});
        if (!user) return res.status(404).json({ msg: 'User not found' });
        console.log(user)
        return res.json({ user });
    } catch(err) {
        console.error(err)
        res.status(500).json({
            msg: 'Server error',
            error: err.message
        });
    }
}

async function getRecipientAccount(req, res) {
    try {
        const user = await RecipientAccount.findOne({username: req.params.username});
        if (!user) return res.status(404).json({ msg: 'User not found' });
        console.log(user)
        return res.json({ user });
    } catch(err) {
        console.error(err)
        res.status(500).json({
            msg: 'Server error',
            error: err.message
        });
    }
}



module.exports = {
    loginDonorAccount: loginDonorAccount,
    loginRecipientAccount: loginRecipientAccount,

    getDonorAccount: getDonorAccount,
    getRecipientAccount: getRecipientAccount,
}