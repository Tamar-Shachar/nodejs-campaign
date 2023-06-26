const express = require('express');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const { connect } = require('../models/db');


require('dotenv').config();
//const logger = require('./middlewares/logger');
const groups = require('./routes/groups');
const donations = require('./routes/donations');
const campaign = require('./routes/campaign');
const fundRaiseres = require('./routes/fundRaiser');


const app = express({mergeParams: true});

//app.use(express.static('pages'));//127.0.0.1:3000/pages/mySwagger.html
app.use(express.json());

//app.use(logger('begin'));

const BASE_URL = "/api/campaign/:campaignId/";
app.use(`${BASE_URL}groups`, groups);
app.use(`${BASE_URL}donations`, donations);
// app.use('/api/campaign/:campaignId/fundRaiseres/:fundRaiseresId/donations', donations);
// app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(`${BASE_URL}group/:groupId/fundRaiseres`, fundRaiseres);
app.use('/api/campaign', campaign);

//app.use(logger('end'));//will apply this middlware only if the response was not closed before
app.listen(3000, () => {
    connect();
    console.log('server is up and running')
})