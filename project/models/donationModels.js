const mongoose = require('mongoose');

const donationSchema = mongoose.Schema({
    id: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    fundRaiser: { type: String, required: true }

})

const Donation = new mongoose.model('sales', donationSchema);

module.exports = Donation;