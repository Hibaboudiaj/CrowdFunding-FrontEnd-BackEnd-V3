import React from "react";
import {
    FiCheckCircle,
    FiDollarSign,
    FiDownload,
    FiXCircle,
} from "react-icons/fi";

const InvestorDashbord = ({ stats }) => {
    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1 className="page-heading">Dashboard</h1>
            </div>
            <div className="stats-container">
                <div className="stat-card">
                    <div className="stat-top">
                        <h3>Total Investments</h3>

                        <div className="stat-icon">
                            <FiDollarSign />
                        </div>
                    </div>
                    <p>{stats?.totalInvestments}</p>
                </div>
                <div className="stat-card">
                    <div className="stat-top">
                        <h3>Total Capital Invested</h3>

                        <div className="stat-icon">
                            <FiDollarSign />
                        </div>
                    </div>
                    <p>${stats?.totalInvested}</p>
                </div>
                <div className="stat-card">
                    <div className="stat-top">
                        <h3>total projects invested in</h3>
                        <div className="stat-icon open-icon">
                            <FiCheckCircle />
                        </div>
                    </div>
                    <p>{stats?.totalProjects}</p>
                </div>
                <div className="stat-card">
                    <div className="stat-top">
                        <h3>current balance</h3>
                        <div className="stat-icon closed-icon">
                            <FiDollarSign />
                        </div>
                    </div>
                    <p>$ {stats?.investorBalance}</p>
                </div>
            </div>

            <h3 className=" text-xl text-foreground font-bold  mt-8 mb-4">
                Recent Investments
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stats?.recentInvestments?.length > 0 ? (
                    stats?.recentInvestments?.map((investment) => (
                        <div
                            key={investment._id}
                            className="bg-card rounded-md border border-border shadow p-4 flex  items-start  gap-4"
                        >
                            <div className="flex bg-background px-2 py-1 rounded-sm items-center justify-center mb-4">
                                <FiDownload className="text-2xl text-primary mb-2" />
                            </div>

                            <div className="flex-1">
                                <div className="flex justify-between w-full items-center gap-2">
                                    <h4 className="text-lg font-semibold">
                                        {investment?.project?.name}
                                    </h4>
                                    <p className="  border border-green-300/50 rounded-sm p-1 text-xs text-muted-foreground">
                                        {(investment.amount /
                                            investment.project?.fundingGoal) *
                                            100}{" "}
                                        % funded
                                    </p>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Invested: ${investment.amount}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Date:{" "}
                                    {new Date(
                                        investment.createdAt,
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No recent investments.</p>
                )}
            </div>
        </div>
    );
};

export default InvestorDashbord;
