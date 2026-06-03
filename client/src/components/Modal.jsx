import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            // onClick={onClose}
        >
            <div
                className="w-full max-w-lg rounded-xl bg-card p-6 shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">{title}</h2>

                    <button
                        onClick={onClose}
                        className="rounded cursor-pointer p-1 hover:bg-accent"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
