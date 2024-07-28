import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import serverRoutes from "../../routes/routes";
import IBrands from "../../types/IBrands";

export const fetchBrands = createAsyncThunk(
  "brands/fetchBrands",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(serverRoutes.brands());
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const brandsAdapter = createEntityAdapter<IBrands>({
    selectId: (brand: IBrands) => brand._id
});

export const brandsSlice = createSlice({
  name: "brands",
  initialState: brandsAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, { payload }) => {
        brandsAdapter.setAll(state, payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchBrands.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const selectors = brandsAdapter.getSelectors((state) => state.brands);
export default brandsSlice.reducer;
