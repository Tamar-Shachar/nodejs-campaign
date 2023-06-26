const express = require('express');
const router = express.Router({mergeParams: true});
const groupService = require('../services/groupService');
const fundRaiseres = require('./fundRaiser');

router.get('/', async (req, res) => {
    res.json(await groupService.getGroups(req.params.campaignId));
})
router.get('/:groupId', async (req, res) => {
    res.json(await groupService.getGroupById(req.params.campaignId, req.params.groupId));
})

router.post('/', async (req, res) => {
    try {
        await groupService.createGroup(req.body);
        res.json('item added succesfully');
    }
    catch {
        res.json("error")
    }
})

router.put('/:groupId', async (req, res) => {
    await groupService.updateGroup(req.params.groupId, req.body);
    res.json('item updated succesfully');
})

router.delete('/:groupId', async (req, res) => {
    await groupService.deleteGroup(req.params.groupId);
    res.end('deleted' + req.params.groupId);

})
const BASE_URL = '/:groupId';
router.use(`${BASE_URL}/fundRaisers`, fundRaiseres);

module.exports = router;