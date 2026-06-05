import React from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { ArrowDownCircleIcon } from "lucide-react";

const ProjectActions = ({
    selectedProject,
    openDeleteModal,
    openCloseModal,
    openInvestModal,
}) => {
    const { user } = useSelector((state) => state.auth);

    if (user.role === "investor")
        return (
            <button
                className="bg-primary flex items-center gap-2 cursor-pointer transition-all duration-200 p-2 text-sm rounded  text-primary-foreground hover:bg-primary/80"
                onClick={openInvestModal}
            >
                <ArrowDownCircleIcon size={16} />
                invest in this project
            </button>
        );

    return (
        <div className="flex items-center gap-2">
            <button
                className="bg-destructive cursor-pointer transition-all duration-200 p-2 text-sm rounded  text-destructive-foreground hover:bg-destructive/80"
                onClick={openDeleteModal}
            >
                delete project
            </button>
            {selectedProject?.status === "active" && (
                <button
                    className="bg-accent cursor-pointer transition-all duration-200 p-2 text-sm rounded  text-destructive-foreground hover:bg-accent/80"
                    onClick={openCloseModal}
                >
                    close project
                </button>
            )}
            <Link
                to={`/projects/${selectedProject?._id}/edit`}
                className="bg-primary cursor-pointer transition-all duration-200 p-2 text-sm rounded  text-primary-foreground hover:bg-primary/80"
            >
                edit project
            </Link>
        </div>
    );
};

export default ProjectActions;
