import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        role: {
            type: String,
            enum: ["owner", "investor", "admin"],
            required: true,
        },
        balance: {
            type: Number,
            default: 0,
            min: 0,
            required: function () {
                return this.role === "investor";
            },
        },
    },
    { timestamps: true },
);

export default mongoose.model("User", userSchema);
