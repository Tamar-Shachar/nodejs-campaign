const express = require('express');
const router = express.Router({mergeParams: true});
const fundRaiserService = require('../services/fundRaiserService');
const donations = require('./donations');
// const fundRaiseres = [{ id: "1", firstname: "TLV",lastname:"ikkuj",phone:"89796", groupId: 3,goal:222},{ id: "1", firstname: "TLV",lastname:"ikkuj",phone:"89796", groupId: 3,goal:222}]
//get all
router.get('/', async(req, res) => {
    res.json(await fundRaiserService.getFundRaisers(req.params.campaignId,));
})
router.get('/:fundRaiserId', async(req, res) => {
    res.json(await fundRaiserService.getFundRaiserById(req.params.campaignId, req.params.fundRaiserId));
})

router.post('/',  async(req, res) => {
    await fundRaiserService.createFundRaiser(,req.body);
    res.json('item added succesfully');
})

router.put('/:fundRaiserId',  async(req, res) => {
    await fundRaiserService.updateFundRaiser(req.params.campaignId,req.params.fundRaiserId,req.body);
    res.json('item updated succesfully');
})

router.delete('/:fundRaiserId', async(req, res) => {
    await fundRaiserService.deleteFundRaiser(req.params.campaignId,req.params.fundRaiserId);
    res.end('deleted' + req.params.fundRaiserId);
    
})

const BASE_URL = '/:fundRaiserId';
router.use(`${BASE_URL}/donations`, donations);

module.exports = router;