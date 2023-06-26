// const swaggerAutogen = require('swagger-autogen')()

// const outputFile = './swagger_output.json'
// const endpointsFiles = ['./routes/donations.js']

// swaggerAutogen(outputFile, endpointsFiles)

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Your API Documentation',
        version: '1.0.0',
      },
      servers: [
        {
          url: 'http://localhost:3000', // Replace with your server URL
        },
      ],
    },
    apis: ['path/to/your/routes/file.js'], // Replace with the actual path to your routes file
  };
  
  const swaggerSpec = swaggerJSDoc(swaggerOptions);
  router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));