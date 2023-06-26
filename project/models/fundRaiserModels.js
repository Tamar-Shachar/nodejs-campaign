const mongoose = require('mongoose');

const fundRaiserSchema = mongoose.Schema({
    id: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: String },
    groupId: { type: String, required: true },
    target: { type: Number, required: true },
    currentAmount: { type: Number, required: true }

})

const FundRaiser = new mongoose.model('donatores', fundRaiserSchema);

module.exports = FundRaiser;