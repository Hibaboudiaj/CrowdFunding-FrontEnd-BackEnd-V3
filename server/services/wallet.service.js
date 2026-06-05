import User from "../models/User.model.js";
import Investment from "../models/Investment.model.js";

export const depositService = async (userId, amount) => {
  if (!amount || amount <= 0) throw new CustomError("Invalid amount", 400);

  const newTransaction = {
    type: "Deposit",
    amount: amount,
    createdAt: new Date(),
  };

  const user = await User.findByIdAndUpdate(
    userId,
    {
      $inc: { balance: amount },
      $push: { transactions: newTransaction }, // save f DB
    },
    { new: true },
  );

  if (!user) throw new CustomError("User not found", 404);

  return {
    balance: user.balance,
    transaction: user.transactions[user.transactions.length - 1],
  };
};

export const getWalletService = async (userId) => {
  const user = await User.findById(userId);

  const investmentTransactions = await Investment.find({
    investor: userId,
  }).populate("project");

  if (!user) throw new CustomError("User not found", 404);

  return {
    balance: user.balance,
    transactions: [
      ...user.transactions,
      ...investmentTransactions.map((inv) => ({
        type: "Investment",
        amount: inv.amount,
        project: inv.project.name,
        createdAt: inv.createdAt,
      })),
    ],
  };
};
