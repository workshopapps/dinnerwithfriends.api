const { userRouteDoc } = require('../routes/v1/index');

const swaggerDocumentation  = {
    openapi: "3.0.0",
    info: {
        title: "Dinner With Friends",
        version: "0.0.1",
        description: "Documentation for all endpoints on the Dinner with friensd API"
    },

    servers: [
        {
            url: "http://localhost:8800",
            description: 'local server'
        },
    ],
    tags: [
        {
            name: "User",
            description: "User routes",
        }
    ],
    paths: {
        ...userRouteDoc,
    }
};

module.exports = swaggerDocumentation;