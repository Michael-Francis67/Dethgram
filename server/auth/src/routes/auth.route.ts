import express from "express";
import {validate} from "../utils/validations.utils.ts";
import {
    registerSchema,
    verifyEmailSchema,
    loginSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
} from "../validations/index.ts";
import {AuthController} from "../controllers/auth.controller.ts";
import authMiddleware from "../middlewares/auth.middleware.ts";
import {loginLimiter} from "../config/rate-limit.ts";

const router = express.Router();
const authController = new AuthController();

router.post("/signup", loginLimiter, validate(registerSchema), authController.register.bind(authController));
router.post(
    "/verify-email",
    loginLimiter,
    validate(verifyEmailSchema),
    authController.verifyEmail.bind(authController)
);
router.post("/login", loginLimiter, validate(loginSchema), authController.login.bind(authController));
router.post(
    "/forgot-password",
    loginLimiter,
    validate(forgotPasswordSchema),
    authController.forgotPassword.bind(authController)
);
router.post(
    "/reset-password",
    loginLimiter,
    validate(resetPasswordSchema),
    authController.resetPassword.bind(authController)
);

router.use(authMiddleware.protect);

router.post("/logout", authController.logout.bind(authController));
router.post("/logout-all", authController.logoutAll.bind(authController));

export default router;
