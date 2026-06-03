import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectById, updateProject } from "../store/slices/projectsSlice";
import { useParams } from "react-router-dom";
import CreateProjectFormRow from "../components/ui/CreateProjectFormRow";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const UpdateProject = () => {
    const { selectedProject, loading, error } = useSelector(
        (state) => state.projects,
    );

    const [form, setForm] = React.useState({
        name: selectedProject?.name,
        description: selectedProject?.description,
        fundingGoal: selectedProject?.fundingGoal,
        maxInvestPercentage: selectedProject?.maxInvestPercentage,
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    const handleChange = async (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form);

        const result = await dispatch(updateProject({ id, projectData: form }));

        if (updateProject.fulfilled.match(result)) {
            toast.success("Project updated successfully");
            navigate("/projects");
        }
    };

    useEffect(() => {
        dispatch(getProjectById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (selectedProject) {
            setForm({
                name: selectedProject.name || "",
                description: selectedProject.description || "",
                fundingGoal: selectedProject.fundingGoal || "",
                maxInvestPercentage: selectedProject.maxInvestPercentage || "",
            });
        }
    }, [selectedProject]);

    if (error) return <h1>{error}</h1>;
    if (loading) return <h1>Loading...</h1>;

    return (
        <div>
            <h1 className="page-heading">Update Project page</h1>

            <form
                className=" mt-10 grid grid-cols-3 gap-4 w-5/5 bg-card border border-border p-10 rounded-lg"
                onSubmit={handleSubmit}
            >
                <h1 className="col-span-3 text-2xl font-bold">
                    Update Project Form
                </h1>

                <CreateProjectFormRow
                    error={
                        error && Array.isArray(error)
                            ? error.filter((err) => err.field === "name")
                            : ""
                    }
                >
                    <label
                        htmlFor="name"
                        className="text-sm text-muted-foreground"
                    >
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
                    type="submit"
                    className="bg-primary disabled:cursor-not-allowed cursor-pointer text-primary-foreground p-3 rounded hover:bg-primary/90"
                    type="submit"
                >
                    Update Project
                </button>
            </form>
        </div>
    );
};

export default UpdateProject;
