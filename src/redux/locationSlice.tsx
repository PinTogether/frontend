import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

interface CounterState {
  emdong: string;
  sgg: string;
  sido: string;
  lat: number;
  lng: number;
}

const initialState: CounterState = {
  emdong: "개포2동",
  sgg: "강남구",
  sido: "서울특별시",
  //lat: 37.488243,
  //lng: 127.064865,
  lat:37.5012,
  lng:127.0659,
};

export const locationSlice = createSlice({
  name: "location",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    emdongByAmount: (state, action: PayloadAction<string>) => {
      state.emdong = action.payload;
    },
    sggByAmount: (state, action: PayloadAction<string>) => {
      state.sgg = action.payload;
    },
    sidoByAmount: (state, action: PayloadAction<string>) => {
      state.sido = action.payload;
    },
    latByAmount: (state, action: PayloadAction<number>) => {
      state.lat = action.payload;
    },
    lngByAmount: (state, action: PayloadAction<number>) => {
      state.lng = action.payload;
    },
  },
});

export const { emdongByAmount, sggByAmount, sidoByAmount, latByAmount, lngByAmount } = locationSlice.actions;

export const selectLocation = (state: RootState) => state.counter.value;

export default locationSlice.reducer;
