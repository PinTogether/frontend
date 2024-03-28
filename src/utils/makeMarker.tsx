import { useAppDispatch } from "@/redux/hooks";
import MarkerData from "@/types/Marker";
import { markerDataByAmount } from "@/redux/locationSlice";
import { AppDispatch } from "@/redux/store";

function makeMarker(id:number, placeId:number, placeName:string, saveCnt:number | undefined, latitude:number, longitude:number, dispatchMarker:AppDispatch){
    // 마커 리스트를 생성하고 Map에 전달 및 center 좌표 변경
    console.log(id, placeName,longitude, latitude);
    const markerList: MarkerData[] = [];
    if(saveCnt != undefined)
      markerList.push({
        id: id,
        placeId: placeId,
        placeName: placeName,
        pinCount: saveCnt,
        longitude: longitude,
        latitude: latitude,
      });
    else{
      markerList.push({
        id: id,
        placeId: placeId,
        placeName: placeName,
        pinCount: 1,
        longitude: longitude,
        latitude: latitude,
      });
    }
    dispatchMarker(markerDataByAmount(markerList));
};

export {makeMarker}
