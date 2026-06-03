import { Component } from "lucide-react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div>
            <section>
                <Outlet />
            </section>
            {/* <div className="p-2 bg-secondary border border-primary/30 rounded flex items-center justify-center">
                <Component size={20} className="stroke-primary " />
            </div> */}
        </div>
    );
};

export default AuthLayout;
