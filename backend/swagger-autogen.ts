require('dotenv').config({ path: __dirname + '/.env' });
const swaggerAutogen = require('swagger-autogen')();

const outputFile = './src/config/swagger.json';
const endpointsFiles = ['./src/routes.ts'];

const swaggerConfig = {
    info: {
        title: 'Limbic Therapist',
        description: 'Tarik Seyceri',
    },
    host: 'localhost:' + (process.env.HTTP_PORT || 3000),
    schemes: ['http'],
};

swaggerAutogen(outputFile, endpointsFiles, swaggerConfig);