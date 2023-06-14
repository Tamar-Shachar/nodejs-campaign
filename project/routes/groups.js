const express = require('express');
const router = express.Router();
const groupService = require('../services/groupService');

// const fundRaiseres = [{ id: "1", firstname: "TLV",lastname:"ikkuj",phone:"89796", groupId: 3,goal:222},{ id: "1", firstname: "TLV",lastname:"ikkuj",phone:"89796", groupId: 3,goal:222}]
//get all
router.get('/', async(req, res) => {
    res.json(await groupService.getGroup());
})
router.get('/:groupId', async(req, res) => {
    res.json(await groupService.getGroupById(req.params.groupId));
})

router.post('/',  async(req, res) => {
    await groupService.createGroup(req.body);
    res.json('item added succesfully');
})

router.put('/:groupId',  async(req, res) => {
    await fundRaiserService.updateFundRaiser(req.body);
    res.json('item updated succesfully');
})

router.delete('/:groupId', async(req, res) => {
    await fundRaiserService.deleteFundRaiser(req.params.groupId);
    res.end('deleted' + req.params.groupId);
    
})



module.exports = router;