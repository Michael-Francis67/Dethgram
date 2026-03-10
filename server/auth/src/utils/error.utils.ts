import type {Request, Response, NextFunction} from "express";
import type {IData} from "../types/index.ts";

export class AppError extends Error {
    public statusCode: number;
    public isOperational: boolean;
    public data?: any[] | IData;

    constructor(
        message: string = "Something went wrong",
        data?: any[] | IData[] | any | IData,
        statusCode = 500,
        isOperational = true
    ) {
        super(message, data);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}

export const conflictError = (message: string, data?: any[]) => new AppError(message, data, 409);
export const badRequestError = (message: string, data?: any[]) => new AppError(message, data, 400);
export const notFoundError = (message: string, data?: any[]) => new AppError(message, data, 404);
export const unauthorizedError = (message: string, data?: any[]) => new AppError(message, data, 401);

export const ErrorHandler = (err: AppError, _req: Request, res: Response, _next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({error: message});
};
