// src/middleware/security.middleware.ts
import helmet from "helmet";
import {aj} from "../lib/arcjet.ts";
import type {Request, Response, NextFunction} from "express";
import {env} from "../config/environment.ts";

// Combined security middleware
export const securityMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // 1. First apply Helmet headers (always applied)
        helmet({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    styleSrc: ["'self'", "'unsafe-inline'"],
                    scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
                    imgSrc: ["'self'", "data:", "https:"],
                    connectSrc: ["'self'", env.API_URL],
                    fontSrc: ["'self'", "https:", "data:"],
                    objectSrc: ["'none'"],
                    mediaSrc: ["'self'"],
                    frameSrc: ["'none'"],
                },
            },
            // Cross-Origin Embedder Policy
            crossOriginEmbedderPolicy: false, // Set to true if you need COEP
            // Cross-Origin Resource Policy
            crossOriginResourcePolicy: {policy: "cross-origin"},
        });

        // 2. Then apply Arcjet protection (analyzes request)
        const decision = await aj.protect(req, {requested: 5});

        if (decision.isDenied()) {
            if (decision.reason.isShield()) {
                return res.status(403).json({
                    success: false,
                    message: "Request blocked by security shield",
                    reason: "suspicious_activity",
                });
            }

            if (decision.reason.isBot()) {
                return res.status(403).json({
                    success: false,
                    message: "Bot detected and blocked",
                    reason: "bot_detected",
                });
            }

            if (decision.reason.isRateLimit()) {
                return res.status(429).json({
                    success: false,
                    message: "Rate limit exceeded",
                    retryAfter: decision.reason,
                    reason: "rate_limit",
                });
            }
        }

        // 3. Add security headers to response for monitoring
        res.setHeader("X-Security-Layer", "helmet+arcjet");
        res.setHeader("X-Arcjet-Result", decision.reason?.toString() || "allowed");

        next();
    } catch (error) {
        next(error);
    }
};
