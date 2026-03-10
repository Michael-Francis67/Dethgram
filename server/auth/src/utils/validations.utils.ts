import type {Request, Response, NextFunction} from "express";

export const validate = (validations: any[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // sequential processing, stops running validations chain if one fails.
        for (const validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                return res.status(400).json({errors: result.array()});
            }
        }

        next();
    };
};
