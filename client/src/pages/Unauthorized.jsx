import { ArrowLeft, Ban } from "lucide-react";

import { useNavigate } from "react-router-dom";
const Unauthorized = () => {
    const navigate = useNavigate();
    return (
        <div className="flex  flex-col items-center justify-center h-full">
            <Ban size={30} className="text-destructive" />
            <h1 className="text-2xl  font-bold text-destructive">
                Unauthorized
            </h1>
            <p className="text-muted-foreground  mt-2">
                You do not have permission to access this page !
            </p>

            <button
                onClick={() => navigate(-1)}
                className="mt-4 bg-primary rounded cursor-pointer p-2 text-primary-foreground hover:bg-primary/80"
            >
                <ArrowLeft size={16} className="inline-block mr-1" />
                go back
            </button>
        </div>
    );
};

export default Unauthorized;
