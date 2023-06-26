const express = require('express');
const router = express.Router({mergeParams: true});
const donationService = require('../services/donationService');


router.get('/', async(req, res) => {
    res.json(await donationService.getDonations(req.params.fundRaiserId));
})
router.get('/:donationId', async(req, res) => {
    //find both ids
    res.json(await donationService.getDonationById(req.params.fundRaiserId,req.params.donationId));
})

router.post('/', async(req, res) => {
    await donationService.createDonation(req.body)
    res.json('item added succesfully');
})

module.exports = router;