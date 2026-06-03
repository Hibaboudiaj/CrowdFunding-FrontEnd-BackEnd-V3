import mongoose from "mongoose";

const investmentSchema = new mongoose.Schema(
    {
        investor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true },
);

export default mongoose.model("Investment", investmentSchema);
