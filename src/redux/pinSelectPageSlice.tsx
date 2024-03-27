import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

// Define a type for the slice state
// interface CounterState {
//   value: number;
// }

// Define the initial state using that type
const initialState = {
  collectionId: null as number | null,
  pinPlaceId: [] as number[],
};

export const pinSelectPage = createSlice({
  name: "pinSelectPage",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: initialState,
  reducers: {
    initialPinSelectPageState: (
      state,
      action: PayloadAction<{
        collectionId: number;
        pinPlaceId: number[];
      }>
    ) => {
      return action.payload;
    },
    clearPinSelectPageState: () => {
      return initialState;
    },
  },
});

export const { initialPinSelectPageState, clearPinSelectPageState } =
  pinSelectPage.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPinSelectPage = (state: RootState) =>
  state.pinSelectPageState;
export default pinSelectPage.reducer;
