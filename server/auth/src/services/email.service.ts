import nodemailer from "nodemailer";
import {env} from "../config/environment.ts";
import logger from "../utils/logger.utils.ts";
import {WELCOME_EMAIL_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE} from "../templates/index.ts";

class EmailService {
    private static transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: env.GMAIL_USER_EMAIL,
            pass: env.GMAIL_APP_PASSWORD,
        },
    });

    static sendVerificationEmail(email: string, code: number, name: string): void {
        const mailOptions = {
            from: "Dethgram <michaelthemastercoder@gmail.com>",
            to: email,
            subject: "Verify your email!",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{{name}}", name).replace("{{code}}", code.toString()),
        };

        this.transporter.sendMail(mailOptions);
        logger.info("Verification email sent successfully.");
    }

    static sendWelcomeEmail(email: string, name: string, link = env.FRONTEND_URL): void {
        const mailOptions = {
            from: "Dethgram <michaelthemastercoder@gmail.com>",
            to: email,
            subject: "Welcome to Dethgram!",
            html: WELCOME_EMAIL_TEMPLATE.replace("{{name}}", name).replace("{{link}}", link),
        };

        this.transporter.sendMail(mailOptions);
        logger.info("Welcome email sent successfully.");
    }
}

export default EmailService;
