const DepositForm = ({ amount, setAmount, addMoney, error }) => {
  return (
    <div className="deposit-form">
      <h2>Add Funds</h2>

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={addMoney}>
        Add Deposit
      </button>

      {error && <p>{error}</p>}
    </div>
  );
};

export default DepositForm;