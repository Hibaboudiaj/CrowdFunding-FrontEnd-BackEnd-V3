import React from "react";
import ProjectStatusTag from "./ProjectStatusTag";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { useState } from "react";

const ProjectsTable = ({ projects }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <table className="w-full text-sm text-left">
            <thead>
                <tr>
                    {[
                        "name",
                        "Goal Amount",
                        "Current Amount",
                        "Status",
                        "Actions",
                    ].map((header) => (
                        <th
                            className="px-6 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground"
                            key={header}
                        >
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="divide-y divide-border ">
                {projects.map((project) => (
                    <tr
                        className="hover:bg-background/20 duration-200 transition-colors"
                        key={project._id}
                    >
                        <td className="px-6 py-4">{project.name}</td>
                        <td className="px-6 py-4">
                            ${project.fundingGoal?.toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                            ${project.currentFunding?.toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                            {<ProjectStatusTag status={project?.status} />}
                        </td>
                        <td className="">
                            <Link
                                className="flex text-primary hover:underline items-center gap-1 px-6 py-4"
                                to={`/projects/${project._id}`}
                            >
                                <Eye size={16} />
                                view details
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProjectsTable;
