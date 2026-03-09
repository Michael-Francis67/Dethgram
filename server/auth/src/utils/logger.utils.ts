import winston from "winston";
import {env} from "../config/environment.ts";

const logLevels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "white",
};

winston.addColors(colors);

const format = winston.format.combine(
    winston.format.timestamp({format: "YYYY-MM-DD HH:mm:ss:ms"}),
    winston.format.colorize({all: true}),
    winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

const transports = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename: "logs/error.log",
        level: "error",
        maxsize: 5242880, // 5MB
        maxFiles: 5,
    }),
    new winston.transports.File({
        filename: "logs/combined.log",
        maxsize: 5242880, // 5MB
        maxFiles: 5,
    }),
];

const logger = winston.createLogger({
    level: env.NODE_ENV === "development" ? "debug" : "info",
    levels: logLevels,
    format,
    transports,
    exceptionHandlers: [new winston.transports.File({filename: "logs/exceptions.log"})],
    rejectionHandlers: [new winston.transports.File({filename: "logs/rejections.log"})],
});

export default logger;
