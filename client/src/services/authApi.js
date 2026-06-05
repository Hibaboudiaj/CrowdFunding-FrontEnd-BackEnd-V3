import axios from "axios";
import axiosInstance from "../utils/axios";

const loginApi = async (email, password) => {
    try {
        const res = await axios.post("/api/auth/login", {
            email,
            password,
        });

        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};

const registerApi = async (name, email, password, role) => {
    try {
        const res = await axios.post("/api/auth/register", {
            name,
            email,
            password,
            role,
        });

        return res.data.data;
    } catch (error) {
        throw error.response.data;
    }
};

export { loginApi, registerApi };
