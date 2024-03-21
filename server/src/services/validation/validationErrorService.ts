import { Request, Response, NextFunction } from "express";
import { validationResult } from 'express-validator';

/**
 * Middleware to handle validation errors.
 * If errors are found, sends a 400 response with a generic error message.
 *
 * @param req Express request object.
 * @param res Express response object.
 * @param next Callback to the next middleware function.
 */
export function handleErrors(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error('Input Validation Error', JSON.stringify(errors));
        return res.status(400).json({
            message: 'Unauthorized access. Input Validation failed.'
        });
    }
    next();
}