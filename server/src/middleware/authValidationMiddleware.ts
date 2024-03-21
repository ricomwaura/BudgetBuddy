import { Request, Response, NextFunction } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

/**
 * Validates the login request fields.
 * @returns {ValidationChain[]} An array of express-validator chains for validating the login request.
 */
export function validateLogin(): ValidationChain[] {
    return [
        body("email")
            .isEmail()
            .withMessage("Invalid email address.")
            .normalizeEmail(),

        body("password")
            .isLength({ min: 8})
            .withMessage("Password must be at least 8 characters long.")
            .matches(/\d/)
            .withMessage("Password must contain at least one digit.")
            .trim(),
    ];
}