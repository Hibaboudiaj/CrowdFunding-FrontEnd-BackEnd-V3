import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";

export const getInvestments = createAsyncThunk(
    "investments/getInvestments",
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get("/investments");
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Something went wrong",
            );
        }
    },
);

export const getInvestmentById = createAsyncThunk(
    "investments/getInvestmentById",
    async (id, thunkAPI) => {
        try {
            const res = await axiosInstance.get(`/investments/${id}`);

            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Something went wrong",
            );
        }
    },
);

export const createInvestment = createAsyncThunk(
    "investments/createInvestment",
    async ({ projectId, investmentData }, thunkAPI) => {
        try {
            const res = await axiosInstance.post(
                `investments/${projectId}/invest`,
                investmentData,
            );
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Something went wrong",
            );
        }
    },
);

export const updateInvestment = createAsyncThunk(
    "investments/updateInvestment",
    async ({ id, investmentData }, thunkAPI) => {
        try {
            const res = await axiosInstance.put(
                `/investments/${id}`,
                investmentData,
            );
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Something went wrong",
            );
        }
    },
);

export const deleteInvestment = createAsyncThunk(
    "investments/deleteInvestment",
    async (id, thunkAPI) => {
        try {
            await axiosInstance.delete(`/investments/${id}`);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Something went wrong",
            );
        }
    },
);

export const getInvestmentStats = createAsyncThunk(
    "investments/getInvestmentStats",
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get("/investments/stats");
            return res.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Something went wrong",
            );
        }
    },
);

const initialState = {
    investments: [],
    investment: null,
    stats: null,
    loading: false,
    error: null,
};

const investmentsSlice = createSlice({
    name: "investments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getInvestmentStats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getInvestmentStats.fulfilled, (state, action) => {
                state.loading = false;
                state.stats = action.payload;
            })

            .addCase(getInvestmentStats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(createInvestment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createInvestment.fulfilled, (state, action) => {
                state.loading = false;
                state.investments.push(action.payload);
            })
            .addCase(createInvestment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default investmentsSlice.reducer;
