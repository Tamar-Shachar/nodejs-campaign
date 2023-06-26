const express = require('express');
const router = express.Router({ mergeParams: true });
const campaignService = require('../services/campaignService');
const groups = require('./groups');
const donations = require('./donations');


// Validation middleware
const validateCampaign = (req, res, next) => {
    const { body } = req;

    // Perform validation checks on the campaign data
    // if (!body.name || !body.startDate || !body.endDate) {
    //     return res.status(400).json({ error: 'Invalid campaign data' });
    // }

    // Validation passed, continue to the next middleware or route handler
    next();
};

// Error handling middleware
const handleErrors = (err, req, res, next) => {
    console.error('An error occurred:', err);
    res.status(500).json({ error: 'Internal server error' });
};
/**
 * @swagger
 * tags:
 *   name: Campaigns
 *   description: API endpoints for managing campaigns
 */

/**
 * @swagger
 * /campaigns:
 *   get:
 *     summary: Get all campaigns
 *     tags: [Campaigns]
 *     responses:
 *       200:
 *         description: Successful response
 */

// GET all campaigns
router.get('/', async (req, res) => {
    try {
        const campaigns = await campaignService.getCampaigns();
        res.json(campaigns);
    } catch (err) {
        next(err);
    }
});
/**
 * @swagger
 * /campaigns/{campaignId}:
 *   get:
 *     summary: Get a campaign by ID
 *     tags: [Campaigns]
 *     parameters:
 *       - in: path
 *         name: campaignId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 */
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
/**
 * @swagger
 * /campaigns:
 *   post:
 *     summary: Create a new campaign
 *     tags: [Campaigns]
 *     requestBody:
 *       description: Campaign object to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Specify properties of the campaign object here
 *     responses:
 *       200:
 *         description: Successful response
 */

// Create a new campaign
router.post('/', validateCampaign, async (req, res, next) => {
    try {
        await campaignService.createCampaign(req.body);
        res.json('Item added successfully');
    } catch (err) {
        next(err);
    }
});
/**
 * @swagger
 * /campaigns/{campaignId}:
 *   put:
 *     summary: Update a campaign by ID
 *     tags: [Campaigns]
 *     parameters:
 *       - in: path
 *         name: campaignId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Campaign object to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Specify properties of the campaign object here
 *     responses:
 *       200:
 *         description: Successful response
 * */

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
router.use(`${ BASE_URL }/groups`, groups);
router.use(`${ BASE_URL }/donations`, donations);


// Error handling middleware (catch-all)
router.use(handleErrors);

module.exports = router;
