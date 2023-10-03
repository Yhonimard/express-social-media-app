
import swaggerUiExpress from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { Router } from "express";
const routes = Router()


const spec = swaggerJsdoc({
  definition: {
    openapi: "3.0.1",
    info: {
      title: "social media app",
      version: "0.1.0",
      description: "this is a simple social media api",
      contact: {
        email: "yhoni2103@gmail.com",
        name: "yhonimard",
        url: "http://yhonimard.online",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
      {
        url: "https://sosmed.yhonimard.online/api",
        description: "Stg server",
      },
      {
        url: "http://localhost:2000",
        description: "Development server",
      },
    ],
  },
  apis: ["./*.js", "src/routes/*.js"],
});



routes.use("/", swaggerUiExpress.serve, swaggerUiExpress.setup(spec))



const swagger = routes
export default swagger