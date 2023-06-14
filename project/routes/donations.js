const express = require('express');
const router = express.Router();
const donationService = require('../services/donationService');


router.get('/:fundRaiserId/donations', async(req, res) => {
    res.json(await donationService.getDonation(req.params.fundRaiserId));
})
router.get('/:fundRaiserId/donations/:donationId', async(req, res) => {
    //find both ids
    res.json(await donationService.getDonation(req.params.fundRaiserId,req.params.donationId));
})

router.post('/', async(req, res) => {
    await donationService.createDonation(req.body)
    res.json('item added succesfully');
})

module.exports = router;