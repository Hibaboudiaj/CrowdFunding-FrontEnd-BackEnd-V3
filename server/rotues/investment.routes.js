import { Router } from "express";

const router = Router();

import {
    createInvestmentController,
    deleteInvestmentController,
    getAllInvestmentsController,
    getInvestmentByIdController,
    updateInvestmentController,
    getInvestmentStatsController,
} from "../contollers/investment.contoller.js";
import validateInvestment from "../middlewares/validateInvestment.middleware.js";

router.post(
    "/:projectId/invest",
    validateInvestment,
    createInvestmentController,
);

router.get("/", getAllInvestmentsController);
router.get("/stats", getInvestmentStatsController);
router.get("/:id", getInvestmentByIdController);
router.put("/:id", updateInvestmentController);
router.delete("/:id", deleteInvestmentController);

export default router;
