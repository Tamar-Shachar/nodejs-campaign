const mongoose = require('mongoose');
const Joi = require('joi');

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

const groupValidationSchema = Joi.object({
    id: Joi.string().required(),
    campaignId: Joi.string().required(),
    name: Joi.string().required(),
    members: Joi.number().required(),
    target: Joi.number().required(),
    currentAmount: Joi.number().required()
});

const Group = new mongoose.model('groups', groupSchema);

module.exports = {
    Group,
    groupValidationSchema
};
