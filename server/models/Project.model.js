import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        fundingGoal: {
            type: Number,
            required: true,
        },
        currentFunding: {
            type: Number,
            default: 0,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["active", "closed"],
            default: "active",
        },
        maxInvestPercentage: {
            type: Number,
            default: 0.5,
        },
    },
    { timestamps: true },
);

export default mongoose.model("Project", projectSchema);
