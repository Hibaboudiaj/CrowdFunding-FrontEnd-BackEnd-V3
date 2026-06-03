import express from "express";
import connectDB from "./config/db.js";

import authRoutes from "./rotues/auth.routes.js";
import projectRoutes from "./rotues/project.routes.js";
import investmentRoutes from "./rotues/investment.routes.js";

import { authMiddleware } from "./middlewares/auth.middleware.js";

import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import roleMiddleware from "./middlewares/role.middleware.js";

dotenv.config();

const app = express();

import swaggerSpec from "./swagger.js";
import swaggerUi from "swagger-ui-express";
import { errorHandler } from "./middlewares/ErrorHandler.middleware.js";
import cors from "cors";

app.use(express.json());
app.use(cookieParser());
app.use(cors());

connectDB();
// for testing
app.get("/", authMiddleware, roleMiddleware("admin"), (req, res) => {
    res.json({ message: "done", user: req.user });
});

// swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//auth routes
app.use("/api/auth", authRoutes);

// project routes
app.use(
    "/api/projects",
    authMiddleware,

    projectRoutes,
);

app.use("/api/investments", authMiddleware, investmentRoutes);
app.use(errorHandler);

app.get("/api/test", (req, res) => {
    res.json({ message: "API is working" });
});

console.log(swaggerSpec.paths);

app.listen(process.env.PORT, () => {
    console.log("server runnig on ", process.env.PORT);
});
