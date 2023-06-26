const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    campaignId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    members: {
        type: Number,
        required: true,
        default: 0 
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

const Group = new mongoose.model('groups', groupSchema);

module.exports = Group;