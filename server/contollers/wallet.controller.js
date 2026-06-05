import { depositService } from "../services/wallet.service.js";

export const getWalletController = async (req, res, next) => {
  // try {
  //   const userId = req.user._id;
  //   const data = await getWalletService(userId);
  //   res.status(200).json({ status: "success", data });
  // } catch (error) {
  //   next(error);
  // }
};

export const depositController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { amount } = req.body;
    const data = await depositService(userId, amount);
    res.status(200).json({ status: "success", data });
  } catch (error) {
    next(error);
  }
};
