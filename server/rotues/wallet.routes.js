import { Router } from "express";
import {
  getWalletController,
  depositController,
  authMiddleware,
} from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, getWalletController);
router.post("/deposit", authMiddleware, depositController);

export default router;
