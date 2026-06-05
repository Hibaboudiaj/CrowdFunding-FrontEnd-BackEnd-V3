import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";

export const getOwnerProjects = createAsyncThunk(
    "projects/getProjects",
    async (status, thunkAPI) => {
        try {
            console.log("Fetching projects with status:", status);
            const res = await axiosInstance.get(`/projects?status=${status}`);
            return res.data.data.projects;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Something went wrong",
            );
        }
    },
);

export const getProjectById = createAsyncThunk(
    "projects/getProjectById",
    async (id, thunkAPI) => {
        try {
            const res = await axiosInstance.get(`/projects/${id}`);

            return res.data.data[0];
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Something went wrong",
            );
        }
    },
);

export const createProject = createAsyncThunk(
    "projects/createProject",
    async (projectData, thunkAPI) => {
        try {
            const res = await axiosInstance.post("/projects", projectData);
            return res.data;
        } catch (error) {
            if (error.response?.data?.errors) {
                return thunkAPI.rejectWithValue(error.response.data.errors);
            }

            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Something went wrong",
            );
        }
    },
);

export const updateProject = createAsyncThunk(
    "projects/updateProject",
    async ({ id, projectData }, thunkAPI) => {
        try {
            const res = await axiosInstance.put(`/projects/${id}`, projectData);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Something went wrong",
            );
        }
    },
);

export const deleteProject = createAsyncThunk(
    "projects/deleteProject",
    async (id, thunkAPI) => {
        try {
            const res = await axiosInstance.delete(`/projects/${id}`);
            return res.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Something went wrong",
            );
        }
    },
);

export const getProjectsStats = createAsyncThunk(
    "projects/getProjectsStats",
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get("/projects/stats");

            return res.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Something went wrong",
            );
        }
    },
);

export const closeProject = createAsyncThunk(
    "projects/closeProject",
    async (id, thunkAPI) => {
        try {
            const res = await axiosInstance.put(`/projects/${id}/close`);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Something went wrong",
            );
        }
    },
);

export const getAllProjects = createAsyncThunk(
    "projects/getAllProjects",
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get("/projects/all");
            return res.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Something went wrong",
            );
        }
    },
);

const projectsSlice = createSlice({
    name: "projects",
    initialState: {
        projects: [],
        loading: false,
        selectedProject: null,
        error: null,
        stats: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOwnerProjects.pending, (state) => {
                state.loading = true;
            })
            .addCase(getOwnerProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = action.payload;
            })
            .addCase(getOwnerProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(getProjectById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProjectById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProject = action.payload;
            })
            .addCase(getProjectById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(createProject.pending, (state) => {
                state.loading = true;
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.loading = false;
                state.projects.push(action.payload);
            })
            .addCase(createProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(deleteProject.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = state.projects.filter(
                    (project) => project.id !== action.payload,
                );
            })
            .addCase(deleteProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder
            .addCase(updateProject.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.projects.findIndex(
                    (project) => project.id === action.payload.id,
                );
                if (index !== -1) {
                    state.projects[index] = action.payload;
                }
            })
            .addCase(updateProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(getProjectsStats.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProjectsStats.fulfilled, (state, action) => {
                state.loading = false;
                state.stats = action.payload;
            })
            .addCase(getProjectsStats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder
            .addCase(closeProject.pending, (state) => {
                state.loading = true;
            })
            .addCase(closeProject.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.projects.findIndex(
                    (project) => project.id === action.payload.id,
                );
                if (index !== -1) {
                    state.projects[index] = action.payload;
                }
            })
            .addCase(closeProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(getAllProjects.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = action.payload;
            })
            .addCase(getAllProjects.rejected, (state, action) => {
                state.loading = false;

                state.error = action.payload;
            });
    },
});

export default projectsSlice.reducer;
