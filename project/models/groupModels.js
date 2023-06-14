const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    members: { type: Number, required: true }

})

const Group = new mongoose.model('groups', groupSchema);

module.exports = Group;