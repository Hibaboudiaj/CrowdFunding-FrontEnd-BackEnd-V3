import { Router } from "express";
import {
    closeProjectController,
    createProjectController,
    deleteProjectController,
    getAllProjectsController,
    getAllProjectsForAdminController,
    getProjectByIdController,
    getProjectsStatsController,
    updateProjectController,
} from "../contollers/project.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
import { validateCreateProject } from "../middlewares/projectValidator.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: API endpoints for managing projects
 */

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Project created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of projects
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Get a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of projects
 *       500:
 *         description: Server error
 */

router.post(
    "/",
    roleMiddleware("owner"),
    validateCreateProject,
    createProjectController,
);

router.get("/", roleMiddleware("owner"), getAllProjectsController);
router.get("/stats", roleMiddleware("owner"), getProjectsStatsController);
router.get("/all", roleMiddleware("admin"), getAllProjectsForAdminController);
router.get("/:id", getProjectByIdController);
router.put(
    "/:id",
    validateCreateProject,
    roleMiddleware("owner"),
    updateProjectController,
);
router.delete("/:id", roleMiddleware("owner"), deleteProjectController);
router.put("/:id/close", roleMiddleware("owner"), closeProjectController);

export default router;
