import JwtUtils from "../utils/jwt.utils.ts";
import {env} from "../config/environment.ts";
import {conflictError, notFoundError, unauthorizedError} from "../utils/error.utils.ts";
import type {Request, Response, NextFunction} from "express";
import logger from "../utils/logger.utils.ts";
import {prisma} from "../lib/prisma.ts";

class AuthMiddleware {
    async protect(req: Request, res: Response, next: NextFunction) {
        try {
            const {accessToken} = req.cookies;

            if (!accessToken) {
                return next(unauthorizedError("Unauthorized access - token not found"));
            }

            const {userId} = JwtUtils.verifyAccessToken(accessToken);

            const user = await prisma.user.findUnique({where: {id: userId}});

            if (!user) {
                return next(unauthorizedError("Unauthorized access - user not found"));
            }

            req.user = user;
            next();
        } catch (error) {
            logger.error("Error in protect middleware", error);
            next(error);
        }
    }
}

export default new AuthMiddleware();
