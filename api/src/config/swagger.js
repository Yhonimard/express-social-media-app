import swaggerJSDoc from "swagger-jsdoc";

const swaggerDocs = () => {
  const spec = swaggerJSDoc({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "social media api",
        version: "1.0.0",
        description: "simple doc social media api",
        contact: {
          name: "yhonimard",
          email: "yhoni2103@gmail.com",
        }
      },
      schemes: ["http", "https"],
      basePath: "/",
      components: {
        securitySchemes: {
          "jwt-auth": {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            description: "access token"
          }
        },
        response: {
          UnauthorizedError: { description: "need access token" }
        }
      },
    },
    apis: ["./*.js", "src/routes/v1/*.js"],
  })
  return spec
}

export default swaggerDocs