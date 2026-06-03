import { body, validationResult } from "express-validator";

const handleValidation = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array().map((e) => ({
                field: e.path,
                message: e.msg,
            })),
        });
    }

    next();
};

const validateCreateProject = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Project name is required")
        .isLength({ min: 3, max: 100 })
        .withMessage("Project name must be between 3 and 100 characters"),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required")
        .isLength({ min: 10, max: 1000 })
        .withMessage("Description must be between 10 and 1000 characters"),

    body("fundingGoal")
        .notEmpty()
        .withMessage("Funding goal is required")
        .isFloat({ min: 1 })
        .withMessage("Funding goal must be greater than 0"),

    body("currentFunding")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Current funding cannot be negative"),

    body("maxInvestPercentage")
        .optional()
        .isFloat({ min: 0, max: 50 })
        .withMessage("Max investment percentage must be  between 1 and 50"),

    handleValidation,
];

export { validateCreateProject };
