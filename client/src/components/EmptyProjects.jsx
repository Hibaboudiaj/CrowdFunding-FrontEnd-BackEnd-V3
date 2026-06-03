import { Link } from "react-router-dom";

function EmptyProjects() {
    return (
        <div className="flex mt-10 flex-col items-center justify-center py-20 px-6 rounded border border-border bg-card">
            <div className="w-16 h-16 rounded bg-accent flex items-center justify-center mb-5">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="var(--primary)"
                    strokeWidth={1.5}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 7h18M3 12h18M3 17h18"
                    />
                </svg>
            </div>

            <h3 className="text-lg font-semibold  mb-2">No Projects Found</h3>
            <p className="text-sm text-muted-foreground text-center max-w-xs">
                You don't have any projects yet. Start by creating your first
                one.
            </p>

            <Link
                to={"/create-project"}
                className="mt-6 px-5 py-2 rounded text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
                + Create Project
            </Link>
        </div>
    );
}

export default EmptyProjects;
