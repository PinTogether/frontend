"use client";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import styles from "@/styles/components/_loading.module.scss";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { getGeoCodingAuth, reverseGeoCoding } from "@/utils/map/GeoCoding";
import {
  emdongByAmount,
  sggByAmount,
  sidoByAmount,
  latLngByAmount,
  locationGetterByAmount,
  markerDataByAmount,
  geoApiAuthByAmount,
  mapNESWByAmount,
} from "@/redux/locationSlice";
import MarkerData from "@/types/Marker";
import LatLng from "@/types/Map";
import Script from "next/script";

interface ClusteredMarkerData {
  innerMarkerList: naver.maps.Marker[];
  innerMarkerId: number[];
  markersBounds: naver.maps.Bounds;
  bound: naver.maps.Bounds;
  centerPoint: naver.maps.Point;
  clusteredMarker: naver.maps.Marker | null;
  infoWindow: naver.maps.InfoWindow | null;
  eventList: naver.maps.MapEventListener[] | null;
  buttonEventList: HTMLElement[] | null;
}

const MapNaverDefault = () => {
  const mapElement = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [sideWidth, setSideWidth] = useState<number>(0);
  const [newMap, setNewMap] = useState<naver.maps.Map>();
  const [pinMarkerList, setPinMarkerList] = useState<naver.maps.Marker[]>(
    []
  );
  const [markerDatas, setMarkerDatas] = useState<MarkerData[]>([]);
  const [clusteredMarkerList, setClusteredMarkerList] = useState<
    ClusteredMarkerData[]
  >([]);

  const geoApiAuth = useAppSelector((state) => state.location.geoApiAuth);
  const LatLng = useAppSelector((state) => state.location.latLng);
  const mainContentWidth = useAppSelector(
    (state) => state.location.mainContentWidth
  );
  const locationGetter = useAppSelector(
    (state) => state.location.locationGetter
  );
  const reduxMarkerDatas = useAppSelector((state) => state.location.markerData);
  const isScriptLoaded = useScriptLoaded();

  const getLocation = async () => {
    function success(pos: any) {
      const newLocation: LatLng = {
        lng: pos.coords.longitude,
        lat: pos.coords.latitude,
      };
      dispatch(latLngByAmount(newLocation));
      dispatch(locationGetterByAmount(false));
    }

    function error(err: any) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      dispatch(locationGetterByAmount(false));
    }

    navigator.geolocation.getCurrentPosition(success, error);
  };

  const handleGetAddress = async (X: number, Y: number) => {
    try {
      if(newMap){
        const mapCoord = newMap.getBounds();
        dispatch(mapNESWByAmount([mapCoord.getMax().x, mapCoord.getMax().y, mapCoord.getMin().x, mapCoord.getMin().y]))
      }
      if (geoApiAuth != "") {
        const data = await reverseGeoCoding({
          accessToken: geoApiAuth,
          x_coor: X,
          y_coor: Y,
          addr_type: 20,
        });
        if (data.errCd === 0) {
          dispatch(emdongByAmount(data.result[0].emdong_nm));
          dispatch(sggByAmount(data.result[0].sgg_nm));
          dispatch(sidoByAmount(data.result[0].sido_nm));
        } else if (data.errCd === -100) {
          dispatch(emdongByAmount(""));
          dispatch(sggByAmount("위치정보없음"));
          dispatch(sidoByAmount(""));
        }
      } else {
        console.error("INVALID geoApiAuth");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetAuth = async () => {
    try {
      if (
        process.env.NEXT_PUBLIC_SGIS_KEY != undefined &&
        process.env.NEXT_PUBLIC_SGIS_ID != undefined
      ) {
        const result = await getGeoCodingAuth({
          consumer_key: process.env.NEXT_PUBLIC_SGIS_ID,
          consumer_secret: process.env.NEXT_PUBLIC_SGIS_KEY,
        });
        if (result.errMsg == "Success") {
          dispatch(geoApiAuthByAmount(result.result.accessToken));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 현재 지도의 영역을 확인하고 마커를 그릴지 말지 결정
  const updateMarkers = () => {
    const showMarker = (map: naver.maps.Map, marker: naver.maps.Marker) => {
      if (marker.getMap()) return;
      marker.setMap(map);
    };

    const hideMarker = (marker: naver.maps.Marker) => {
      if (!marker.getMap()) return;
      marker.setMap(null);
    };

    if (newMap) {
      clusteredMarkerList.forEach((marker) => {
        if (marker.clusteredMarker) {
          if (marker.infoWindow && marker.clusteredMarker.getMap()) {
            marker.clusteredMarker.setMap(null);
          }
        }
      });
      pinMarkerList.forEach((marker) => {
        // mapBounds와 비교하며 마커가 현재 화면에 보이는 영역에 있는지 확인
        if (newMap.getBounds().hasPoint(marker.getPosition())) {
          // 보이는 영역에 있다면 마커 표시
          showMarker(newMap, marker);
        } else {
          // 숨겨진 영역에 있다면 마커 숨김
          hideMarker(marker);
        }
      });
    }
  };

  //기존 마커 삭제
  function deleteMarker() {
    if (pinMarkerList[0]) {
      pinMarkerList.forEach((marker) => {
        marker.setMap(null);
      });
      clusteredMarkerList.forEach((marker) => {
        if (marker.clusteredMarker) marker.clusteredMarker.setMap(null);
      });
      setPinMarkerList([]);
      setClusteredMarkerList([]);
    }
  }

  function markerIconRenderer(markerdata: MarkerData) {
    if (markerdata.pinCount <= 1) {
      return [
        '<div style="color:#6d56ff; display: flex; flex-direction: column; justify-content: flex-start; align-items: center; width:80px; height:50px;">',
        '<img src="/icons/map_pin.svg" alt="" style="width:50px; height:50px;" >',
        '<b style="justify-content: center; text-align: center; font-size: 14px; font-weight: 600; text-shadow: -2px 0 #fdfdfd, 0 2px #fdfdfd, 2px 0 #fdfdfd, 0 -2px #fdfdfd; margin-top: 5px;">',
        `${markerdata.placeName}`,
        "</b>",
        "</div>",
      ].join("");
    } else if (markerdata.pinCount <= 99) {
      return [
        '<div style="color:#6d56ff; display: flex; flex-direction: column; justify-content: flex-start; align-items: center; width:80px; height:50px; position: relative;">',
        '<img src="/icons/map_pin_filled.svg" alt="" style="width:50px; height:50px;">',
        '<b style="position: absolute; top: 18px; left: 50%; color: #ffffff; font-size: 11px; font-weight: 500; transform: translate(-50%, -50%);">',
        '<div style="width:12px; height:12px justify-content: center; text-align: center;">',
        `${markerdata.pinCount}`,
        '</div>',
        '<img src="/icons/marker_pin.svg" alt="" style=" position: absolute; width:12px; height:12px;">',
        "</b>",
        '<b style="justify-content: center; text-align: center; font-size: 14px; font-weight: 600; text-shadow: -2px 0 #fdfdfd, 0 2px #fdfdfd, 2px 0 #fdfdfd, 0 -2px #fdfdfd; margin-top: 5px;">',
        `${markerdata.placeName}`,
        "</b>",
        "</div>",
      ].join("");
    } else {
      return [
        '<div style="color:#6d56ff; display: flex; flex-direction: column; justify-content: flex-start; align-items: center; width:80px; height:50px; position: relative;">',
        '<img src="/icons/map_pin_filled.svg" alt="" style="width:50px; height:50px;">',
        '<b style="position: absolute; top: 18px; left: 50%; color: #ffffff; font-size: 11px; font-weight: 500; transform: translate(-50%, -50%);">',
        '<div style="width:20px; height:12px justify-content: center; text-align: center;">',
        ` 99+`,
        '</div>',
        '<img src="/icons/marker_pin.svg" alt="" style=" position: absolute; width:20px; height:12px;">',
        "</b>",
        '<b style="justify-content: center; text-align: center; font-size: 14px; font-weight: 600; text-shadow: -2px 0 #fdfdfd, 0 2px #fdfdfd, 2px 0 #fdfdfd, 0 -2px #fdfdfd; margin-top: 5px;">',
        `${markerdata.placeName}`,
        "</b>",
        "</div>",
      ].join("");
    }
  }

  function intersects(marker1: naver.maps.Marker, marker2: naver.maps.Marker) {
    if (marker1.getMap() && marker2.getMap()) {
      var marker1Rect = marker1.getDrawingRect();
      var marker2Rect = marker2.getDrawingRect();
      // 두 마커가 겹치는지 여부를 true 또는 false로 반환한다.
      return marker1Rect.intersects(marker2Rect);
    }
    return false;
  }

  function intersectsBound(
    marker1: naver.maps.Marker,
    marker2: naver.maps.Bounds
  ) {
    if (marker1.getMap() && marker2) {
      var marker1Rect = marker1.getDrawingRect();
      // 두 마커가 겹치는지 여부를 true 또는 false로 반환한다.
      return marker1Rect.intersects(marker2);
    }
    return false;
  }

  function movePage(id: number) {
    router.push(`/place/${id}`);
  }

  function makeClusteredMarkerList() {
    function getList(index: number) {
      let returnHTML: string = "";
      newClusteredMarkers[index].innerMarkerList.forEach((data, indexNum) => {
        const str = [
          `<div onmouseover="this.style.backgroundColor = '#e4e1ff';" onmouseout="this.style.backgroundColor = '#ffffff'"; style="padding: 3px;">
          <div id="button${newClusteredMarkers[index].innerMarkerId[indexNum]}" style="text-decoration: underline; text-decoration-color: #d9d9d9; cursor: pointer; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; font-size: 15px; font-weight: 500; padding: 5px; margin:0px">
          ${data.getTitle()}
          </div>
          </div>`,
        ].join("");
        returnHTML += str;
      });
      return returnHTML;
    }

    if (clusteredMarkerList[0]) {
      clusteredMarkerList.forEach((data) => {
        if (data.clusteredMarker && data.infoWindow)
          data.clusteredMarker.setMap(null);
      });
    }

    const newClusteredMarkers: ClusteredMarkerData[] = [];
    pinMarkerList.forEach((marker, markerIndex) => {
      if (newClusteredMarkers[0] && marker.getMap()) {
        let isIntersect: boolean = false;
        for (
          let clusteredMarkerIndex = 0;
          clusteredMarkerIndex < newClusteredMarkers.length;
          clusteredMarkerIndex++
        ) {
          if (
            intersectsBound(
              marker,
              newClusteredMarkers[clusteredMarkerIndex].bound
            )
          ) {
            const markerPosition: naver.maps.Point = marker.getPosition();
            newClusteredMarkers[clusteredMarkerIndex].innerMarkerList.push(
              marker
            );
            newClusteredMarkers[clusteredMarkerIndex].innerMarkerId.push(
              markerDatas[markerIndex].placeId
            );
            newClusteredMarkers[clusteredMarkerIndex].centerPoint =
              new naver.maps.Point({
                x:
                  (newClusteredMarkers[clusteredMarkerIndex].centerPoint.x +
                    markerPosition.x) /
                  2,
                y:
                  (newClusteredMarkers[clusteredMarkerIndex].centerPoint.y +
                    markerPosition.y) /
                  2,
              });
            newClusteredMarkers[clusteredMarkerIndex].markersBounds =
              newClusteredMarkers[clusteredMarkerIndex].markersBounds.extend(
                marker.getPosition()
              );
            marker.setMap(null);
            isIntersect = true;
            break;
          }
        }
        if (!isIntersect) {
          const centerBounds = new naver.maps.LatLng(marker.getPosition());
          newClusteredMarkers.push({
            innerMarkerList: [marker],
            innerMarkerId: [markerDatas[markerIndex].placeId],
            centerPoint: marker.getPosition(),
            bound: marker.getDrawingRect(),
            markersBounds: new naver.maps.LatLngBounds(
              centerBounds,
              centerBounds
            ),
            clusteredMarker: null,
            infoWindow: null,
            eventList: null,
            buttonEventList: null,
          });
          marker.setMap(null);
        }
      } else if (marker.getMap()) {
        const centerBounds = new naver.maps.LatLng(marker.getPosition());
        newClusteredMarkers.push({
          innerMarkerList: [marker],
          innerMarkerId: [markerDatas[markerIndex].placeId],
          centerPoint: marker.getPosition(),
          bound: marker.getDrawingRect(),
          markersBounds: new naver.maps.LatLngBounds(
            centerBounds,
            centerBounds
          ),
          clusteredMarker: null,
          infoWindow: null,
          eventList: null,
          buttonEventList: null,
        });
        marker.setMap(null);
      }
    });
    if (newClusteredMarkers[0]) {
      newClusteredMarkers.forEach((ClusteredMarkerData, index) => {
        if (ClusteredMarkerData.innerMarkerList.length != 1) {
          ClusteredMarkerData.infoWindow = new naver.maps.InfoWindow({
            content: `<div style="background-color: #ffffff; border-radius: 15px; border: 1px solid #6d56ff; max-height: 300px; padding-top:5px; padding-bottom:5px; padding-right:5px; overflow-y: auto;">
          ${getList(index)}
          </div>`,
            borderWidth: 0,
            disableAnchor: true,
            disableAutoPan: true,
            backgroundColor: "transparent",
          });
          ClusteredMarkerData.clusteredMarker = new naver.maps.Marker({
            position: ClusteredMarkerData.centerPoint,
            icon: {
              content: [
                '<div style="display: flex; flex-direction: column; justify-content: flex-start; align-items: center; width:70px; height:70px; position: relative;">',
                '<img src="/icons/clustered_pin.svg" alt="" style="width:70px; height:70px;"></img>',
                '<b style="position: absolute; top: 31px; left: 50%; color: #ffffff; font-size: 15px; font-weight: 600; transform: translate(-50%, -50%);">',
                `${ClusteredMarkerData.innerMarkerId.length}`,
                "</b>",
                "</div>",
              ].join(""),
              size: new naver.maps.Size(70, 70),
              anchor: new naver.maps.Point(35, 60),
            },
          });
          if(ClusteredMarkerData.innerMarkerList[0])
            ClusteredMarkerData.clusteredMarker.setZIndex(ClusteredMarkerData.innerMarkerList[0].getZIndex() + 1);
        } else {
          ClusteredMarkerData.clusteredMarker =
            ClusteredMarkerData.innerMarkerList[0];
          ClusteredMarkerData.clusteredMarker.get;
        }
      });
    }
    setClusteredMarkerList(newClusteredMarkers);
  }

  function makeMarkerList(markerDatas:MarkerData[]) {
    if (markerDatas[0] && window.naver) {
      const newMarkerList: naver.maps.Marker[] = [];
      markerDatas.forEach((data) => {
        var marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(data.latitude, data.longitude),
          icon: {
            content: markerIconRenderer(data),
            //마커의 기준위치 지정
            size: new naver.maps.Size(80, 50),
            anchor: new naver.maps.Point(40, 48),
          },
          title: data.placeName,
          //shape: {
          //  coords: [20, 0, 60, 0, 60, 40, 20, 40],
          //  type: "poly",
          //},
        });
        newMarkerList.push(marker);
      });
      setPinMarkerList(newMarkerList);
    }
  }

  //마커 리스트가 있을시 화면의 bounds를 구해 적절한 위치, 줌으로 이동 및 화면에 보이는 마커 표시
  useEffect(() => {
    if (window.naver && pinMarkerList[0] && newMap) {
      var distance = 0;
      if(pinMarkerList.length == 1)
        distance = 1000;
      var centerBounds = new naver.maps.LatLng(
        pinMarkerList[0].getPosition()
      );
      var bounds = new naver.maps.LatLngBounds(centerBounds, centerBounds);
      pinMarkerList.forEach((marker) => {
        bounds.extend(marker.getPosition());
      });
      if (newMap.getCenter() != bounds.getCenter() && geoApiAuth != "") {
        //geoApiAuth가 없을때 들어올수 있으므로 발급될때는 bounds이동 없이 주소만 새롭게 불러오도록 함
        newMap.panToBounds(
          bounds,
          { easing: "linear", duration: 300 },
          {
            top: 100 + distance,
            right: 100 + distance,
            bottom: 100 + distance,
            left: sideWidth / 2 + 100 + distance,
          }
        );
        pinMarkerList.forEach((marker) => {
          marker.setMap(newMap); //없을시 업데이트 마커가 일어나야 마커가 표시됨
        });
        makeClusteredMarkerList();
      }
      const center = newMap.getCenter();
      handleGetAddress(center.x, center.y);
    }
  }, [pinMarkerList, geoApiAuth]);

  //오버레이의 내 위치로 이동 버튼 눌렀을때
  useEffect(() => {
    if (window.naver && geoApiAuth != "" && newMap && locationGetter) {
      getLocation();
    }
  }, [locationGetter]);

  //새로운 Lat,Lng 좌표가 등록되었을 때 주소 받아와서 변경 및 지도 이동
  useEffect(() => {
    if (window.naver && geoApiAuth != "") {
      handleGetAddress(LatLng.lng, LatLng.lat);
      newMap?.panToBounds(
        new naver.maps.LatLngBounds(
          new naver.maps.LatLng(LatLng.lat, LatLng.lng),
          new naver.maps.LatLng(LatLng.lat, LatLng.lng)
        ),
        { easing: "linear", duration: 300 }, // 애니메이션
        { top: 4000, right: 4000, bottom: 4000, left: 4000 } // 센터기준 상하좌우에 여유공간 4000px (대충 zoom:16 비슷하게 나옴)
      );
    }
  }, [LatLng]);

  useEffect(() => {
    if (window.naver && geoApiAuth != "" && newMap) {
      if (!markerDatas[0] && !pinMarkerList[0]) {
        dispatch(locationGetterByAmount(true));
      }
    }
  }, [isScriptLoaded, geoApiAuth]);

  //내 위치 받아오기
  useEffect(() => {
    if (window.naver && geoApiAuth != "" && newMap) {
      //드래그시 이벤트 갱신
      const dragevent = naver.maps.Event.addListener(
        newMap,
        "dragend",
        function (e) {
          const center = newMap.getCenter();
          handleGetAddress(center.x, center.y);
          if (pinMarkerList[0]) {
            updateMarkers();
            makeClusteredMarkerList();
          }
        }
      );
      //줌 변경시 이벤트 갱신
      const zoomevent = naver.maps.Event.addListener(
        newMap,
        "zoom_changed",
        function (e) {
          const center = newMap.getCenter();
          handleGetAddress(center.x, center.y);
          if (pinMarkerList[0]) {
            updateMarkers();
            makeClusteredMarkerList();
          }
        }
      );
      const mapClick = naver.maps.Event.addListener(
        newMap,
        "click",
        function(e){
          clusteredMarkerList.forEach((data)=>{
            if(data.infoWindow?.getMap()){
              data.infoWindow.close();
            }
          })
        }
      )
      clusteredMarkerList.forEach((data) => {
        const eventList: naver.maps.MapEventListener[] = [];
        const buttonEventList: HTMLElement[] = [];
        eventList.push(
          naver.maps.Event.addListener(
            data.clusteredMarker,
            "mouseover",
            function () {
              if (data.infoWindow) {
                if (data.clusteredMarker) {
                  data.infoWindow.open(newMap, data.clusteredMarker);
                  data.innerMarkerId.forEach((id) => {
                    const event = document.getElementById(`button${id}`);
                    if (event) {
                      event.addEventListener("click", () => {
                        movePage(id);
                      });
                      buttonEventList.push(event);
                    }
                  });
                }
              }
            }
          ),
          // naver.maps.Event.addListener(
          //   data.infoWindow,
          //   "mouseover",
          //   function () {
          //     isMouseOverInfoWindow = true;
          //   }
          // ),
          // naver.maps.Event.addListener(
          //   data.infoWindow,
          //   "mouseout",
          //   function () {
          //     isMouseOverInfoWindow = false;
          //   }
          // ),
          // naver.maps.Event.addListener(
          //   data.clusteredMarker,
          //   "mouseout",
          //   function () {
          //     if (data.infoWindow) {
          //       if (data.clusteredMarker && !isMouseOverInfoWindow) {
          //         data.infoWindow.close();
          //       }
          //     }
          //   }
          // ),
          naver.maps.Event.addListener(
            data.clusteredMarker,
            "click",
            function () {
              if (data.infoWindow) {
                if (data.clusteredMarker) {
                  newMap.panToBounds(
                    data.markersBounds,
                    { easing: "linear", duration: 300 }, // 애니메이션
                    { top: 400, right: 400, bottom: 400, left: sideWidth +  400 }
                  );
                }
              } else {
                router.push(`/place/${data.innerMarkerId[0]}`);
              }
            }
          )
        );
        data.eventList = eventList.slice();
        data.buttonEventList = buttonEventList.slice();
      });
      return () => {
        clusteredMarkerList.forEach((data) => {
          if (data.infoWindow && data.infoWindow.getMap()) {
            data.infoWindow.close();
          }
          if (data.clusteredMarker && data.eventList) {
            // naver 이벤트 정리
            data.eventList.forEach((event) => {
              data.clusteredMarker?.removeListener(event);
            });
          }
          if (data.clusteredMarker && data.buttonEventList) {
            // DOMElement 이벤트 정리
            data.buttonEventList.forEach((event, index) => {
              event.removeEventListener("click", () =>
                movePage(data.innerMarkerId[index])
              );
            });
          }
        });
        naver.maps.Event.removeListener(dragevent);
        naver.maps.Event.removeListener(zoomevent);
        naver.maps.Event.removeListener(mapClick);
      };
    }
  }, [geoApiAuth, clusteredMarkerList]);

  useEffect(() => {
    if (mainContentWidth === "500px") {
      setSideWidth(500);
      newMap?.panBy({ x: -300, y: 0 });
      if (newMap) {
        const center = newMap.getCenter();
        handleGetAddress(center.x, center.y);
      }
    } else if (mainContentWidth == "0px") {
      setSideWidth(0);
      newMap?.panBy({ x: 300, y: 0 });
      if (newMap) {
        const center = newMap.getCenter();
        handleGetAddress(center.x, center.y);
      }
    }
  }, [mainContentWidth]);

  //geocode api 인증키 받아오기
  useEffect(() => {
    if (window.naver) {
      handleGetAuth(); // 만료시 다시 받아올 방법도 만들어야함
    }
  }, [isScriptLoaded]);

  function checkIsPositionGetter(){
    for(let i = 0 ; i < pinMarkerList.length ; i++){
      const markerPosition = pinMarkerList[i].getPosition();
      if(reduxMarkerDatas[0].longitude == markerPosition.x && reduxMarkerDatas[0].latitude == markerPosition.y)
        return (true);
    }
    return(false);
  }
  //마커 목록 생성
  useEffect(() => {
    if (window.naver && reduxMarkerDatas[0] && isScriptLoaded) {
      if(reduxMarkerDatas.length == 1 && checkIsPositionGetter()){
        var centerBounds = new naver.maps.LatLng({x: reduxMarkerDatas[0].longitude, y:reduxMarkerDatas[0].latitude});
        var bounds = new naver.maps.LatLngBounds(centerBounds, centerBounds);
        newMap?.panToBounds(
          bounds,
          { easing: "linear", duration: 300 },
          {
            top: 1100,
            right: 1100,
            bottom: 1100,
            left: sideWidth / 2 + 1100,
          }
        );
        if(newMap){
          const center = newMap.getCenter();
          handleGetAddress(center.x, center.y);
        }
        setTimeout(()=>{if (pinMarkerList[0]) {
          updateMarkers();
          makeClusteredMarkerList();
        }}, 300);
      }
      else{
        deleteMarker();
        setMarkerDatas(reduxMarkerDatas);
        makeMarkerList(reduxMarkerDatas);
      }
      // 만약 새로 들어온 markerDatas가 1개이고, 기존의 마커에 존재하는 마커 데이터라면 마커들 없에지말고 위치만 이동
      // 1개지만 기존 마커에 존재하지않다면 기존과 똑같이 작동
    }
  }, [reduxMarkerDatas, isScriptLoaded]);

  useLayoutEffect(() => {
    if (window.naver && newMap && clusteredMarkerList[0]) {
      clusteredMarkerList.forEach((data) => {
        if (data.clusteredMarker) {
          data.clusteredMarker.setMap(newMap);
        }
      });
    }
  }, [clusteredMarkerList]);

  //지도 생성
  useEffect(() => {
    if (isScriptLoaded) {
      const { naver } = window;

      if (!mapElement.current || !naver) return;
      const center = new naver.maps.LatLng(LatLng.lat, LatLng.lng);
      const mapOptions: naver.maps.MapOptions = {
        center: center,
        zoom: 16,
        zoomControl: true,
        zoomControlOptions: {
          style: naver.maps.ZoomControlStyle.LARGE,
          position: naver.maps.Position.TOP_RIGHT,
        },
      };
      const map = new naver.maps.Map(mapElement.current, mapOptions);
      setNewMap(map);
      return () => {
        map.destroy();
      };
    }
  }, [isScriptLoaded]);

  return (
    <>
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_MAP_KEY}`}
        //strategy="beforeInteractive"// 왜 ?
        strategy="afterInteractive"
      />
      {isScriptLoaded && (
        <div id="map" ref={mapElement} style={{ minHeight: "100vh" }}></div>
      )}
      {!isScriptLoaded && (
        <div className={styles.baseContainer}>
          <div>
            <div className={styles.ball}></div>
            <div className={styles.ball}></div>
            <div className={styles.ball}></div>
            <div className={styles.ball}></div>
            <div className={styles.ball}></div>
          </div>
        </div>
      )}
    </>
  );
};

export default MapNaverDefault;

function useScriptLoaded() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkNaver = () => {
      if (window.naver) {
        setIsLoaded(true);
      } else {
        setTimeout(checkNaver, 100); // 100ms 후에 다시 확인
      }
    };
    checkNaver();
  }, []);

  return isLoaded;
}
