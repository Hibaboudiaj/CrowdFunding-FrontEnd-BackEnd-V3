const WalletCard = ({ balance, totalInvested, projectsFunded }) => {
  return (
    <div className="wallet-card">
      <div className="wallet-stat">
        <h3>Current Balance</h3>
        <p>{balance.toLocaleString()} MAD</p>
      </div>

      <div className="wallet-stat">
        <h3>Total Invested</h3>
        <p>{totalInvested.toLocaleString()} MAD</p>
      </div>

      <div className="wallet-stat">
        <h3>Projects Funded</h3>
        <p>{projectsFunded}</p>
      </div>
    </div>
  );
};

export default WalletCard;