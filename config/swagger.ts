import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { swaggerSpec } from "./swaggerOptions";

const setupSwagger = (app: Express): void => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;