import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import Pin from "@/types/Pin";

// Define a type for the slice state
// interface CounterState {
//   value: number;
// }

// Define the initial state using that type
const initialState: Pin = {
  id: 0,
  collectionId: 0,
  writer: "",
  review: "",
  createdAt: "",
  saveCnt: 0,
  roadNameAddress: "",
  placeName: "",
  latitude: 0,
  longitude: 0,
  starred: false,
  category: "",
  tags: [],
  collectionTitle: "",
  imagePaths: [],
};

export const pinEditSlice = createSlice({
  name: "counter",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: initialState,
  reducers: {
    initialPinEditState: (state, action: PayloadAction<Pin>) => {
      return action.payload;
    },
    clearPinEditState: () => {
      return initialState;
    },
    setPinEditReview: (state, action: PayloadAction<string>) => {
      state.review = action.payload;
    },
    setPinEditTags: (state, action: PayloadAction<string[]>) => {
      state.tags = action.payload;
    },
    setPinEditImagePaths: (state, action: PayloadAction<string[]>) => {
      state.imagePaths = action.payload;
    },
  },
});

export const {
  initialPinEditState,
  clearPinEditState,
  setPinEditReview,
  setPinEditTags,
  setPinEditImagePaths,
} = pinEditSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPinEdit = (state: RootState) => state.counter.value;

export default pinEditSlice.reducer;
