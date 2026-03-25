import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

dotenv.config();

import healthRoutes from "./api/v1/routes/healthRoutes";
import eventRoutes from "./api/v1/routes/eventRoutes";

const app: Express = express();

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
    referrerPolicy: { policy: "no-referrer" },
  })
);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/events", eventRoutes);

export default app;