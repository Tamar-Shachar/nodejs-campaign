const express = require('express');
const router = express.Router();

const donatores = [{ id: "1", firstname: "TLV",lastname:"ikkuj",phone:"89796", groupId: 3,goal:222},{ id: "1", firstname: "TLV",lastname:"ikkuj",phone:"89796", groupId: 3,goal:222}]
//get all
router.get('/', (req, res) => {
    res.json(donatores);
})
router.get('/:donatiresId', (req, res) => {
    res.json(donatores);
})

router.post('/',  (req, res) => {
    //calculate the id of the new object
    //push to server
    res.json('item added succesfully');
})

router.put('/:donatiresId',  (req, res) => {
    //find the updated element
    //update the element
    res.json('item updated succesfully');
})

router.delete('/:donatiresId', (req, res) => {
    res.end('deleted' + req.params.flightId);
    //flights.splice(/)
})

// function addOrUpdate(req, res, next) {
//     console.log('something new or updated arrived');
//     //some common code for both post an put
//     next();//seperate code for post and put
// }

module.exports = router;