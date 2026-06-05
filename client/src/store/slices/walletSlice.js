import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";

// Thunk: zid flus l rasid
export const depositToWallet = createAsyncThunk(
  "wallet/deposit",
  async (amount, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/wallet/deposit", { amount });
      return res.data.data; // ghadi yrj3 { balance, transaction }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);

// jib l wallet details (balance + transactions) mn api
export const getWallet = createAsyncThunk(
  "wallet/getWallet",
  async (_, thunkAPI) => {
    console.log("getWallet thunk called");
    try {
      const res = await axiosInstance.get("/wallet");
      console.log("Get Wallet response:", res.data);
      return res.data.data; // ghadi yrj3 { balance, transactions }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);
//data dyl wallet ghadi tkoun f had l format { balance: number, transactions: array }
const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    balance: 0,
    transactions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // getWallet
    builder
      .addCase(getWallet.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWallet.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload.balance; // balance li rj3 mn api
        state.transactions = action.payload.transactions;
      })
      .addCase(getWallet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // depositToWallet
    builder
      .addCase(depositToWallet.pending, (state) => {
        state.loading = true;
      })
      .addCase(depositToWallet.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload.balance;
        state.transactions = [
          action.payload.transaction,
          ...state.transactions,
        ];
      })
      .addCase(depositToWallet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default walletSlice.reducer;
