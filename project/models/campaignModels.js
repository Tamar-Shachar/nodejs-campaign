const mongoose = require('mongoose');

const campaignSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    director: {
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
        email:{
            type: String
        }
    },
    dateEnd: {
        type: Date,
        required: true
    },
    target: {
        type: Number,
        required: true
    }

})

const Campaign = new mongoose.model('campaigns', campaignSchema);

module.exports = Campaign;