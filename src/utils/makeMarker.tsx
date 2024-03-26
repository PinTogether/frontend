import { useAppDispatch } from "@/redux/hooks";
import MarkerData from "@/types/Marker";
import { markerDataByAmount } from "@/redux/locationSlice";
import { AppDispatch } from "@/redux/store";

function makeMarker(id:number, placeName:string, saveCnt:number, latitude:number, longitude:number, dispatchMarker:AppDispatch){
    // 마커 리스트를 생성하고 Map에 전달 및 center 좌표 변경
    console.log(id, placeName,longitude, latitude);
    const markerList: MarkerData[] = [];
      markerList.push({
        id: id,
        placeName: placeName,
        pinCount: saveCnt,
        xPos: longitude,
        yPos: latitude,
      });
    dispatchMarker(markerDataByAmount(markerList));
};

export {makeMarker}
