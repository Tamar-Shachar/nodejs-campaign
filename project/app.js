const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const router = require('./routes/donations')

const express = require('express');
require('dotenv').config();
//const logger = require('./middlewares/logger');
const groups = require('./routes/groups');
const donations = require('./routes/donations');
const matching = require('./routes/matching');
const fundRaiseres = require('./routes/fundRaiseres');


const app = express();

//app.use(express.static('pages'));//127.0.0.1:3000/pages/mySwagger.html
app.use(express.json());

//app.use(logger('begin'));


app.use('/api/groups', groups);
app.use('/donations', donations);
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use('/api/fundRaiseres', fundRaiseres);
app.use('/api/matching', matching);

//app.use(logger('end'));//will apply this middlware only if the response was not closed before
app.listen(3000, () => {
    console.log('server is up and running')
})