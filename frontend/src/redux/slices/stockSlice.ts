import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import serverRoutes from "../../routes/routes";
import IStockItem from "../../types/IStockItem";

export const fetchStock = createAsyncThunk(
  "stock/fetchStock",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(serverRoutes.stock());
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const stockAdapter = createEntityAdapter<IStockItem>({
    selectId: (car: IStockItem) => car._id
});

export const stockSlice = createSlice({
  name: "stock",
  initialState: stockAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStock.fulfilled, (state, { payload }) => {
        stockAdapter.setAll(state, payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectors = stockAdapter.getSelectors((state) => state.stock);
export default stockSlice.reducer;
