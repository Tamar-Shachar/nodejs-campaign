const mongoose = require('mongoose');

const matchingSchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    members: { type: Number, required: true },
    director: {
        name: { type: String, required: true }
    },
    dateEnd: { type: String, required: true },
    goal: { type: Number, required: true }
})

const Matching = new mongoose.model('matching', matchingSchema);

module.exports =  Matching ;