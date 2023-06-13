const express = require('express');
const router = express.Router();

const donations = [{ id: "1", amount: 200, date: Date.now(), donater: 1 },{ id: "2", amount: 100, date: Date.now(), donater: 2 }]
//get all
router.get('/:id/donations', (req, res) => {
    res.json(donations);
})
router.get('/:donatoresId/donations/:donationId', (req, res) => {
    //find both ids
    res.json();
})

router.post('/', (req, res) => {
    //calculate the id of the new object
    //push to server
    res.json('item added succesfully');
})


module.exports = router;