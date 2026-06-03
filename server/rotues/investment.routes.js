import { Router } from "express";

const router = Router();

import { createInvestmentController } from "../contollers/investment.contoller.js";
import validateInvestment from "../middlewares/validateInvestment.middleware.js";

router.post(
    "/:projectId/invest",
    validateInvestment,
    createInvestmentController,
);

export default router;
