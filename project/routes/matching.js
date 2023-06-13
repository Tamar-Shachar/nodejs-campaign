const express = require('express');
const router = express.Router();

const matching = [{ id: "1", name: "TLV", members: 3, director:{name:"",},dateEnd:"",goal:22,}, { id: "2", name: "NJ", members: 5 }]
//get all
router.get('/', (req, res) => {
    res.json(flights);
})

router.post('/', addOrUpdate, (req, res) => {
    //calculate the id of the new object
    //push to server
    res.json('item added succesfully');
})

router.put('/:flightId', addOrUpdate, (req, res) => {
    //find the updated element
    //update the element
    res.json('item updated succesfully');
})

router.delete('/:flightId', (req, res) => {
    res.end('deleted' + req.params.flightId);
    //flights.splice(/)
})

function addOrUpdate(req, res, next) {
    console.log('something new or updated arrived');
    //some common code for both post an put
    next();//seperate code for post and put
}

module.exports = router;