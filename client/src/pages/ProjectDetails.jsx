import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteProject,
    getProjectById,
    closeProject,
} from "../store/slices/projectsSlice";
import { Link, useParams } from "react-router-dom";
import {
    ArrowLeftIcon,
    Goal,
    HandCoins,
    InfoIcon,
    Percent,
} from "lucide-react";
import ProjectStatusTag from "../components/ProjectStatusTag";
import InvestorsList from "../components/InvestorsList";
import StatCard from "../components/StatsCard";
import { formatDate } from "../utils/formatDate";
import Modal from "../components/Modal";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProjectDetails = () => {
    const { selectedProject, loading, error } = useSelector(
        (state) => state.projects,
    );

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setModalContent({
            title: "",
            children: null,
        });
        setIsOpen(false);
    };

    const [modalContent, setModalContent] = useState({
        title: "",
        children: null,
    });

    const handleDelete = () => {
        dispatch(deleteProject(id));
        setIsOpen(false);
        toast.success("Project deleted successfully");
        navigate("/projects");
    };

    const handleCloseProject = () => {
        dispatch(closeProject(id));
        setIsOpen(false);
        toast.success("Project closed successfully");
    };

    const openDeleteModal = () => {
        setModalContent({
            title: "Confirm Deletion",
            children: (
                <div>
                    <p>
                        Are you sure you want to delete this project? This
                        action cannot be undone.
                    </p>

                    <div className="flex items-center gap-2">
                        <button
                            className="bg-secondary cursor-pointer transition-all duration-200 p-2 text-sm rounded  text-secondary-foreground hover:bg-secondary/80 mt-4 ml-2"
                            onClick={closeModal}
                        >
                            cancel
                        </button>
                        <button
                            className="bg-destructive cursor-pointer transition-all duration-200 p-2 text-sm rounded  text-destructive-foreground hover:bg-destructive/80 mt-4"
                            onClick={handleDelete}
                        >
                            confirm delete
                        </button>
                    </div>
                </div>
            ),
        });
        setIsOpen(true);
    };

    const openCloseModal = () => {
        setModalContent({
            title: "Confirm Close Project",
            children: (
                <div>
                    <p>
                        Are you sure you want to close this project? This action
                        cannot be undone.
                    </p>

                    <div className="flex items-center gap-2">
                        <button
                            className="bg-secondary cursor-pointer transition-all duration-200 p-2 text-sm rounded  text-secondary-foreground hover:bg-secondary/80 mt-4 ml-2"
                            onClick={closeModal}
                        >
                            cancel
                        </button>
                        <button
                            className="bg-destructive cursor-pointer transition-all duration-200 p-2 text-sm rounded  text-destructive-foreground hover:bg-destructive/80 mt-4"
                            onClick={handleCloseProject}
                        >
                            confirm close
                        </button>
                    </div>
                </div>
            ),
        });
        setIsOpen(true);
    };

    useEffect(() => {
        dispatch(getProjectById(id));
    }, [dispatch, id]);

    if (error) return <h1>{error}</h1>;
    if (loading) return <h1>Loading...</h1>;

    if (!selectedProject)
        return (
            <div className="text-center mt-10 text-lg bg-card p-10 rounded border border-border w-full h-40 ">
                <InfoIcon
                    size={30}
                    className="mx-auto mb-4 text-muted-foreground"
                />
                <p>
                    Project not found. It might have been deleted or the ID is
                    incorrect.
                </p>
            </div>
        );

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title={modalContent.title}
            >
                {modalContent.children}
            </Modal>
            <h1 className="page-heading mb-10">Project Details</h1>

            <div className="flex w-full  items-center justify-between">
                <Link
                    to="/projects"
                    className="flex items-center group  gap-2 justify-start "
                >
                    <div className="bg-accent group-hover:text-primary flex w-8 h-8 hover:bg-accent/60 transition-all duration-200 hover:text-primary items-center justify-center p-2 rounded-full">
                        <ArrowLeftIcon className="" size={15} />
                    </div>
                    Back to Projects
                </Link>

                <div className="flex flex-col items-end gap-4">
                    <ProjectStatusTag status={selectedProject?.status} />
                    <div className="flex items-center gap-2">
                        <button
                            className="bg-destructive cursor-pointer transition-all duration-200 p-2 text-sm rounded  text-destructive-foreground hover:bg-destructive/80"
                            onClick={openDeleteModal}
                        >
                            delete project
                        </button>
                        {selectedProject?.status === "active" && (
                            <button
                                className="bg-accent cursor-pointer transition-all duration-200 p-2 text-sm rounded  text-destructive-foreground hover:bg-accent/80"
                                onClick={openCloseModal}
                            >
                                close project
                            </button>
                        )}
                        <Link
                            to={`/projects/${selectedProject?._id}/edit`}
                            className="bg-primary cursor-pointer transition-all duration-200 p-2 text-sm rounded  text-primary-foreground hover:bg-primary/80"
                        >
                            edit project
                        </Link>
                    </div>
                </div>
            </div>

            <div className="w-full grid grid-cols-3 gap-4 mt-6">
                <StatCard
                    title="funding goal"
                    value={`$${selectedProject?.fundingGoal.toLocaleString()}`}
                    icon={<Goal />}
                />
                <StatCard
                    title="current funding"
                    value={`$${selectedProject?.currentFunding.toLocaleString()}`}
                    icon={<HandCoins />}
                />
                <StatCard
                    title="max investment percentage"
                    value={`${selectedProject?.maxInvestPercentage * 100}%`}
                    icon={<Percent />}
                />
            </div>
            <InvestorsList
                investments={selectedProject?.investments}
                selectedProject={selectedProject}
            />
            <div className="w-full grid grid-cols-2 gap-4 mt-6">
                <div className="bg-card rounded-lg border border-border p-3 w-full ">
                    <h2 className="uppercase text-md text-card-foreground">
                        Owner
                    </h2>
                    <div className="flex mt-3 bg-secondary rounded-lg p-3 items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                            {selectedProject?.owner.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </div>

                        <div>
                            <h3 className="font-semibold text-base">
                                {selectedProject?.owner.name}
                            </h3>

                            <p className="text-sm text-muted-foreground">
                                {selectedProject?.owner.email}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-card rounded-lg border border-border p-3 w-full ">
                    <h2 className="uppercase text-md text-card-foreground">
                        Details
                    </h2>

                    <div className="flex mt-3 bg-secondary rounded-lg p-3 flex-col gap-2">
                        <p className="flex items-center justify-between">
                            <span className="">Created At: </span>
                            <span className="text-muted-foreground font-semibold">
                                {new Date(
                                    selectedProject?.createdAt,
                                ).toLocaleDateString()}
                            </span>
                        </p>
                        <p className="flex items-center justify-between">
                            <span className="">last update : </span>
                            <span className="text-muted-foreground font-semibold">
                                {formatDate(selectedProject?.updatedAt)}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
