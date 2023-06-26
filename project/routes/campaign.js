const express = require('express');
const router = express.Router({mergeParams: true});
const campaignService = require('../services/campaignService');

// const fundRaiseres = [{ id: "1", firstname: "TLV",lastname:"ikkuj",phone:"89796", campaignId: 3,goal:222},{ id: "1", firstname: "TLV",lastname:"ikkuj",phone:"89796", campaignId: 3,goal:222}]
//get all
router.get('/', async (req, res) => {
    res.json(await campaignService.getCampaigns());
})
router.get('/:campaignId', async (req, res) => {
    res.json(await campaignService.getCampaignById(req.params.campaignId));
})

router.post('/', async (req, res) => {
    await campaignService.createCampaign(req.body);
    res.json('item added succesfully');
})

router.put('/:campaignId', async (req, res) => {
    await campaignService.updateCampaign(req.params.campaignId, req.body);
    res.json('item updated succesfully');
})


module.exports = router;