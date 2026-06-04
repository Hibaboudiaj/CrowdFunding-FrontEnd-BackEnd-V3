import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/Layouts/AppLayout";
import { Toaster } from "react-hot-toast";

import Dashboard from "./pages/Dashboard";

import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateProject from "./pages/CreateProject";
import UpdateProject from "./pages/UpdateProject";
import ProtectedRoute from "./components/ProtectedRoutes";
import AuthRedirect from "./components/AuthRedirect";
import Investors from "./pages/Investors";
import Unauthorized from "./pages/Unauthorized";
import PrivateRoutes from "./components/PrivateRoutes";

import Wallet from "./pages/Wallet";
import Portfolio from "./pages/Portfolio";

const App = () => {
    return (
        <>
            <Toaster
                toastOptions={{
                    style: {
                        borderRadius: "8px",
                        background: "var(--color-secondary)",
                        color: "#fff",
                    },
                }}
                position="top-right"
                reverseOrder={true}
            />
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <AuthRedirect>
                                <Login />
                            </AuthRedirect>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <AuthRedirect>
                                <Register />
                            </AuthRedirect>
                        }
                    />

                    {/*Dashboard*/}
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <AppLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<Dashboard />} />

                        <Route
                            path="projects"
                            element={
                                <PrivateRoutes role={["owner", "admin"]}>
                                    <Projects />
                                </PrivateRoutes>
                            }
                        />

                        {/* Wallet and Portfolio Routes */}
                        <Route path="wallet" element={<Wallet/>} />

                        <Route path="Portfolio" element={<Portfolio/>}/>

                        {/*  */}
                        <Route
                            path="create-project"
                            element={
                                <PrivateRoutes role={["owner"]}>
                                    <CreateProject />
                                </PrivateRoutes>
                            }
                        />

                        <Route
                            path="projects/:id/edit"
                            element={<UpdateProject />}
                        />
                        <Route
                            path="projects/:id"
                            element={<ProjectDetails />}
                        />
                        <Route
                            path="investors"
                            element={
                                <PrivateRoutes role={["admin"]}>
                                    <Investors />
                                </PrivateRoutes>
                            }
                        />
                        {/* <Route
                            path="projects/:id/investors"
                            element={<h1>Project Investors</h1>}
                        /> */}

                        <Route
                            path="investors/:id"
                            element={<h1>Investor Details</h1>}
                        />
                        <Route
                            path="/unauthorized"
                            element={<Unauthorized />}
                        />
                    </Route>
                    <Route path="*" element={<h1>Page Not Found</h1>} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
