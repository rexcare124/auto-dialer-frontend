import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "@/lib/api";
import type { DialerStatus } from "@/lib/types";

type DialerState = {
  status: DialerStatus | null;
  lastUpdatedAt: string | null;
  pollIntervalMs: number;
  loading: boolean;
  error: string | null;
};

const initialState: DialerState = {
  status: null,
  lastUpdatedAt: null,
  pollIntervalMs: 5000,
  loading: false,
  error: null,
};

export const fetchDialerStatus = createAsyncThunk("dialer/fetchStatus", async () => {
  const res = await api.get<DialerStatus>("/api/dialer/status");
  return res.data;
});

export const startDialer = createAsyncThunk("dialer/start", async () => {
  const res = await api.post("/api/dialer/start");
  return res.data;
});

export const stopDialer = createAsyncThunk("dialer/stop", async () => {
  const res = await api.post("/api/dialer/stop");
  return res.data;
});

export const dialerSlice = createSlice({
  name: "dialer",
  initialState,
  reducers: {
    setPollIntervalMs(state, action: PayloadAction<number>) {
      state.pollIntervalMs = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDialerStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDialerStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload;
        state.lastUpdatedAt = new Date().toISOString();
      })
      .addCase(fetchDialerStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch dialer status";
      });
  },
});

export const { setPollIntervalMs } = dialerSlice.actions;
export default dialerSlice.reducer;

