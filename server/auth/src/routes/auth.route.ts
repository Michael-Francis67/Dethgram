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

const router = express.Router();
const authController = new AuthController();

router.post("/signup", validate(registerSchema), authController.register.bind(authController));
router.post("/verify-email", validate(verifyEmailSchema), authController.verifyEmail.bind(authController));
router.post("/login", validate(loginSchema), authController.login.bind(authController));
router.post("/forgot-password", validate(forgotPasswordSchema), authController.forgotPassword.bind(authController));
router.post("/reset-password", validate(resetPasswordSchema), authController.resetPassword.bind(authController));

router.use(authMiddleware.protect);

router.post("/logout", authController.logout.bind(authController));
router.post("/logout-all", authController.logoutAll.bind(authController));

export default router;
