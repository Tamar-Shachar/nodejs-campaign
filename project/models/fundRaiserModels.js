const mongoose = require('mongoose');

const fundRaiserSchema = mongoose.Schema({
    id: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: String, required: true },
    groupId: { type: Number, required: true },
    goal: { type: Number, required: true }

})

const FundRaiser = new mongoose.model('sales', fundRaiserSchema);

module.exports = FundRaiser;