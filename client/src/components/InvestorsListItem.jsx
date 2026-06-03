import React from "react";

const InvestorsListItem = ({ investment }) => {
    return (
        <div className="flex items-center justify-between bg-muted border border-border rounded-lg p-4 hover:bg-muted/40 transition">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                    {investment.investor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                </div>

                <div>
                    <h3 className="font-semibold text-base">
                        {investment.investor.name}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                        {investment.investor.email}
                    </p>
                </div>
            </div>

            <div className="text-right">
                <p className="text-xl font-bold">
                    ${investment.amount.toLocaleString()}
                </p>

                <span className="text-xs text-emerald-500 font-medium">
                    Active Investor
                </span>
            </div>
        </div>
    );
};

export default InvestorsListItem;
