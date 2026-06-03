import "../styles/Dashboard.css";
import {
    FiFolder,
    FiCheckCircle,
    FiXCircle,
    FiDollarSign,
} from "react-icons/fi";
import { useEffect } from "react";
import { getProjectsStats } from "../store/slices/projectsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ui/ProjectCard";
import { ArrowRight, Rocket } from "lucide-react";

const Dashboard = () => {
    const { stats, error, loading } = useSelector((state) => state.projects);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProjectsStats());
    }, [dispatch]);

    const projects = [
        {
            id: 1,
            title: "EduStream Platform",
            status: "Ouvert",
            target: "80 000 MAD",
            raised: "54 000 MAD",
            progress: 67,
            investors: 9,
        },

        {
            id: 2,
            title: "Health Connect",
            status: "Fermé",
            target: "120 000 MAD",
            raised: "120 000 MAD",
            progress: 45,
            investors: 7,
        },

        {
            id: 3,
            title: "Green Energy Hub",
            status: "Ouvert",
            target: "200 000 MAD",
            raised: "90 000 MAD",
            progress: 90,
            investors: 10,
        },

        {
            id: 4,
            title: "Smart Farming",
            status: "Fermé",
            target: "150 000 MAD",
            raised: "75 000 MAD",
            progress: 75,
            investors: 12,
        },
    ];

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1 className="page-heading">Dashboard</h1>

                <Link to="/create-project" className="title-color button">
                    Nouveau Projet
                </Link>
            </div>

            <div className="stats-container">
                <div className="stat-card">
                    <div className="stat-top">
                        <h3>Total Projects</h3>

                        <div className="stat-icon">
                            <FiFolder />
                        </div>
                    </div>
                    <p>{stats?.totalProjects}</p>
                </div>

                <div className="stat-card">
                    <div className="stat-top">
                        <h3>Open Projects</h3>

                        <div className="stat-icon open-icon">
                            <FiCheckCircle />
                        </div>
                    </div>

                    <p>{stats?.activeProjects}</p>
                </div>

                <div className="stat-card">
                    <div className="stat-top">
                        <h3>Closed Projects</h3>

                        <div className="stat-icon closed-icon">
                            <FiXCircle />
                        </div>
                    </div>

                    <p>{stats?.closedProjects}</p>
                </div>

                <div className="stat-card">
                    <div className="stat-top">
                        <h3>Total Capital</h3>

                        <div className="stat-icon capital-icon">
                            <FiDollarSign />
                        </div>
                    </div>

                    <p>${stats?.totalFunding}</p>
                </div>
            </div>

            <div className="recent-projects ">
                <div className="recent-header">
                    <h2 className="title-color capitalize  text-sm font-semibold">
                        top three projects
                    </h2>
                    <Link
                        to="/projects "
                        className="title-color flex items-center text-sm font-medium hover:underline underline-offset-4 "
                    >
                        <span>see all projects</span>
                        <ArrowRight className="ml-1 text-primary" size={16} />
                    </Link>
                </div>
                {/* DashboardHeaderBottom End */}

                {/* DashboardBottom Start */}
                {/* <div className="projects-grid">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div> */}
                <div className="projects-grid">
                    {stats?.topProjects?.map((project) => (
                        <ProjectCard
                            icon={<Rocket size={16} />}
                            key={project._id}
                            project={project}
                        />
                    ))}
                </div>
                {/* DashboardBottom End */}
            </div>
        </div>
    );
};

export default Dashboard;
