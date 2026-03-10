import {StreamChat} from "stream-chat";
import {env} from "../config/environment.ts";
import logger from "../utils/logger.utils.ts";

export class Stream {
    private static instance: StreamChat | null = null;

    public static getInstance(): StreamChat {
        if (!Stream.instance) {
            Stream.instance = new StreamChat(env.STREAM_API_KEY, env.STREAM_API_SECRET);
        }
        return Stream.instance;
    }

    static async upsertStreamUser(userId: string, name: string, image: string) {
        try {
            await this.getInstance().upsertUser({id: userId, name, image});
            logger.info(`Successfully upserted Stream user: ${userId}`);
        } catch (error) {
            logger.error(`Failed to upsert Stream user: ${error}`);
        }
    }

    static async deleteStreamUser(userId: string) {
        try {
            await this.getInstance().deleteUser(userId);
            logger.info(`Successfully deleted Stream user: ${userId}`);
        } catch (error) {
            logger.error(`Failed to delete Stream user: ${error}`);
        }
    }

    static async generateStreamToken(userId: string): Promise<string> {
        try {
            const token = this.getInstance().createToken(userId);
            logger.info(`Successfully generated Stream token for user: ${userId}`);
            return token;
        } catch (error) {
            logger.error(`Failed to generate Stream token for user ${userId}: ${error}`);
            throw error;
        }
    }
}
