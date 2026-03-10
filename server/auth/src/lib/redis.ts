import {createClient} from "redis";
import {env} from "../config/environment.ts";

const redisClient = createClient({
    url: env.REDIS_URL,
});

export {redisClient};
