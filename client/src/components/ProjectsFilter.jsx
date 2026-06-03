import { Filter } from "lucide-react";
import React from "react";
import { useSearchParams } from "react-router-dom";

const ProjectsFilter = ({ selectedFilter, setSelectedFilter }) => {
    return (
        <div className="mt-20 flex items-center gap-2">
            <Filter className="stroke-primary  mr-6" size={20} />
            {["All", "Active", "closed"].map((status) => (
                <button
                    key={status}
                    className={`px-4 py-2 text-sm  cursor-pointer rounded-md hover:bg-primary/80 ${
                        selectedFilter === status
                            ? "bg-primary text-white"
                            : "bg-secondary text-foreground"
                    }`}
                    onClick={() => setSelectedFilter(status)}
                >
                    {status}
                </button>
            ))}
        </div>
    );
};

export default ProjectsFilter;
