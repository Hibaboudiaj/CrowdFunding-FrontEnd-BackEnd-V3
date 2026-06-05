import TransactionItem from "./TransactionItem";

const TransactionList = ({ transactions }) => {
  return (
    <div className="transaction-list">
      <h2>Transaction History ({transactions.length})</h2>

      <div>
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
          />
        ))}
      </div>
    </div>
  );
};

export default TransactionList;