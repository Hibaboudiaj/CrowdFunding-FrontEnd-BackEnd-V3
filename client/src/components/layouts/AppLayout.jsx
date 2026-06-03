import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />

            <main className="flex-1 bg-background  overflow-y-auto p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default AppLayout;
