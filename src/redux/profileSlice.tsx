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
  initialState: initialState,
  reducers: {
    initialMyProfile: () => {
      const myProfile = localStorage.getItem("myProfile");
      if (myProfile) {
        const profile = JSON.parse(myProfile);
        return profile;
      } else {
        fetchGetMyProfile().then((data) => {
          if (!data.errorMessage)
            localStorage.setItem("myProfile", JSON.stringify(data.profileInfo));
          return data.profileInfo;
        });
      }
      return initialState;
    },
    clearMyProfile: () => {
      return initialState;
    },
  },
});

export const { initialMyProfile, clearMyProfile } = myProfile.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPinEdit = (state: RootState) => state.counter.value;

export default myProfile.reducer;
