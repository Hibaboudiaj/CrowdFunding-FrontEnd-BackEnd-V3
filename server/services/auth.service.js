import User from "../models/User.model.js";
import { CustomError } from "../utils/CustomError.js";
import { generateToken } from "../utils/generateToken.js";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";

export const loginService = async (email, password) => {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        throw new CustomError("Invalid credentials", 400);
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        throw new CustomError("Invalid credentials", 400);
    }
    const token = generateToken(user);
    return { token, user };
};

export const registerService = async (name, email, password, role) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new CustomError("Email already in use", 400);
    }
    // if (!["owner", "investor"].includes(role)) {
    //     throw new CustomError("Role must be owner or investor", 400);
    // }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
    });

    if (!user) {
        throw new CustomError("Failed to register user ", 500);
    }
    const token = generateToken(user);
    return { token, user };
};
