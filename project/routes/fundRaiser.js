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
/**
 * @swagger
 * /groups/{groupId}/fundraisers:
 *   get:
 *     summary: Retrieve all fundraisers for a group
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         description: ID of the group
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 */
router.get('/', async (req, res, next) => {
    try {
        const fundRaisers = await fundRaiserService.getFundRaisers(req.params.groupId);
        res.json(fundRaisers);
    } catch (err) {
        next(err);
    }
});

// GET fundRaiser by ID
/**
 * @swagger
 * /groups/{groupId}/fundraisers/{fundRaiserId}:
 *   get:
 *     summary: Retrieve a fundraiser by ID
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         description: ID of the group
 *         schema:
 *           type: string
 *       - in: path
 *         name: fundRaiserId
 *         required: true
 *         description: ID of the fundraiser
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 */
router.get('/:fundRaiserId', async (req, res, next) => {
    try {
        const fundRaiser = await fundRaiserService.getFundRaiserById(req.params.fundRaiserId);
        res.json(fundRaiser);
    } catch (err) {
        next(err);
    }
});

// Create a new fundRaiser
/**
 * @swagger
 * /groups/{groupId}/fundraisers:
 *   post:
 *     summary: Create a new fundraiser for a group
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         description: ID of the group
 *         schema:
 *           type: string
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
router.post('/', validateFundRaiser, async (req, res, next) => {
    try {
        await fundRaiserService.createFundRaiser(req.params.groupId, req.body);
        res.json('Item added successfully');
    } catch (err) {
        next(err);
    }
});

// Update a fundRaiser
/**
 * @swagger
 * /groups/{groupId}/fundraisers/{fundRaiserId}:
 *   put:
 *     summary: Update a fundraiser by ID
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         description: ID of the group
 *         schema:
 *           type: string
 *       - in: path
 *         name: fundRaiserId
 *         required: true
 *         description: ID of the fundraiser
 *         schema:
 *           type: string
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

router.put('/:fundRaiserId', validateFundRaiser, async (req, res, next) => {
    try {
        await fundRaiserService.updateFundRaiser(req.params.fundRaiserId, req.body);
        res.json('Item updated successfully');
    } catch (err) {
        next(err);
    }
});

// Delete a fundRaiser
/**
 * @swagger
 * /groups/{groupId}/fundraisers/{fundRaiserId}:
 *   delete:
 *     summary: Delete a fundraiser by ID
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         description: ID of the group
 *         schema:
 *           type: string
 *       - in: path
 *         name: fundRaiserId
 *         required: true
 *         description: ID of the fundraiser
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 */
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

