const mongoose = require('mongoose');

const campaignSchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    // groups: { type: Array, required: true },
    director: {
        name: { type: String, required: true },
        phoneNum: {type: String},
        email: {type: String}
    },
    dateEnd: { type: Date, required: true },
    target: { type: Number, required: true }
})

const Campaign = new mongoose.model('campaign', campaignSchema);

module.exports =  Campaign ;