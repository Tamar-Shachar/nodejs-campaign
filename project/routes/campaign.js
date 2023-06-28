const express = require('express');
const router = express.Router({ mergeParams: true });
const campaignService = require('../services/campaignService');
const groups = require('./groups');
const donations = require('./donations');
const errorMiddlware = require('../middlewares/errorMiddlware')
const { campaignValidationSchema } = require("../models/campaignModels");
const { getCampaignById } = require('../services/campaignService');

// Validation middleware
const validateCampaign = (req, res, next) => {
    const { error } = campaignValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

// GET all campaigns
/**
 * @swagger
 * /campaigns:
 *   get:
 *     summary: Retrieve all campaigns
 *     responses:
 *       200:
 *         description: Successful operation
 */
router.get('/', async (req, res, next) => {
    try {
        const campaigns = await campaignService.getCampaigns();
        if (campaigns instanceof Error) {
            next(err);
        }
        res.json(campaigns);
    } catch (err) {
        next(err);
    }
});

// GET campaign by ID
/**
 * @swagger
 * /campaigns/{campaignId}:
 *   get:
 *     summary: Retrieve a campaign by ID
 *     parameters:
 *       - in: path
 *         name: campaignId
 *         required: true
 *         description: ID of the campaign
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Campaign not found
 */
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
/**
 * @swagger
 * /campaigns:
 *   post:
 *     summary: Create a new campaign
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *     responses:
 *       200:
 *         description: Successful operation
 *       400:
 *         description: Bad request
 */
router.post('/', validateCampaign, async (req, res, next) => {
    try {
        await campaignService.createCampaign(req.body);
        res.json('Item added successfully');
    } catch (err) {
        next(err);
    }
});

// Update a campaign
/**
 * @swagger
 * /campaigns/{campaignId}:
 *   put:
 *     summary: Update a campaign by ID
 *     parameters:
 *       - in: path
 *         name: campaignId
 *         required: true
 *         description: ID of the campaign
 *         schema:
 *             type: "string"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: 'object'
 *     responses:
 *       200:
 *         description: Successful operation
 *       400:
 *         description: Bad request
 */
router.put('/:campaignId', async (req, res, next) => {
    try {
        const campaignId = req.params.campaignId;
        campaign = await campaignService.getCampaignById(campaignId);
        console.log("campaign",campaign);
        const directorId = campaign[0].director.id;
        // campaign.then((a) => {
        //     directorId = a.director.id;
        //   });
        
        // directorId = campaign.director.id;
        if (req.body.directorId == directorId) {
            await campaignService.updateCampaign(campaignId, req.body.target);
            res.json('Item updated successfully');
        }
        else {
            res.status(401).send({ success: false, message: 'only director can update' });
        }
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