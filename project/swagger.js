const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/donations.js']

swaggerAutogen(outputFile, endpointsFiles)