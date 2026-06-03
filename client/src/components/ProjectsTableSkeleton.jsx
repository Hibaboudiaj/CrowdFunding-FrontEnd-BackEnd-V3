function ProjectsTableSkeleton({ rows = 3 }) {
    return (
        <div className="w-full overflow-hidden rounded border border-border">
            <div className="grid grid-cols-5 px-5 py-3 bg-secondary border-b border-border">
                {[
                    "Description",
                    "Goal Amount",
                    "Current Amount",
                    "Status",
                    "Actions",
                ].map((h) => (
                    <div
                        key={h}
                        className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
                    >
                        {h}
                    </div>
                ))}
            </div>

            {Array.from({ length: rows }).map((_, i) => (
                <div
                    key={i}
                    className="grid grid-cols-5 items-center px-5 py-5 border-b border-border last:border-none"
                >
                    <div className="h-4 w-32 rounded bg-muted animate-pulse" />

                    {/* Goal Amount */}
                    <div className="h-4 w-24 rounded bg-muted animate-pulse" />

                    {/* Current Amount */}
                    <div className="h-4 w-24 rounded bg-muted animate-pulse" />

                    {/* Status badge */}
                    <div className="h-6 w-20 rounded bg-muted animate-pulse" />

                    {/* Actions */}
                    <div className="h-4 w-24 rounded bg-muted animate-pulse" />
                </div>
            ))}
        </div>
    );
}

export default ProjectsTableSkeleton;
