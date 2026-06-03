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

const validateRegister = [
    body("name").trim().notEmpty().withMessage("Name is required"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 4 })
        .withMessage("Password must be at least 6 characters"),

    body("role")
        .notEmpty()
        .withMessage("Role is required")
        .isIn(["owner", "investor", "admin"])
        .withMessage("Role must be owner or investor"),

    handleValidation,
];

const validateLogin = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format"),

    body("password").notEmpty().withMessage("Password is required"),

    handleValidation,
];

export { handleValidation, validateRegister, validateLogin };
