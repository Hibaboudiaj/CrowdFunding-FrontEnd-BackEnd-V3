import User from "../models/User.model.js";

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

  if (!user) throw new CustomError("User not found", 404);

  return {
    balance: user.balance,
    transactions: user.transactions,
  };
};
