const express = require('express')
//const logger = require('./middlewares/logger');
const groups = require('./routes/groups');
const donations = require('./routes/donations');
const matching = require('./routes/matching');
const donatores = require('./routes/donatores');


const app = express();

//app.use(express.static('pages'));//127.0.0.1:3000/pages/mySwagger.html
app.use(express.json());

//app.use(logger('begin'));

app.get('/', (req, res) => {
    res.send('<h1>Some Headers</h1>')
})

app.use('/api/groups', groups);
app.use('/api/donations', donations);
app.use('/api/donatores', donatores);
app.use('/api/matching', matching);

//app.use(logger('end'));//will apply this middlware only if the response was not closed before
app.listen(3000, () => {
    console.log('server is up and running')
})