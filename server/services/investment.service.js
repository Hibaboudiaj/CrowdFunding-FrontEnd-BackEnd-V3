//TODO : create investment  , get all investments, get investment by id, update investment, delete investment

import Investment from "../models/Investment.model.js";
import Project from "../models/Project.model.js";
import User from "../models/User.model.js";
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

    const updateInvestorBalance = await User.findByIdAndUpdate(
        investmentData.investor,
        {
            $inc: {
                balance: -investmentData.amount,
            },
        },
        { new: true },
    );

    return { investment, newProject };
};

export async function getAllInvestmentsService(investorId) {
    const investments = await Investment.find({ investor: investorId })
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

export async function getInvestmentStatsService(investorId) {
    const investorStats = await Investment.aggregate([
        { $match: { investor: investorId } },
        {
            $group: {
                _id: null,
                totalInvested: { $sum: "$amount" },
                projectCount: { $sum: 1 },
            },
        },
    ]);

    const totalInvestments = await Investment.countDocuments({
        investor: investorId,
    });

    const investorBalance = await User.findById(investorId).select("balance");

    const totalProjectsInvestedIn = await Investment.aggregate([
        { $match: { investor: investorId } },
        {
            $group: {
                _id: "$project",
            },
        },
        {
            $count: "totalProjects",
        },
    ]);

    const recentInvestments = await Investment.find({ investor: investorId })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("project");

    return {
        totalInvestments,
        investorBalance: investorBalance.balance,
        totalInvested: investorStats[0]?.totalInvested || 0,
        projectCount: investorStats[0]?.projectCount || 0,
        totalProjects: totalProjectsInvestedIn[0]?.totalProjects || 0,
        recentInvestments,
    };
}
