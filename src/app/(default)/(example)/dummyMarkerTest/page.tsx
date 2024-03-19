"use client"

import { generateMarkerData } from "@/utils/dummyMarkerGenereator";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { markerDataByAmount } from "@/redux/locationSlice";

export default function Page() {
  const dispatch = useAppDispatch();
  dispatch(markerDataByAmount(generateMarkerData(500)));
  return (
    <div>test</div>
  );
}
