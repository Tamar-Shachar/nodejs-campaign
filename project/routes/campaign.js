const express = require('express');
const router = express.Router({ mergeParams: true });
const campaignService = require('../services/campaignService');
const groups = require('./groups');
const donations = require('./donations');
const errorMiddlware = require('../middlewares/errorMiddlware')
const { campaignValidationSchema } = require("../models/campaignModels")

// Validation middleware
const validateCampaign = (req, res, next) => {
    const { error } = campaignValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

// GET all campaigns
router.get('/', async (req, res, next) => {
    try {
        const campaigns = await campaignService.getCampaigns();
        res.json(campaigns);
    } catch (err) {
        next(err);
    }
});

// GET campaign by ID
router.get('/:campaignId', async (req, res, next) => {
    try {
        const campaignId = req.params.campaignId;
        const campaign = await campaignService.getCampaignById(campaignId);

        if (!campaign) {
            return res.status(404).json({ error: 'Campaign not found' });
        }
        res.json(campaign);
    } catch (err) {
        next(err);
    }
});

// Create a new campaign
router.post('/', validateCampaign, async (req, res, next) => {
    try {
        await campaignService.createCampaign(req.body);
        res.json('Item added successfully');
    } catch (err) {
        next(err);
    }
});

// Update a campaign
router.put('/:campaignId', validateCampaign, async (req, res, next) => {
    try {
        const campaignId = req.params.campaignId;
        await campaignService.updateCampaign(campaignId, req.body);
        res.json('Item updated successfully');
    } catch (err) {
        next(err);
    }
});

// Mount sub-routers
const BASE_URL = '/:campaignId';
router.use(`${BASE_URL}/groups`, groups);
router.use(`${BASE_URL}/donations`, donations);

// Error handling middleware (catch-all)
router.use(errorMiddlware);

module.exports = router;