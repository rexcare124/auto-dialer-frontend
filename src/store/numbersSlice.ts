import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "@/lib/api";
import type { NumbersStats, PaginatedResponse, PhoneNumberRow } from "@/lib/types";

export type NumbersFilters = {
  status?: string;
  verdict?: string;
  phone?: string;
};

type NumbersState = {
  rows: PhoneNumberRow[];
  meta: { total: number; page: number; limit: number; pages: number } | null;
  stats: NumbersStats | null;
  filters: NumbersFilters;
  lastUpdatedAt: string | null;
  loading: boolean;
  error: string | null;
};

const initialState: NumbersState = {
  rows: [],
  meta: null,
  stats: null,
  filters: {},
  lastUpdatedAt: null,
  loading: false,
  error: null,
};

function buildNumbersParams(args: {
  page: number;
  limit: number;
  filters: NumbersFilters;
}) {
  const params = new URLSearchParams();
  params.set("page", String(args.page));
  params.set("limit", String(args.limit));

  if (args.filters.status) params.set("status", args.filters.status);
  if (args.filters.verdict) params.set("verdict", args.filters.verdict);
  if (args.filters.phone) params.set("phone", args.filters.phone);

  return params;
}

export const fetchNumbers = createAsyncThunk(
  "numbers/fetchNumbers",
  async (args: { page: number; limit: number; filters: NumbersFilters }) => {
    const params = buildNumbersParams(args);
    const res = await api.get<PaginatedResponse<PhoneNumberRow>>(
      `/api/numbers?${params.toString()}`,
    );
    return res.data;
  },
);

export const fetchNumbersStats = createAsyncThunk(
  "numbers/fetchNumbersStats",
  async () => {
    const res = await api.get<NumbersStats>("/api/numbers/stats");
    return res.data;
  },
);

export const addPhoneNumber = createAsyncThunk(
  "numbers/addPhoneNumber",
  async (body: { phone_number: string; note?: string }) => {
    const res = await api.post<PhoneNumberRow>("/api/numbers", body);
    return res.data;
  },
);

export const uploadNumbersCsv = createAsyncThunk(
  "numbers/uploadNumbersCsv",
  async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    const res = await api.post("/api/numbers/upload", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },
);

export const numbersSlice = createSlice({
  name: "numbers",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<NumbersFilters>) {
      state.filters = action.payload;
    },
    setLastUpdatedAt(state, action: PayloadAction<string | null>) {
      state.lastUpdatedAt = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNumbers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNumbers.fulfilled, (state, action) => {
        state.loading = false;
        state.rows = action.payload.data;
        state.meta = action.payload.meta;
        state.lastUpdatedAt = new Date().toISOString();
      })
      .addCase(fetchNumbers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch numbers";
      })
      .addCase(fetchNumbersStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      });
  },
});

export const { setFilters, setLastUpdatedAt } = numbersSlice.actions;
export default numbersSlice.reducer;

