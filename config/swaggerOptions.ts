import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Event API",
      version: "1.0.0",
      description: "API documentation for Event Management",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
      },
    ],
  },
  apis: ["./src/api/v1/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);