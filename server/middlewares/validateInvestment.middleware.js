import Project from "../models/Project.model.js";

const validateInvestment = async (req, res, next) => {
    try {
        const { amount } = req.body;

        const projectId = req.params.projectId;

        const project = await Project.findById(projectId);

        if (!project) {
            res.status(404).json({ message: "project not found !" });
            return;
        }

        if (project.status === "closed") {
            res.status(400).json({
                message: "you can't invest in a closed project !",
            });
            return;
        }

        const percentage = (amount / project.fundingGoal).toFixed(2);

        if (percentage > project.maxInvestPercentage) {
            res.status(400).json({
                message:
                    "you can't invest more than the maximum allowed percentage for this project !",
            });
            return;
        }

        if (project.currentFunding + amount > project.fundingGoal) {
            res.status(400).json({
                message: "you can't invest more than the funding goal !",
            });
            return;
        }

        next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export default validateInvestment;
