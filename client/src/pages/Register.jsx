import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";
import toast from "react-hot-toast";

import { registerApi } from "../services/authApi";
import Silk from "../components/Silk";

const Register = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("owner");
    const [formError, setFormError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const { token, user } = await registerApi(
                name,
                email,
                password,
                role,
            );

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            dispatch(login({ token, user }));

            toast.success("Registration successful!");
            navigate("/");
        } catch (error) {
            console.log(error);
            if (error.message) {
                setFormError({ message: error.message });

                return;
            }

            setFormError(error.errors);
        }
    };

    return (
        <div className="w-full h-screen relative overflow-hidden grid  grid-cols-3 p-4">
            <div className="flex w-full p-10  items-center flex-col justify-center">
                <h1 className="text-2xl  font-bold mb-4">Register</h1>

                {formError && formError.message && (
                    <span className="text-red-500 text-sm">
                        {formError.message}
                    </span>
                )}
                <form
                    onSubmit={handleRegister}
                    className="w-4/5 flex flex-col gap-4 mt-4"
                >
                    <input
                        className="bg-accent p-3 rounded-md border-none outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {formError && Array.isArray(formError) && (
                        <span className="text-red-500 text-sm">
                            {formError
                                ?.filter((error) => error.field === "name")
                                .map((error) => error.message)
                                .join(", ")}
                        </span>
                    )}
                    <input
                        className="bg-accent p-3 rounded-md border-none outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {formError && Array.isArray(formError) && (
                        <span className="text-red-500 text-sm">
                            {formError
                                ?.filter((error) => error.field === "email")
                                .map((error) => error.message)
                                .join(", ")}
                        </span>
                    )}
                    <input
                        className="bg-accent p-3 rounded-md border-none outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {formError && Array.isArray(formError) && (
                        <span className="text-red-500 text-sm">
                            {formError
                                ?.filter((error) => error.field === "password")
                                .map((error) => error.message)
                                .join(", ")}
                        </span>
                    )}
                    {["owner", "investor"].map((r) => (
                        <label key={r} className="flex  items-center gap-2">
                            <input
                                type="radio"
                                name="role"
                                value={r}
                                checked={role === r}
                                onChange={() => setRole(r)}
                                className="accent-primary"
                            />
                            {r.charAt(0).toUpperCase() + r.slice(1)}
                        </label>
                    ))}
                    {formError && Array.isArray(formError) && (
                        <span className="text-red-500 text-sm">
                            {formError
                                ?.filter((error) => error.field === "role")
                                .map((error) => error.message)
                                .join(", ")}
                        </span>
                    )}
                    <button
                        className="bg-primary text-white p-3 rounded-md hover:bg-primary/90 cursor-pointer transition-colors duration-200"
                        type="submit"
                    >
                        Register
                    </button>
                </form>
                <span className="mt-4 text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary  hover:underline">
                        Login
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

export default Register;
