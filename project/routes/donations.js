const express = require('express');
const router = express.Router({ mergeParams: true });
const donationService = require('../services/donationService');
const errorMiddlware = require('../middlewares/errorMiddlware')
const { donationValidationSchema } = require('../models/donationModels');

// Validation middleware
const validateDonation = (req, res, next) => {
    const { error } = donationValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};



// GET all donations
/**
 * @swagger
 * /campaigns/{campaignId}/donations:
 *   get:
 *     summary: Retrieve all donations for a campaign
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
 */
router.get('/', async (req, res, next) => {
    try {
        const donations = await donationService.getDonations(req.params.fundRaiserId);
        res.json(donations);
    } catch (err) {
        next(err);
    }
});

// GET donation by ID
/**
 * @swagger
 * /campaigns/{campaignId}/donations/{donationId}:
 *   get:
 *     summary: Retrieve a donation by ID
 *     parameters:
 *       - in: path
 *         name: campaignId
 *         required: true
 *         description: ID of the campaign
 *         schema:
 *           type: string
 *       - in: path
 *         name: donationId
 *         required: true
 *         description: ID of the donation
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 */
router.get('/:donationId', async (req, res, next) => {
    try {
        const donation = await donationService.getDonationById(
            req.params.fundRaiserId,
            req.params.donationId
        );
        res.json(donation);
    } catch (err) {
        next(err);
    }
});

// Create a new donation
/**
 * @swagger
 * /campaigns/{campaignId}/donations:
 *   post:
 *     summary: Create a new donation for a campaign
 *     parameters:
 *       - in: path
 *         name: campaignId
 *         required: true
 *         description: ID of the campaign
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Donation'
 *     responses:
 *       200:
 *         description: Successful operation
 *       400:
 *         description: Bad request
*/
router.post('/', validateDonation, async (req, res, next) => {
    try {
        await donationService.createDonation(req.body);
        res.json('Item added successfully');
    } catch (err) {
        next(err);
    }
});

// Error handling middleware (catch-all)
router.use(errorMiddlware);

module.exports = router;