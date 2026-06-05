import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getOwnerProjects,
    getAllProjects,
} from "../store/slices/projectsSlice";
import ProjectsTable from "../components/ProjectsTable";
import ProjectsFilter from "../components/ProjectsFilter";
import { useSearchParams } from "react-router-dom";

const Projects = () => {
    const { projects, error, loading } = useSelector((state) => state.projects);

    const [selectedFilter, setSelectedFilter] = useState("All");

    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [searchParams, setSearchParams] = useSearchParams();

    const status = searchParams.get("status") || "all";

    useEffect(() => {
        setSearchParams({ status: selectedFilter.toLowerCase() });

        setSearchParams((prev) => {
            prev.set("status", selectedFilter.toLowerCase());
            return prev;
        });
    }, [selectedFilter, setSearchParams]);

    useEffect(() => {
        dispatch(getOwnerProjects(status));
        if (user && user.role === "investor") {
            dispatch(getAllProjects());
        } else {
            dispatch(getOwnerProjects());
        }
    }, [dispatch, user, status]);

    return (
        <div>
            <h1 className="page-heading">projects page</h1>

            {error && <p className="text-red-500">{error}</p>}
            <ProjectsFilter
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
            />

            {loading ? (
                <p>Loading...</p>
            ) : projects.length > 0 ? (
                <div className="overflow-x-visible rounded shadow-lg bg-secondary border mt-4 border-secondary ">
                    <ProjectsTable projects={projects} />
                </div>
            ) : (
                <p>No projects found.</p>
            )}
        </div>
    );
};

export default Projects;
