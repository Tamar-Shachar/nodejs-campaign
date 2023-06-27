const express = require('express');
// const swaggerUi = require('swagger-ui-express')
// const swaggerFile = require('./swagger_output.json')
const { connect, disconnect } = require('./models/db');


require('dotenv').config();
const errorMiddlware = require('./middlewares/errorMiddlware');
const groups = require('./routes/groups');
const donations = require('./routes/donations');
const campaign = require('./routes/campaign');
const fundRaiseres = require('./routes/fundRaiser');

const HOST_NAME = process.env.HOST_NAME | '127.0.0.1';
const PORT = process.env.PORT | 3000;
const BASE_URL = process.env.BASE_URL;
const app = express({ mergeParams: true });


app.use(express.json());
connect();

//app.use(logger('begin'));


// app.use(`${BASE_URL}groups`, groups);
// app.use(`${BASE_URL}donations`, donations);

// app.use('/api/campaign/:campaignId/fundRaiseres/:fundRaiseresId/donations', donations);
// app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// app.use(`/api/fundRaiseres`, fundRaiseres);

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Campaign API',
            version: '1.0.0',
        },
        servers: [
            {
                url: '/', // Set your base URL here
            },
        ],
    },
    apis: ['./routes/*.js'], // Specify the path to your route files
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



app.use(BASE_URL, campaign);
app.use(errorMiddlware);

app.listen(PORT, HOST_NAME, () => {
    console.log('server is up and running');

})
// process.on("unhandledRejection", err => {
//     console.log(`An error occurred: ${err.message}`);
//     disconnect();
//     server.close(() => process.exit(1))
// }
// )