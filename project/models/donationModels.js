const mongoose = require('mongoose');

const donationSchema = mongoose.Schema({
    id: { type: String, required: true },
    donator: {
        name: {
            type: String,
            required: true
        },
        phoneNum: {
            type: String
        },
        email: {
            type: String
        }
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    fundRaiserId: {
        type: String,
        required: true,
        default: 0
    },

})

const Donation = new mongoose.model('donations', donationSchema);

module.exports = Donation;