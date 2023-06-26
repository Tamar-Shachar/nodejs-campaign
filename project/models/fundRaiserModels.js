const mongoose = require('mongoose');

const fundRaiserSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    groupId: {
        type: String,
        required: true,
        // default: 0
    },
    target: {
        type: Number,
        required: true
    },
    currentAmount: {
        type: Number,
        required: true,
        default: 0
    }

})

const FundRaiser = new mongoose.model('donatores', fundRaiserSchema);

module.exports = FundRaiser;