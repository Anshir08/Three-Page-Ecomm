import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrder = createAsyncThunk(
    "order/createOrder",
    async (orderData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                "http://localhost:3000/api/orders",
                orderData
            );
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getOrder = createAsyncThunk(
    "order/getOrder",
    async (productId, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/orders/${productId}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const orderSlice = createSlice({
    name: "order",
    initialState: {
        order: {},
        message: "",
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(getOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default orderSlice.reducer;
