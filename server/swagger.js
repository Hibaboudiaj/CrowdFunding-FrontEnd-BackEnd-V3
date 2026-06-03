import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Mon API",
            version: "1.0.0",
            description: "Documentation de mon backend Express",
        },
        servers: [{ url: "http://localhost:5000/api" }],
        components: {
            securitySchemes: {
                cookieAuth: {
                    type: "apiKey",
                    in: "cookie",
                    name: "token",
                },
            },
        },
    },
    apis: ["./rotues/*.js", "./rotues/**/*.js"],
};

export default swaggerJsdoc(options);
