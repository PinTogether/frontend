import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import Pin from "@/types/Pin";

// Define a type for the slice state
export interface AlertMessage {
  id: number;
  message: string;
  timer: NodeJS.Timeout | null;
}

// Define the initial state using that type
const initialState: AlertMessage = {
  id: 0,
  message: "",
  timer: null,
};

export const globalAlertSlice = createSlice({
  name: "globalAlertSlice",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: [] as AlertMessage[],
  reducers: {
    initialAlertMessage: (state, action: PayloadAction<AlertMessage>) => {
      return [action.payload];
    },
    clearAlertMessage: () => {
      return [];
    },
    setTimer: (
      state,
      action: PayloadAction<{ id: number; timer: NodeJS.Timeout }>
    ) => {
      const target = state.find((alert) => alert.id === action.payload.id);
      if (target) {
        target.timer = action.payload.timer;
      }
    },
    addAlertMessage: (state, action: PayloadAction<string>) => {
      return [
        ...state,
        {
          id: state.length ? state[state.length - 1].id + 1 : 0,
          message: action.payload,
          timer: null,
        },
      ];
    },
    deleteAlertMessage: (state, action: PayloadAction<number>) => {
      return state.filter((alert) => alert.id !== action.payload);
    },
  },
});

export const {
  initialAlertMessage,
  clearAlertMessage,
  setTimer,
  addAlertMessage,
  deleteAlertMessage,
} = globalAlertSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPinEdit = (state: RootState) => state.counter.value;

export default globalAlertSlice.reducer;
