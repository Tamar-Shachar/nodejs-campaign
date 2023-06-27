// module.exports = function (err, req, res) {
//     console.log('my error middleware')
//     console.log(err);
//     res/*.status(500)*/.send('we have got some trouble 😒 ... try later');
// }

// module.exports = function (err, request, response, next) {
//     console.error(err.stack);
//     response.status(500).send('🏳 קרתה תקלה בלתי צפויה. \nנשתדל לחזור בתשובה בהקדם');
// }

const handleErrors = (err, req, res, next) => {
    console.error('An error occurred:', err);
    res.status(500).json({ error: 'Internal server error' });
};
module.exports = handleErrors