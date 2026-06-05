import { NavLink } from "react-router-dom";
import {
    Component,
    Folder,
    FolderPlus,
    Home,
    LogOut,
    Wallet,
    UsersRound,
} from "lucide-react";
import { useSelector } from "react-redux";

import avatar from "../assets/avatar.jpg";
import { logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const NAVLINKS = {
    dashboard: {
        name: "dashboard",
        path: "dashboard",
        icon: <Home size={16} />,
    },
    projects: {
        name: "projects",
        path: "projects",
        icon: <Folder size={16} />,
    },

    create_project: {
        name: "create project",
        path: "create-project",
        icon: <FolderPlus size={16} />,
    },
    investors: {
        name: "investors",
        path: "investors",
        icon: <UsersRound size={16} />,
    },
    wallet: {
        name: "wallet",
        path: "wallet",
        icon: <Wallet size={16} />,
    },
};

const Sidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        console.log("Logging out...");
        dispatch(logout());
        navigate("/login");
    };

    return (
        <aside className="w-80  relative min-h-screen border-r border-secondary bg-card/80  p-4">
            <div className="mb-16 border-b border-secondary pb-4 mt-10 flex items-center font-semibold text-xl gap-2">
                <div className="p-2 bg-secondary border border-primary/30 rounded flex items-center justify-center">
                    <Component size={20} className="stroke-primary " />
                </div>
                <h1 className="">CrowFunder</h1>
            </div>

            {Object.entries(NAVLINKS).map(([key, link]) => {
                if (key === "investors" && user?.role !== "admin") {
                    return null;
                }

                // if (key === "projects" && user?.role === "investor") {
                //     return null;
                // }
                if (key === "create_project" && user?.role !== "owner") {
                    return null;
                }
                if (key === "wallet" && user?.role !== "investor") {
                    return null;
                }

                return (
                    <NavLink
                        key={key}
                        to={`/${key === "dashboard" ? "" : link.path}`}
                        className="flex items-center p-3 gap-4 rounded text-secondary-foreground hover:text-primary hover:bg-primary/10 mb-1"
                    >
                        {link.icon}
                        {link.name}
                    </NavLink>
                );
            })}
            <div className="absolute  bottom-10 w-[calc(100%-2rem)] ">
                <div className="bg-secondary flex items-center gap-4 p-2 rounded-lg border border-border ">
                    <img
                        src={avatar}
                        width={60}
                        height={60}
                        className="rounded-lg"
                        alt="Avatar"
                    />
                    <div>
                        <p className="capitalize">
                            {user?.name || "Oussama Alione"}
                        </p>
                        <p className="text-sm s text-muted-foreground">
                            {user.role === "admin"
                                ? "Administrator"
                                : user.role === "investor"
                                  ? "Investor"
                                  : "Project Owner"}
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="bg-background hover:bg-background/70 hover:text-primary transition-all duration-200 ml-6 cursor-pointer p-2 rounded-sm"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
