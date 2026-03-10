import type {Request, Response, NextFunction} from "express";
import {AuthService} from "../services/auth.service.ts";
import {UAParser, type IResult} from "ua-parser-js";
import {badRequestError, unauthorizedError} from "../utils/error.utils.ts";
import {ApiResponse} from "../utils/api-response.utils.ts";
import {DeviceType as IDeviceType} from "../generated/prisma/enums.ts";
import logger from "../utils/logger.utils.ts";
import {env} from "../config/environment.ts";

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const {displayName, email, password} = req.body;
            let result: IResult = new UAParser(req.headers["user-agent"]).getResult();

            logger.info({result});

            const deviceInfo = {
                deviceId: req.headers["x-device-id"] as string,
                type: AuthController.getDeviceType(result),
                os: result.os.name || "",
                ipAddress: env.NODE_ENV === "production" ? req.ip : "8.8.8.8",
                browser: result.browser.name || "",
                name: (req.headers["x-device-name"] || "Windows 10") as string,
            };

            const {user, accessToken, refreshToken} = await this.authService.register(
                displayName,
                email,
                password,
                deviceInfo
            );

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });

            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 15 * 60 * 1000, // 15 minutes
            });

            ApiResponse(res, "User registered successfully", {user});
        } catch (error) {
            logger.error(error);
            return next(error);
        }
    }

    async verifyEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const {code} = req.body;

            const result = await this.authService.verifyEmail(code);

            if (!result) {
                return next(badRequestError("Invalid code"));
            }

            ApiResponse(res, "Email verified successfully", {result});
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body;
            let result: IResult = new UAParser(req.headers["user-agent"]).getResult();

            const deviceInfo = {
                deviceName: req.headers["x-device-name"] as string,
                deviceId: req.headers["x-device-id"] as string,
                type: AuthController.getDeviceType(result),
                os: result.os.name || "",
                ipAddress: env.NODE_ENV === "production" ? req.ip : "8.8.8.8",
                browser: result.browser.name || "",
            };

            const ip = env.NODE_ENV === "production" ? req.headers["x-forwarded-for"] || req.ip : "8.8.8.8";

            const attempts = {
                email: email as string,
                ipAddress: parseFloat(ip as string) as number,
                userAgent: req.headers["user-agent"],
            };

            const {user, accessToken, refreshToken} = await this.authService.login(
                email,
                password,
                deviceInfo,
                attempts
            );

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });

            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 15 * 60 * 1000, // 15 minutes
            });

            ApiResponse(res, "User logged in successfully", {user});
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            const device = req.device;

            if (!user || !device) {
                return next(badRequestError("User or device not found"));
            }

            const success = await this.authService.logout(user.id, device.id);

            if (success) {
                res.clearCookie("refreshToken");
                res.clearCookie("accessToken");
                ApiResponse(res, "User logged out successfully", {success});
            }

            return next(unauthorizedError("Please login first to logout."));
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async logoutAll(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            const device = req.device;

            if (!user || !device) {
                return next(badRequestError("User or device not found"));
            }

            const success = await this.authService.logoutAll(user.id, device.id);

            if (success) {
                res.clearCookie("refreshToken");
                res.clearCookie("accessToken");
                ApiResponse(res, "User logged out successfully", {success});
            }

            return next(unauthorizedError("Please login first to logout."));
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async forgotPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const {email} = req.body;
            await this.authService.forgotPassword(email);
            ApiResponse(res, "Password reset link sent successfully");
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const {token, password} = req.body;
            await this.authService.resetPassword(token, password);
            ApiResponse(res, "Password reset successfully");
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    static getDeviceType(parser: IResult): IDeviceType {
        switch (parser.device.type) {
            case "mobile":
                return IDeviceType.MOBILE;
            case "tablet":
                return IDeviceType.TABLET;
            case "desktop":
                return IDeviceType.DESKTOP;
            default:
                return IDeviceType.OTHER;
        }
    }
}
