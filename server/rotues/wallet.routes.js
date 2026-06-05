import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  depositController,
  getWalletController,
} from "../contollers/wallet.controller.js";

const router = Router();

router.get("/", authMiddleware, getWalletController);
router.post("/deposit", authMiddleware, depositController);

export default router;
