import { createAsyncThunk } from "@reduxjs/toolkit";
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
    async (investmentData, thunkAPI) => {
        try {
            const res = await axiosInstance.post(
                "/investments",
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
