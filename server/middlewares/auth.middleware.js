import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import { decodeToken } from "../utils/generateToken.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const token =
            req.header("Authorization")?.replace("Bearer ", "") ||
            req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided.",
            });
        }

        const decoded = decodeToken(token);

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found.",
            });
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
        });
    }
};
