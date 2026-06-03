import { Component } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, setLoading } from "../store/slices/authSlice";
import toast from "react-hot-toast";

import { loginApi } from "../services/authApi";
import Silk from "../components/Silk";

const Login = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [formError, setFormError] = React.useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading } = useSelector((state) => state.auth);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const { token, user } = await loginApi(email, password);

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            dispatch(login({ token, user }));

            toast.success("login success welcome back " + user.name);
            navigate("/");
        } catch (error) {
            dispatch(setLoading(false));
            if (error.message) {
                setFormError({ message: error.message });
                return;
            }

            setFormError(error.errors);
        }
    };

    console.log(Array.isArray(formError));
    console.log(formError);
    return (
        <div className="w-full h-screen relative overflow-hidden grid  grid-cols-3 p-4">
            <div className=" flex w-full p-10  items-center flex-col justify-center">
                <h1 className="text-2xl  font-bold mb-4">Login</h1>
                {formError && formError.message && (
                    <span className="text-red-500 text-sm">
                        {formError.message}
                    </span>
                )}
                <form
                    onSubmit={handleLogin}
                    action=""
                    className="w-4/5 flex flex-col gap-4 mt-4"
                >
                    <input
                        className="bg-accent p-3 rounded-md border-none outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />

                    {Array.isArray(formError) && (
                        <span className="text-red-500 text-sm">
                            {formError
                                .filter((error) => error.field === "email")
                                .map((error) => error.message)
                                .join(", ")}
                        </span>
                    )}

                    <input
                        className="bg-accent p-3 rounded-md border-none outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    {Array.isArray(formError) && (
                        <span className="text-red-500 text-sm">
                            {formError
                                .filter((error) => error.field === "password")
                                .map((error) => error.message)
                                .join(", ")}
                        </span>
                    )}

                    <button
                        className="bg-primary text-white p-3 rounded-md hover:bg-primary/90 cursor-pointer transition-colors duration-200"
                        type="submit"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <span className="mt-4 text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-primary  hover:underline"
                    >
                        Register
                    </Link>
                </span>
            </div>
            <div className="w-full rounded-lg col-span-2  h-full overflow-hidden relative">
                <Silk
                    speed={5}
                    scale={1}
                    color="#5227FF"
                    noiseIntensity={1.5}
                    rotation={0}
                    className="rounded-lg"
                />
            </div>
        </div>
    );
};

export default Login;
