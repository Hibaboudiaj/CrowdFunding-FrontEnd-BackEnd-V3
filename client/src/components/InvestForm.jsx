const InvestForm = () => {
    return (
        <form className="bg-card my-4 shadow-md w-full max-w-md">
            <div className="flex flex-col  gap-4">
                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="amount"
                        className="text-sm mb-2 font-medium text-card-foreground"
                    >
                        Investment Amount
                    </label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter amount to invest"
                    />
                </div>
            </div>
        </form>
    );
};

export default InvestForm;
