
import "../styles/Wallet.css";
import { useState } from "react";
import WalletCard from "../components/ui/WalletCard";
import TransactionList from "../components/ui/TransactionList";
import DepositForm from "../components/ui/DepositForm";

const Wallet = () => {
  const wallet = {
    balance: 9000,
    totalInvested: 12000,
    projectsFunded: 4,
  };

  const [balance, setBalance] = useState(wallet.balance);

  const [amount, setAmount] = useState("");

  const [error, setError] = useState("");

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "Deposit",
      amount: 2000,
    },
    {
      id: 2,
      type: "Investment",
      amount: 5000,
    },
    {
      id: 3,
      type: "Deposit",
      amount: 7000,
    },
  ]);

  const addMoney = () => {
    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }
    setError("");

    setBalance(balance + Number(amount));

    const newTransaction = {
      id: Date.now(),
      type: "Deposit",
      amount: Number(amount),
    };

    setTransactions((prevTransactions) => [newTransaction, ...prevTransactions]);

    setAmount("");
  };

  return (
    <div className="wallet-page">
      <h1 className="wallet-title">My Wallet</h1>

      <WalletCard
        balance={balance}
        totalInvested={wallet.totalInvested}
        projectsFunded={wallet.projectsFunded}
      />

      <DepositForm
        amount={amount}
        setAmount={setAmount}
        addMoney={addMoney}
        error={error}
      />

      <TransactionList transactions={transactions} />
    </div>
  );
};

export default Wallet;
