require('dotenv').config();

const mongoURI = process.env.DATABASE_URL;

const mongoose = require('mongoose');
mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

require('./model/DonorAccount.js');
require('./model/RecipientAccount.js');
const DonorAccount = mongoose.model('donorAccounts');
const RecipientAccount = mongoose.model('recipientAccounts');

const bcrypt = require('bcryptjs');

async function verifyDonorSecurityAnswer(req, res) {
    const { username, securityAnswer } = req.body;

    try {
        const user = await DonorAccount.findOne({ username });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const isMatch = await bcrypt.compare(securityAnswer, user.securityAnswer);
        if (!isMatch) {
            return res.status(401).json({ msg: 'Incorrect security answer' });
        }

        res.status(200).json({ msg: 'Verification successful', userId: user._id, username: user.username });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
}

async function verifyDonorUsername(req, res) {
    const { username } = req.body;

    try {
        const user = await DonorAccount.findOne({ username });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(200).json({ msg: 'Verification successful', userId: user._id, username: user.username });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
}

async function resetDonorPassword(req, res) {
    const { username, newPassword } = req.body;

    try {
        const user = await DonorAccount.findOne({ username });
        if (!user) {
            return res.status(404).json({ msg: 'User name not found' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ msg: 'Password reset successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
}

async function verifyRecipientUsername(req, res) {
    const { username } = req.body;

    try {
        const user = await RecipientAccount.findOne({ username });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.status(200).json({ msg: 'Verification successful', userId: user._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
}

async function verifyRecipientSecurityAnswer(req, res) {
    const { username, securityAnswer } = req.body;

    try {
        const user = await RecipientAccount.findOne({ username });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const isMatch = await bcrypt.compare(securityAnswer, user.securityAnswer);
        if (!isMatch) {
            return res.status(401).json({ msg: 'Incorrect security answer' });
        }

        res.status(200).json({ msg: 'Verification successful', userId: user._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
}

async function resetRecipientPassword(req, res) {
    const { username, newPassword } = req.body;

    try {
        const user = await RecipientAccount.findOne({ username });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ msg: 'Password reset successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
}


module.exports = {
    verifyDonorUsername: verifyDonorUsername,
    verifyRecipientUsername: verifyRecipientUsername,
    verifyDonorSecurityAnswer: verifyDonorSecurityAnswer,
    verifyRecipientSecurityAnswer: verifyRecipientSecurityAnswer,
    resetDonorPassword: resetDonorPassword,
    resetRecipientPassword: resetRecipientPassword
}
