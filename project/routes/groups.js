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
router.get('/', async (req, res, next) => {
    try {
        const groups = await groupService.getGroups(req.params.campaignId);
        res.json(groups);
    } catch (err) {
        next(err);
    }
});

// GET group by ID
router.get('/:groupId', async (req, res, next) => {
    try {
        const group = await groupService.getGroupById(req.params.campaignId, req.params.groupId);
        res.json(group);
    } catch (err) {
        next(err);
    }
});

// Create a new group
router.post('/', validateGroup, async (req, res, next) => {
    try {
        await groupService.createGroup(req.body);
        res.json('Item added successfully');
    } catch (err) {
        next(err);
    }
});

// Update a group
router.put('/:groupId', validateGroup, async (req, res, next) => {
    try {
        await groupService.updateGroup(req.params.groupId, req.body);
        res.json('Item updated successfully');
    } catch (err) {
        next(err);
    }
});

// Delete a group
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