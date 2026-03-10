import type {Response} from "express";

export const ApiResponse = (res: Response, message: string = "Success", data?: any, statusCode: number = 200) => {
    return res.status(statusCode).json({message, data});
};
