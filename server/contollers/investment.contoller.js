// TODO : create investment  , get all investments, get investment by id, update investment, delete investment

import {
    createInvestmentService,
    getAllInvestmentsService,
    getInvestmentByIdService,
    updateInvestmentService,
    deleteInvestmentService,
} from "../services/investment.service.js";

const createInvestmentController = async (req, res) => {
    const investmentData = req.body;
    investmentData.investor = req.user._id;
    investmentData.amount = req.body.amount;
    investmentData.project = req.params.projectId;

    const data = await createInvestmentService(investmentData);

    res.status(201).json({
        success: true,
        data,
    });
};

const getAllInvestmentsController = async (req, res) => {
    const investments = await getAllInvestmentsService();

    res.status(200).json({
        success: true,
        data: investments,
    });
};

const getInvestmentByIdController = async (req, res) => {
    const investmentId = req.params.id;
    const investment = await getInvestmentByIdService(investmentId);
    res.status(200).json({
        success: true,
        data: investment,
    });
};

const updateInvestmentController = async (req, res) => {
    const investmentId = req.params.id;
    const updateData = req.body;
    const investment = await updateInvestmentService(investmentId, updateData);
    res.status(200).json({
        success: true,
        data: investment,
    });
};

const deleteInvestmentController = async (req, res) => {
    const investmentId = req.params.id;
    const investment = await deleteInvestmentService(investmentId);
    res.status(200).json({
        success: true,
        data: investment,
    });
};

export {
    createInvestmentController,
    getAllInvestmentsController,
    getInvestmentByIdController,
    updateInvestmentController,
    deleteInvestmentController,
};
