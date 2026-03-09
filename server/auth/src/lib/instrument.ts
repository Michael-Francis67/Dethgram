import * as Sentry from "@sentry/node";
import {env} from "../config/environment.ts";

Sentry.init({
    dsn: env.SENTRY_DSN,
    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    sendDefaultPii: true,
});
