import { loginService, registerService } from "../services/auth.service.js";
import { setTokenCookie } from "../utils/generateToken.js";

export const login = async (req, res) => {
    const { email, password } = req.body;
    const { token, user } = await loginService(email, password);

    setTokenCookie(res, token);
    res.status(200).json({
        success: true,
        token,
        user,
    });
};

export const register = async (req, res) => {
    try {
        const { token, user } = await registerService(
            req.body.name,
            req.body.email,
            req.body.password,
            req.body.role,
        );

        setTokenCookie(res, token);

        res.status(201).json({
            success: true,
            data: {
                token,
                user,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
