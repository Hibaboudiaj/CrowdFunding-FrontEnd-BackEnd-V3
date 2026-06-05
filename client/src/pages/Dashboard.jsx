import "../styles/Dashboard.css";

import { useEffect } from "react";
import { getProjectsStats } from "../store/slices/projectsSlice";
import { useDispatch, useSelector } from "react-redux";

import { getInvestmentStats } from "../store/slices/investmentsSlice";

import OwnerDashabord from "../components/OwnerDashabord";
import InvestorDashbord from "../components/InvestorDashbord";

const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);

    const { stats, error, loading } = useSelector((state) =>
        user.role === "owner" ? state.projects : state.investments,
    );

    console.log(user.role);

    console.log(stats);

    const dispatch = useDispatch();

    useEffect(() => {
        if (user.role === "owner") {
            dispatch(getProjectsStats());
            return;
        }
        dispatch(getInvestmentStats());
    }, [user]);

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p className="text-red-500">{error}</p>;
    }
    console.log(stats);

    if (user.role === "owner") {
        return <OwnerDashabord stats={stats} />;
    }

    if (user.role === "investor") {
        return <InvestorDashbord stats={stats} />;
    }

    return <p>kajk</p>;
};

export default Dashboard;
