const mongoose = require('mongoose');
const Joi = require('joi');

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
        email: {
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
    },
    currentAmount: {
        type: Number,
        required: true,
        default: 0
    }

})

const campaignValidationSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    director: Joi.object({
        id: Joi.string().required(),
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        phone: Joi.string(),
        email: Joi.string()
    }).required(),
    dateEnd: Joi.date().required(),
    target: Joi.number().required(),
    currentAmount: Joi.number().optional()
});

const Campaign = new mongoose.model('campaigns', campaignSchema);


module.exports = {
    Campaign,
    campaignValidationSchema
};
