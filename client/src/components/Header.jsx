import { Bell, LogOut } from "lucide-react";

const Header = () => {
    return (
        <header className="flex bg-background  items-center justify-end h-16 border-b border-secondary gap-4 w-full p-4  ">
            <div className="p-3 bg-secondary/80 rounded cursor-pointer hover:bg-secondary/30">
                <Bell className="text-primary" size={16} />
            </div>
            <div className="p-3 bg-secondary/80 rounded cursor-pointer hover:bg-secondary/30">
                <LogOut className="text-primary" size={16} />
            </div>
        </header>
    );
};

export default Header;
