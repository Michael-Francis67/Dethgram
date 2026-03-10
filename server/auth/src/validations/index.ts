// @ts-ignore
import {body} from "express-validator";

export const registerSchema = [
    body("email").isEmail().withMessage("Invalid email address"),

    body("password")
    .isLength({min: 8, max: 10})
    .withMessage("Password must be at least 8 characters long and at most 10 characters long"),

    body("displayName")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({min: 2, max: 50})
    .withMessage("Name must be between 2 and 50 characters long"),
];

export const loginSchema = [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
    .isLength({min: 8, max: 10})
    .withMessage("Password must be at least 8 characters long and at most 10 characters long"),
];

export const forgotPasswordSchema = [body("email").isEmail().withMessage("Invalid email address")];

export const resetPasswordSchema = [
    body("token").isString().withMessage("Token is required"),
    body("password")
    .isLength({min: 8, max: 10})
    .withMessage("Password must be at least 8 characters long and at most 10 characters long"),
];

export const verifyEmailSchema = [body("code").isString().withMessage("Code is required")];
