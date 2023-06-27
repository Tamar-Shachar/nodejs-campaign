const express = require('express');
const router = express.Router({ mergeParams: true });
const fundRaiserService = require('../services/fundRaiserService');
const donations = require('./donations');
const errorMiddlware = require('../middlewares/errorMiddlware')
const { fundRaiserValidationSchema } = require('../models/fundRaiserModels');

// Validation middleware
const validateFundRaiser = (req, res, next) => {
    const { error } = fundRaiserValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};



// GET all fundRaisers
router.get('/', async (req, res, next) => {
    try {
        const fundRaisers = await fundRaiserService.getFundRaisers(req.params.groupId);
        res.json(fundRaisers);
    } catch (err) {
        next(err);
    }
});

// GET fundRaiser by ID
router.get('/:fundRaiserId', async (req, res, next) => {
    try {
        const fundRaiser = await fundRaiserService.getFundRaiserById(req.params.fundRaiserId);
        res.json(fundRaiser);
    } catch (err) {
        next(err);
    }
});

// Create a new fundRaiser
router.post('/', validateFundRaiser, async (req, res, next) => {
    try {
        await fundRaiserService.createFundRaiser(req.params.groupId, req.body);
        res.json('Item added successfully');
    } catch (err) {
        next(err);
    }
});

// Update a fundRaiser
router.put('/:fundRaiserId', validateFundRaiser, async (req, res, next) => {
    try {
        await fundRaiserService.updateFundRaiser(req.params.fundRaiserId, req.body);
        res.json('Item updated successfully');
    } catch (err) {
        next(err);
    }
});

// Delete a fundRaiser
router.delete('/:fundRaiserId', async (req, res, next) => {
    try {
        await fundRaiserService.deleteFundRaiser(req.params.groupId, req.params.fundRaiserId);
        res.end('Deleted ' + req.params.fundRaiserId);
    } catch (err) {
        next(err);
    }
});

// Error handling middleware (catch-all)
router.use(errorMiddlware);

// Mount sub-router
const BASE_URL = '/:fundRaiserId';
router.use(`${BASE_URL}/donations`, donations);

module.exports = router;

