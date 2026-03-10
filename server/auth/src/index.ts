import "dotenv/config";
import "./lib/instrument.ts";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import * as Sentry from "@sentry/node";
import logger from "./utils/logger.utils.ts";
import {env} from "./config/environment.ts";
import {Database} from "./config/database.ts";
import {ErrorHandler} from "./utils/error.utils.ts";
import {securityMiddleware} from "./middlewares/security.middleware.ts";
import authRoutes from "./routes/auth.route.ts";
import EmailService from "./services/email.service.ts";

const app = express();
const port = env.PORT;

app.use(cors());
app.use(securityMiddleware);
app.use(morgan("combined"));
app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({extended: true, limit: "10mb"}));

app.get("/health", (req, res) => {
    res.status(200).json({status: "ok", timestamp: new Date().toISOString(), uptime: process.uptime(), ip: req.ip});
});

app.use("/api/auth", authRoutes);

Sentry.setupExpressErrorHandler(app);

app.use(ErrorHandler);

Database.prototype.connect().then(() => {
    app.listen(port, () => {
        logger.info(`Auth service is running on port ${port}`);
    });
    EmailService.sendWelcomeEmail("michaelthemastercoder@gmail.com", "Michael", "https://dethgram.vercel.app/");
});
