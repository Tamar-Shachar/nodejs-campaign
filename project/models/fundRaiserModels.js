const mongoose = require('mongoose');
const Joi = require('joi');

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

const fundRaiserValidationSchema = Joi.object({
    id: Joi.string().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    phone: Joi.string(),
    groupId: Joi.string().required(),
    target: Joi.number().required(),
    currentAmount: Joi.number().optional()
});

const FundRaiser = new mongoose.model('fundRaisers', fundRaiserSchema);
module.exports = {
    FundRaiser,
    fundRaiserValidationSchema
};

