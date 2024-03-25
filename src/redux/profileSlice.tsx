import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import { ProfileMine } from "@/types/Profile";
import fetchGetMyProfile from "@/utils/fetchGetMyProfile";

// Define a type for the slice state

// Define the initial state using that type
const initialState: ProfileMine | null = null;

export const myProfile = createSlice({
  name: "counter",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: initialState as ProfileMine | null,
  reducers: {
    setMyProfile: (state, action: PayloadAction<ProfileMine>) => {
      localStorage.setItem("myProfile", JSON.stringify(action.payload));
      return action.payload;
    },
    clearMyProfile: () => {
      return initialState;
    },
  },
});

export const { setMyProfile, clearMyProfile } = myProfile.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPinEdit = (state: RootState) => state.counter.value;

export default myProfile.reducer;
