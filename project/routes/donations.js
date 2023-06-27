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
router.get('/', async (req, res, next) => {
    try {
        const donations = await donationService.getDonations(req.params.fundRaiserId);
        res.json(donations);
    } catch (err) {
        next(err);
    }
});

// GET donation by ID
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