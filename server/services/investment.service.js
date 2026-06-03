//TODO : create investment  , get all investments, get investment by id, update investment, delete investment

import Investment from "../models/Investment.model.js";
import Project from "../models/Project.model.js";
import { CustomError } from "../utils/CustomError.js";

export const createInvestmentService = async (investmentData) => {
    const projectId = investmentData.project;

    const investment = await Investment.create(investmentData);

    if (!investment) {
        throw new CustomError("Failed to create investment", 500);
    }

    const project = await Project.findOne({ _id: projectId });

    if (!project) {
        throw new CustomError("project not found  !", 404);
    }

    const newProject = await Project.findByIdAndUpdate(
        projectId,
        {
            $inc: {
                currentFunding: investment.amount,
            },
            $set: {
                status:
                    investmentData.amount + project.currentFunding >=
                    project.fundingGoal
                        ? "closed"
                        : project.status,
            },
        },
        { new: true },
    );

    return { investment, newProject };
};

export async function getAllInvestmentsService() {
    const investments = await Investment.find()
        .populate("investor")
        .populate("project");

    if (!investments) {
        throw new CustomError("failed to load investments");
    }
    return investments;
}

export async function getInvestmentByIdService(investmentId) {
    const investment = await Investment.findById(investmentId)
        .populate("investor")
        .populate("project");
    if (!investment) {
        throw new CustomError("Investment not found", 404);
    }
    return investment;
}

export async function updateInvestmentService(investmentId, updateData) {
    const investment = await Investment.findByIdAndUpdate(
        investmentId,
        updateData,
        {
            new: true,
        },
    );

    if (!investment) {
        throw new CustomError("Investment not found", 404);
    }

    return investment;
}

export async function deleteInvestmentService(investmentId) {
    const investment = await Investment.findByIdAndDelete(investmentId);
    if (!investment) {
        throw new CustomError("Investment not found", 404);
    }
    return investment;
}
