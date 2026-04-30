import { configureStore } from "@reduxjs/toolkit";
import numbersReducer from "@/store/numbersSlice";
import dialerReducer from "@/store/dialerSlice";

export const store = configureStore({
  reducer: {
    numbers: numbersReducer,
    dialer: dialerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

