import logger from "../utils/logger.utils.ts";
import {badRequestError, conflictError, notFoundError, unauthorizedError} from "../utils/error.utils.ts";
import {prisma} from "../lib/prisma.ts";
import bcrypt from "bcryptjs";
import type {
    DeviceType as IDeviceType,
    loginAttempt as ILoginAttempt,
    User as IUser,
    Device as IDevice,
} from "../generated/prisma/client.ts";
import JwtUtils from "../utils/jwt.utils.ts";
import EmailService from "./email.service.ts";
import {Stream} from "../lib/stream.ts";
import geoip from "geoip-lite";
import crypto from "node:crypto";
import {env} from "../config/environment.ts";

export class AuthService {
    async register(displayName: string, email: string, password: string, deviceInfo: Partial<IDevice>) {
        try {
            const existingUser = await prisma.user.findUnique({where: {email}});
            if (existingUser) {
                throw conflictError("Email already in use");
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const avatar = `https://ui-avatars.com/api/?name=${displayName.split(" ")[0][0]}+${
                displayName.split(" ")[1][0]
            }`;

            const user = await prisma.user.create({
                data: {
                    displayName,
                    email,
                    username: email.split("@")[0],
                    password: hashedPassword,
                    avatarUrl: avatar,
                },
            });

            const device = await prisma.device.create({
                data: {
                    userId: user.id,
                    deviceId: deviceInfo.deviceId || "",
                    type: deviceInfo.type as IDeviceType,
                    os: deviceInfo.os || "",
                    ipAddress: deviceInfo.ipAddress || "8.8.8.8",
                    browser: deviceInfo.browser || "",
                    name: deviceInfo.name || "",
                    lastUsedAt: new Date(),
                },
            });

            const ip = env.NODE_ENV === "production" ? deviceInfo.ipAddress : "8.8.8.8";

            const location = geoip.lookup(ip as string);

            logger.info({location});

            const newLocation = await prisma.location.create({
                data: {
                    userId: user.id,
                    ipAddress: ip!,
                    city: location?.city || "",
                    region: location?.region || "",
                    country: location?.country || "",
                    deviceId: device.id,
                },
            });

            await Stream.upsertStreamUser(user.id, displayName, user.avatarUrl || "");

            const code = crypto.randomInt(100000, 999999);

            await prisma.user.update({
                where: {id: user.id},
                data: {
                    emailVerificationToken: code.toString(),
                    emailVerificationTokenExpiry: new Date(Date.now() + 15 * 60 * 1000),
                },
            });

            EmailService.sendVerificationEmail(email, code, displayName);

            const {accessToken, refreshToken} = JwtUtils.generateTokens(user.id);

            await prisma.session.create({
                data: {
                    token: refreshToken,
                    userId: user.id,
                    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
                    deviceId: device.id,
                },
            });

            return {
                user: {
                    id: user.id,
                    displayName: user.displayName,
                    username: user.username,
                    email: user.email,
                    avatarUrl: user.avatarUrl,
                },
                newLocation,
                accessToken,
                refreshToken,
            };
        } catch (error) {
            logger.error("Failed to register user:", error);
            throw error;
        }
    }

    async verifyEmail(code: string): Promise<Boolean> {
        try {
            if (!code) {
                throw badRequestError("Code is required");
            }

            const user = await prisma.user.findUnique({
                where: {
                    emailVerificationToken: code,
                    emailVerificationTokenExpiry: {
                        gt: new Date(),
                    },
                },
            });

            if (!user) {
                throw notFoundError("Invalid code");
            }

            await prisma.user.update({
                where: {id: user.id},
                data: {
                    isVerified: true,
                    emailVerificationToken: null,
                    emailVerificationTokenExpiry: null,
                },
            });

            EmailService.sendWelcomeEmail(user.email, user.displayName || "John Doe");

            return true;
        } catch (error) {
            logger.error("Failed to verify email:", error);
            throw error;
        }
    }

    async login(
        email: string,
        password: string,
        deviceInfo: Partial<IDevice>,
        loginAttempt: Partial<ILoginAttempt>
    ): Promise<{accessToken: string; refreshToken: string; user: Partial<IUser>}> {
        try {
            const user = await prisma.user.findUnique({
                where: {email},
                include: {loginAttempts: true, devices: true, sessions: true},
            });

            if (!user) {
                throw notFoundError("User not found");
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                throw unauthorizedError("Invalid credentials");
            }

            if (!user.isVerified) {
                throw unauthorizedError("Email not verified");
            }

            await prisma.device.update({
                where: {deviceId: deviceInfo.deviceId || ""},
                data: {
                    lastUsedAt: new Date(),
                },
            });

            await prisma.loginAttempt.create({
                data: {
                    email,
                    success: true,
                    ipAddress: parseInt(deviceInfo.ipAddress || "8.8.8.8"),
                    userAgent: loginAttempt.userAgent || "",
                    userId: user.id,
                },
            });

            if (user.loginAttempts.length >= 5) {
                throw unauthorizedError("Too many login attempts");
            }

            const {accessToken, refreshToken} = JwtUtils.generateTokens(user.id);

            await prisma.user.update({
                where: {id: user.id},
                data: {
                    lastLoginAt: new Date(),
                },
            });

            return {
                user: {
                    id: user.id,
                    displayName: user.displayName,
                    username: user.username,
                    email: user.email,
                    avatarUrl: user.avatarUrl,
                },
                accessToken,
                refreshToken,
            };
        } catch (error) {
            logger.error("Failed to login user:", error);
            throw error;
        }
    }

    async logout(userId: string, deviceId: string): Promise<Boolean> {
        try {
            await prisma.device.update({
                where: {
                    id: deviceId,
                    userId,
                },
                data: {
                    revoked: true,
                    revokedAt: new Date(),
                },
            });

            await prisma.session.delete({
                where: {
                    userId,
                    deviceId,
                },
            });

            return true;
        } catch (error) {
            logger.error("Failed to logout user:", error);
            throw error;
        }
    }

    async logoutAll(userId: string, deviceId: string): Promise<Boolean> {
        try {
            await prisma.device.updateMany({
                where: {
                    userId,
                    id: {
                        not: deviceId,
                    },
                },
                data: {
                    revoked: true,
                    revokedAt: new Date(),
                },
            });

            await prisma.session.deleteMany({
                where: {
                    userId,
                    deviceId: {
                        not: deviceId,
                    },
                },
            });

            return true;
        } catch (error) {
            logger.error("Failed to logout user:", error);
            throw error;
        }
    }

    async forgotPassword(email: string): Promise<{token: string; user: Partial<IUser>}> {
        try {
            const user = await prisma.user.findUnique({
                where: {email},
            });

            if (!user) {
                throw notFoundError("User not found");
            }

            const token = crypto.randomBytes(32).toString("hex");

            await prisma.user.update({
                where: {id: user.id},
                data: {
                    resetPasswordToken: token,
                    resetPasswordTokenExpiry: new Date(Date.now() + 15 * 60 * 1000),
                },
            });

            // TODO: send email

            return {
                token,
                user: {
                    id: user.id,
                    displayName: user.displayName,
                    username: user.username,
                    email: user.email,
                    avatarUrl: user.avatarUrl,
                },
            };
        } catch (error) {
            logger.error("Failed to forgot password:", error);
            throw error;
        }
    }

    async resetPassword(token: string, password: string) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    resetPasswordToken: token,
                    resetPasswordTokenExpiry: {
                        gt: new Date(),
                    },
                },
            });

            if (!user) {
                throw notFoundError("User not found");
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            await prisma.user.update({
                where: {id: user.id},
                data: {
                    password: hashedPassword,
                    resetPasswordToken: null,
                    resetPasswordTokenExpiry: null,
                },
            });
        } catch (error) {
            logger.error("Failed to reset password:", error);
            throw error;
        }
    }
}
