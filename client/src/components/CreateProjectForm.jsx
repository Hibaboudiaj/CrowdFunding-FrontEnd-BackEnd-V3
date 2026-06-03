import React from "react";
import CreateProjectFormRow from "./ui/CreateProjectFormRow";
import { createProject } from "../store/slices/projectsSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

const CreateProjectForm = () => {
    const { error, loading } = useSelector((state) => state.projects);

    const navigate = useNavigate();

    const [form, setForm] = React.useState({
        name: "",
        description: "",
        fundingGoal: 0,
        maxInvestPercentage: 0,
    });

    const dispatch = useDispatch();

    const handleChange = async (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await dispatch(createProject(form));

        if (createProject.fulfilled.match(result)) {
            toast.success("Project created");
            setForm({
                name: "",
                description: "",
                fundingGoal: 0,
                maxInvestPercentage: 0,
            });
            // navigate("/projects");
        }
    };

    return (
        <form
            className=" mt-10 grid grid-cols-3 gap-4 w-5/5 bg-card border border-border p-10 rounded-lg"
            onSubmit={handleSubmit}
        >
            <h1 className="col-span-3 text-2xl font-bold">
                Create Project Form
            </h1>

            <CreateProjectFormRow
                error={
                    error && Array.isArray(error)
                        ? error.filter((err) => err.field === "name")
                        : ""
                }
            >
                <label htmlFor="name" className="text-sm text-muted-foreground">
                    Project Name
                </label>

                <input
                    id="name"
                    className="input"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                />
            </CreateProjectFormRow>

            <CreateProjectFormRow
                error={
                    error && Array.isArray(error)
                        ? error.filter((err) => err.field === "fundingGoal")
                        : ""
                }
            >
                <label
                    htmlFor="fundingGoal"
                    className="text-sm text-muted-foreground"
                >
                    Funding Goal
                </label>
                <input
                    id="fundingGoal"
                    className="input"
                    type="number"
                    name="fundingGoal"
                    value={form.fundingGoal}
                    onChange={handleChange}
                />
            </CreateProjectFormRow>
            <CreateProjectFormRow
                error={
                    error && Array.isArray(error)
                        ? error.filter(
                              (err) => err.field === "maxInvestPercentage",
                          )
                        : ""
                }
            >
                <label
                    htmlFor="maxInvestPercentage"
                    className="text-sm text-muted-foreground"
                >
                    Max Investment Percentage (optional) - default is 100%
                </label>
                <input
                    id="maxInvestPercentage"
                    className="input"
                    type="number"
                    name="maxInvestPercentage"
                    value={form.maxInvestPercentage}
                    onChange={handleChange}
                />
            </CreateProjectFormRow>
            <CreateProjectFormRow
                error={
                    error && Array.isArray(error)
                        ? error.filter((err) => err.field === "description")
                        : ""
                }
                className="col-span-3"
            >
                <label
                    htmlFor="description"
                    className="text-sm text-muted-foreground"
                >
                    Description
                </label>
                <textarea
                    id="description"
                    className="input"
                    type="text"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                />
            </CreateProjectFormRow>
            <button
                disabled={loading}
                className="bg-primary disabled:cursor-not-allowed text-primary-foreground p-3 rounded hover:bg-primary/90"
                type="submit"
            >
                Create Project
            </button>
        </form>
    );
};

export default CreateProjectForm;
