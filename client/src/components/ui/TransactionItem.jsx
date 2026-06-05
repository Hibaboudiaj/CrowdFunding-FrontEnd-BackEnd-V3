const TransactionItem = ({ transaction }) => {
  const isDeposit = transaction.type === "Deposit";

  return (
    <div className={isDeposit ? "deposit-item" : "investment-item"}>
      <p>{isDeposit ? "🟢 Deposit" : "🔴 Investment"}</p>
      <p>{transaction.amount.toLocaleString()} MAD</p>
    </div>
  );
};

export default TransactionItem;