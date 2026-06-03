import Project from "../models/Project.model.js";
import Investment from "../models/Investment.model.js";
import mongoose from "mongoose";
import { CustomError } from "../utils/CustomError.js";

export const createProjectService = async (projectData) => {
    const project = await Project.create(projectData);

    if (!project) {
        throw new CustomError("Failed to create project", 500);
    }
    return project;
};

export async function getAllProjectsService(userId, query) {
    const projects = await Project.find({ owner: userId, ...query }).populate(
        "owner",
    );

    const investments = await Investment.find({
        project: { $in: projects.map((p) => p._id) },
    });

    if (!projects) {
        throw new CustomError("Error fetching projects: " + error.message);
    }
    return { projects, investments };
}

export async function getProjectByIdService(projectId) {
    const project = await Project.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(projectId),
            },
        },

        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
            },
        },

        {
            $unwind: "$owner",
        },

        {
            $lookup: {
                from: "investments",
                let: { projectId: "$_id" },

                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$project", "$$projectId"],
                            },
                        },
                    },

                    {
                        $lookup: {
                            from: "users",
                            localField: "investor",
                            foreignField: "_id",
                            as: "investor",
                        },
                    },

                    {
                        $unwind: "$investor",
                    },
                ],

                as: "investments",
            },
        },
    ]);
    if (!project) {
        throw new CustomError("Project not found", 404);
    }
    return project;
}

export async function updateProjectService(projectId, updateData) {
    const project = await Project.findByIdAndUpdate(projectId, updateData, {
        new: true,
    });
    if (!project) {
        throw new CustomError("Project not found", 404);
    }
    return project;
}

export async function deleteProjectService(projectId) {
    const project = await Project.findByIdAndDelete(projectId);
    if (!project) {
        throw new CustomError("Project not found", 404);
    }
    return project;
}

export async function closeProjectService(projectId) {
    const project = await Project.findByIdAndUpdate(
        projectId,
        { status: "closed" },
        { new: true },
    );
    if (!project) {
        throw new CustomError("Project not found", 404);
    }
    return project;
}
export const getProjectsStatsService = async () => {
    const stats = await Project.aggregate([
        // Add funding percentage
        {
            $addFields: {
                fundingPercentage: {
                    $multiply: [
                        {
                            $divide: ["$currentFunding", "$fundingGoal"],
                        },
                        100,
                    ],
                },
            },
        },

        // Global stats
        {
            $group: {
                _id: null,

                totalProjects: {
                    $sum: 1,
                },

                activeProjects: {
                    $sum: {
                        $cond: [{ $eq: ["$status", "active"] }, 1, 0],
                    },
                },

                closedProjects: {
                    $sum: {
                        $cond: [{ $eq: ["$status", "closed"] }, 1, 0],
                    },
                },

                totalFunding: {
                    $sum: "$currentFunding",
                },

                projects: {
                    $push: "$$ROOT",
                },
            },
        },

        // Get top 3 projects
        {
            $addFields: {
                topProjects: {
                    $slice: [
                        {
                            $sortArray: {
                                input: "$projects",
                                sortBy: {
                                    fundingPercentage: -1,
                                },
                            },
                        },
                        3,
                    ],
                },
            },
        },

        // Clean response
        {
            $project: {
                projects: 0,
            },
        },
    ]);

    return stats[0];
};

export const getAllProjectForAdminService = async () => {
    const projects = await Project.find().populate("owner");
    if (!projects) {
        throw new CustomError("Error fetching projects: " + error.message);
    }
    return projects;
};
