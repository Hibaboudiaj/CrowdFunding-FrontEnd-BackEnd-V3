// ProjectCard.jsx
export default function ProjectCard({ project, icon }) {
    const {
        name,
        description,
        status,
        fundingGoal,
        currentFunding,
        maxInvestPercentage,
    } = project;

    const statusStyles = {
        active: "bg-primary/10 text-chart-1",
        closed: "bg-destructive/10 text-destructive",
        pending: "bg-amber-500/10 text-amber-400",
    };

    return (
        <div
            className="bg-card border border-border rounded-lg p-5 flex flex-col gap-3
                    hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
        >
            <div className="flex items-start justify-between">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    {icon}
                </div>
                <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${statusStyles[status] ?? statusStyles.pending}`}
                >
                    {status}
                </span>
            </div>

            <div>
                <p className="text-sm font-semibold text-foreground">{name}</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {description}
                </p>
            </div>

            <div className="flex justify-between items-center pt-2.5 border-t border-border mt-auto">
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        Raised
                    </span>
                    <span className="text-sm font-semibold">
                        ${currentFunding?.toLocaleString()}
                    </span>
                </div>
                <div className="w-px h-7 bg-border" />
                <div className="flex flex-col items-center">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        Goal
                    </span>
                    <span className="text-sm font-semibold">
                        ${fundingGoal?.toLocaleString()}
                    </span>
                </div>
                <div className="w-px h-7 bg-border" />
                <div className="flex flex-col items-end">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        Max invest
                    </span>
                    <span className="text-sm font-semibold">
                        {maxInvestPercentage
                            ? (maxInvestPercentage * 100).toFixed(2)
                            : "0.00"}
                        %
                    </span>
                </div>
            </div>
        </div>
    );
}
