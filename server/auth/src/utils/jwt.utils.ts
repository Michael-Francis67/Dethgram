import jwt from "jsonwebtoken";
import {env} from "../config/environment.ts";
import logger from "./logger.utils.ts";

class JwtUtils {
    static generateAccessToken(userId: string): string {
        return jwt.sign({userId}, env.ACCESS_TOKEN_SECRET, {
            expiresIn: env.ACCESS_TOKEN_EXPIRATION as "15m",
            issuer: env.JWT_ISSUER,
            audience: env.JWT_AUDIENCE,
            algorithm: "HS512",
        });
    }

    static generateRefreshToken(userId: string): string {
        return jwt.sign({userId}, env.REFRESH_TOKEN_SECRET, {
            expiresIn: env.REFRESH_TOKEN_EXPIRATION as "7d",
            issuer: env.JWT_ISSUER,
            audience: env.JWT_AUDIENCE,
            algorithm: "HS512",
        });
    }

    static generateTokens(userId: string): {accessToken: string; refreshToken: string} {
        const accessToken = this.generateAccessToken(userId);
        const refreshToken = this.generateRefreshToken(userId);
        return {accessToken, refreshToken};
    }

    static verifyAccessToken(token: string): {userId: string} {
        try {
            return jwt.verify(token, env.ACCESS_TOKEN_SECRET, {
                issuer: env.JWT_ISSUER,
                audience: env.JWT_AUDIENCE,
                algorithms: ["HS512"],
            }) as {userId: string};
        } catch (error) {
            logger.error("Invalid access token:", error);
            throw new Error("Invalid access token");
        }
    }

    static verifyRefreshToken(token: string): {userId: string} {
        try {
            return jwt.verify(token, env.REFRESH_TOKEN_SECRET, {
                issuer: env.JWT_ISSUER,
                audience: env.JWT_AUDIENCE,
                algorithms: ["HS512"],
            }) as {userId: string};
        } catch (error) {
            logger.error("Invalid refresh token:", error);
            throw new Error("Invalid refresh token");
        }
    }

    static decodeToken(token: string): {userId: string} {
        try {
            return jwt.decode(token) as {userId: string};
        } catch (error) {
            logger.error("Failed to decode token:", error);
            throw new Error("Failed to decode token");
        }
    }
}

export default JwtUtils;
