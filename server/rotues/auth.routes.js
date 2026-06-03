import { Router } from "express";

const router = Router();
import { login, register } from "../contollers/auth.controller.js";
import {
    handleValidation,
    validateLogin,
    validateRegister,
} from "../middlewares/userValidator.middleware.js";

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password , name , role]
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *               name:
 *                 type: string
 *                 example: John Doe
 *               role:
 *                 type: string
 *                 example: investor
 *     responses:
 *       201:
 *         description: Registration successful , usre created successfully
 *       401:
 *         description: Invalid credentials
 */

router.post("/login", validateLogin, handleValidation, login);
router.post("/register", validateRegister, handleValidation, register);

export default router;
