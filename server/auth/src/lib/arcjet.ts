import arcjet, {shield, detectBot, tokenBucket} from "@arcjet/node";
import {env} from "../config/environment.ts";

export const aj = arcjet({
    key: env.ARCJET_KEY,
    rules: [
        shield({
            mode: env.NODE_ENV === "production" ? "LIVE" : "DRY_RUN",
        }),

        detectBot({
            mode: env.NODE_ENV === "production" ? "LIVE" : "DRY_RUN",
            allow: [
                "CATEGORY:SEARCH_ENGINE",
                "CATEGORY:MONITOR", // Uptime monitors
                "CATEGORY:PREVIEW",
            ],
        }),

        tokenBucket({
            characteristics: ["ip.src"],
            mode: env.NODE_ENV === "production" ? "LIVE" : "DRY_RUN",
            refillRate: 5,
            interval: "60s",
            capacity: 20,
        }),
    ],
});
