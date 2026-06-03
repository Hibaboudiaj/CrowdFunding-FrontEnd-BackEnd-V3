const CreateProjectFormRow = ({ error, className, children }) => {
    if (error && Array.isArray(error) && error.length > 0) {
        console.log("Errors for this field:", error[0].message);
    }

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {children}
            {error.length > 0 && (
                <span className="text-sm text-red-500">
                    {error.map((err) => err.message).join(", ")}
                </span>
            )}
        </div>
    );
};

export default CreateProjectFormRow;
