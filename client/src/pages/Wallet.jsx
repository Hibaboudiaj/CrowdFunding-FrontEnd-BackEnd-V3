import "../styles/Wallet.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getWallet, depositToWallet } from "../store/slices/walletSlice";

import WalletCard from "../components/ui/WalletCard";
import TransactionList from "../components/ui/TransactionList";
import DepositForm from "../components/ui/DepositForm";

const Wallet = () => {
  const {
    balance,
    transactions,
    error: reduxError,
  } = useSelector((state) => state.wallet);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWallet());
  }, [dispatch]);

  const wallet = {
    totalInvested: 12000,
    projectsFunded: 4,
  };

  const [amount, setAmount] = useState("");

  //validation input
  const [error, setError] = useState("");

  const addMoney = async () => {
    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }
    setError("");

    const data = await dispatch(depositToWallet(Number(amount)));
    console.log("Deposit response:", data);

    setAmount("");
  };

  return (
    <div className="wallet-page">
      <h1 className="wallet-title">My Wallet</h1>

      {reduxError && <p>{reduxError}</p>}

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
