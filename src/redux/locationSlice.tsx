import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import MarkerData from "@/types/Marker"
import LatLng from "@/types/Map";

interface CounterState {
  geoApiAuth: string;
  emdong: string;
  sgg: string;
  sido: string;
  latLng: LatLng;
  locationGetter: boolean;
  mainContentWidth: string;
  markerData: MarkerData[];
}

const initialState: CounterState = {
  geoApiAuth:"",
  emdong: "개포2동",
  sgg: "강남구",
  sido: "서울특별시",
  //lat: 37.488243,
  //lng: 127.064865,
  latLng: {lat: 37.488243, lng: 127.064865},
  locationGetter: false,
  mainContentWidth: "500px",
  markerData: [],
};

export const locationSlice = createSlice({
  name: "location",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    geoApiAuthByAmount: (state, action: PayloadAction<string>) => {
      state.geoApiAuth = action.payload;
    },
    emdongByAmount: (state, action: PayloadAction<string>) => {
      state.emdong = action.payload;
    },
    sggByAmount: (state, action: PayloadAction<string>) => {
      state.sgg = action.payload;
    },
    sidoByAmount: (state, action: PayloadAction<string>) => {
      state.sido = action.payload;
    },
    latLngByAmount: (state, action: PayloadAction<LatLng>) => {
      state.latLng = action.payload;
    },
    locationGetterByAmount: (state, action: PayloadAction<boolean>) => {
      state.locationGetter = action.payload;
    },
    mainContentWidthByAmount: (state, action: PayloadAction<string>) => {
      state.mainContentWidth = action.payload;
    },
    markerDataByAmount: (state, action:PayloadAction<MarkerData[]>) => {
      state.markerData = action.payload;
    }
  },
});

export const {
  geoApiAuthByAmount,
  emdongByAmount,
  sggByAmount,
  sidoByAmount,
  latLngByAmount,
  locationGetterByAmount,
  mainContentWidthByAmount,
  markerDataByAmount,
} = locationSlice.actions;

export const selectLocation = (state: RootState) => state.counter.value;

export default locationSlice.reducer;
