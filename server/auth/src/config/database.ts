import {prisma} from "../lib/prisma.ts";
import {redisClient} from "../lib/redis.ts";
import logger from "../utils/logger.utils.ts";

export class Database {
    private static instance: Database;

    constructor() {
        if (Database.instance) {
            return Database.instance;
        }

        Database.instance = this;
    }

    async connectPrisma() {
        try {
            await prisma.$connect();
            logger.info("Successfully connected to Prisma.");
        } catch (error) {
            logger.error("Failed to connect to Prisma:", error);
            throw error;
        }
    }

    async connectRedis() {
        try {
            await redisClient.connect();
            logger.info("Successfully connected to Redis.");
        } catch (error) {
            logger.error("Failed to connect to Redis:", error);
            throw error;
        }
    }

    async connect() {
        await this.connectPrisma();
        await this.connectRedis();
        logger.info("All database connections established successfully.");
    }

    async disconnect() {
        await prisma.$disconnect();
        await redisClient.disconnect();
        logger.info("All database connections closed.");
    }
}
