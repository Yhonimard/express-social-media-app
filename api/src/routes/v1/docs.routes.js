import { Router } from "express";
import swaggerDocs from "../../config/swagger";
import swaggeruiexpess from "swagger-ui-express"

const routes = Router()
const spec = swaggerDocs()
routes.use("/docs", swaggeruiexpess.serve, swaggeruiexpess.setup(spec, { explorer: true }))
const docsRoutes = routes

export default docsRoutes