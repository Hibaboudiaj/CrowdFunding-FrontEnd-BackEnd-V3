import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createInvestment } from "../store/slices/investmentsSlice";
import toast from "react-hot-toast";

const InvestForm = ({ closeModal }) => {
    const [amount, setAmount] = useState("");
    const dispatch = useDispatch();
    const { id } = useParams();

    const { loading, error } = useSelector((state) => state.investments);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const investmentData = {
            amount: parseFloat(amount),
        };
        const data = await dispatch(
            createInvestment({ projectId: id, investmentData }),
        );
        if (data.payload.success) {
            setAmount("");
            toast.success("Investment successful!");
            closeModal();
        }
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className=" flex  items-end gap-2  shadow-md w-full max-w-md"
            >
                <div className="flex flex-col flex-1 gap-4">
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="amount"
                            className="text-sm font-medium text-card-foreground"
                        >
                            Investment Amount
                        </label>
                        <input
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            type="number"
                            id="amount"
                            name="amount"
                            className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Enter amount to invest"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-primary text-primary-foreground rounded px-3 py-2 hover:bg-primary/80 transition-colors duration-200"
                >
                    {loading ? "Processing..." : "Invest"}
                </button>
            </form>
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    );
};

export default InvestForm;
