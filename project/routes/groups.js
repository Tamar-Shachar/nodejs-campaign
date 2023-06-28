const express = require('express');
const router = express.Router({ mergeParams: true });
const groupService = require('../services/groupService');
const fundRaisers = require('./fundRaiser');
const { groupValidationSchema } = require("../models/groupModels");
const errorMiddlware = require('../middlewares/errorMiddlware');

// Validation middleware
const validateGroup = (req, res, next) => {
    const { error } = groupValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};


// GET all groups
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
        const groups = await groupService.getGroups(req.params.campaignId);
        res.json(groups);
    } catch (err) {
        next(err);
    }
});

// GET group by ID
/**
 * @swagger
 * /campaigns/{campaignId}/groups/{groupId}:
 *   get:
 *     summary: Retrieve a group by ID
 *     parameters:
 *       - in: path
 *         name: campaignId
 *         required: true
 *         description: ID of the campaign
 *         schema:
 *           type: string
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
router.get('/:groupId', async (req, res, next) => {
    try {
        const group = await groupService.getGroupById(req.params.campaignId, req.params.groupId);
        res.json(group);
    } catch (err) {
        next(err);
    }
});

// Create a new group
/**
 * @swagger
 * /campaigns/{campaignId}/groups:
 *   post:
 *     summary: Create a new group for a campaign
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
 *             type: "object"
 *     responses:
 *       200:
 *         description: Successful operation
 *       400:
 *         description: Bad request
*/
router.post('/', validateGroup, async (req, res, next) => {
    try {
        await groupService.createGroup(req.body);
        res.json('Item added successfully');
    } catch (err) {
        next(err);
    }
});

// Update a group
/**
 * @swagger
 * /campaigns/{campaignId}/groups/{groupId}:
 *   put:
 *     summary: Update a group by ID
 *     parameters:
 *       - in: path
 *         name: campaignId
 *         required: true
 *         description: ID of the campaign
 *         schema:
 *           type: string
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
router.put('/:groupId', validateGroup, async (req, res, next) => {
    try {
        await groupService.updateGroup(req.params.groupId, req.body);
        res.json('Item updated successfully');
    } catch (err) {
        next(err);
    }
});

// Delete a group
/**
 * @swagger
 * /campaigns/{campaignId}/groups/{groupId}:
 *   delete:
 *     summary: Delete a group by ID
 *     parameters:
 *       - in: path
 *         name: campaignId
 *         required: true
 *         description: ID of the campaign
 *         schema:
 *           type: string
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
router.delete('/:groupId', async (req, res, next) => {
    try {
        await groupService.deleteGroup(req.params.groupId);
        res.json('Item deleted successfully');
    } catch (err) {
        next(err);
    }
});

const BASE_URL = '/:groupId';
router.use(`${BASE_URL}/fundRaisers`, fundRaisers);

// Error handling middleware (catch-all)
router.use(errorMiddlware);

module.exports = router;