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
        if (user && user.role === "investor") {
            dispatch(getAllProjects());
            return;
        } else {
            dispatch(getOwnerProjects());
        }
    }, [dispatch, user, status]);

    return (
        <div>
            <h1 className="page-heading">projects page</h1>

            {error && <p className="text-red-500">{error}</p>}

            {user.role === "owner" && (
                <div className="mt-20">
                    <p className="text-base text-muted-foreground mb-4">
                        Here you can view and manage your projects. Use the
                        filter to find specific projects based on their status.
                    </p>
                    <ProjectsFilter
                        selectedFilter={selectedFilter}
                        setSelectedFilter={setSelectedFilter}
                    />
                </div>
            )}

            {loading ? (
                <p>Loading...</p>
            ) : projects.length > 0 ? (
                <div className="overflow-x-visible rounded shadow-lg bg-secondary border mt-20 border-secondary ">
                    <ProjectsTable projects={projects} />
                </div>
            ) : (
                <p>No projects found.</p>
            )}
        </div>
    );
};

export default Projects;
