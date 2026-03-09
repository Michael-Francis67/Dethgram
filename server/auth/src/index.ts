import "dotenv/config";
import "./lib/instrument.ts";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import * as Sentry from "@sentry/node";
import logger from "./utils/logger.utils.ts";
import {env} from "./config/environment.ts";

const app = express();
const port = env.PORT;

app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({extended: true, limit: "10mb"}));

app.get("/health", (req, res) => {
    res.status(200).json({status: "ok", timestamp: new Date().toISOString(), uptime: process.uptime(), ip: req.ip});
});

Sentry.setupExpressErrorHandler(app);

app.listen(port, () => {
    logger.info(`Server is running on port ${port} in ${env.NODE_ENV} mode`);
});
