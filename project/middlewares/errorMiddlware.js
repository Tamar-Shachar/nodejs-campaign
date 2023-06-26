module.exports = function (err, req, res) {
    console.log('my error middleware')
    console.log(err);
    res/*.status(500)*/.send('we have got some trouble 😒 ... try later');
}