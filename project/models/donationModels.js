const mongoose = require('mongoose');
const Joi = require('joi');

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

const donationValidationSchema = Joi.object({
    id: Joi.string().required(),
    donator: Joi.object({
        name: Joi.string().required(),
        phoneNum: Joi.string(),
        email: Joi.string()
    }).required(),
    amount: Joi.number().required(),
    date: Joi.date().optional(),
    fundRaiserId: Joi.string().optional()
});

const Donation = new mongoose.model('donations', donationSchema);

module.exports = {
    Donation,
    donationValidationSchema
};