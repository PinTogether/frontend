"use client";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import styles from "@/styles/components/_loading.module.scss";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getGeoCodingAuth, reverseGeoCoding } from "@/utils/GeoCoding";
import {
  emdongByAmount,
  sggByAmount,
  sidoByAmount,
  latLngByAmount,
  locationGetterByAmount,
  markerDataByAmount,
  geoApiAuthByAmount,
} from "@/redux/locationSlice";
import MarkerData from "@/types/Marker";
import LatLng from "@/types/Map";
import Script from "next/script";

interface OverlapData {
  id: naver.maps.Marker;
  overlapMarker: naver.maps.Marker[];
  overlapId: number[];
}

const MapNaverDefault = () => {
  const mapElement = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [sideWidth, setSideWidth] = useState<number>(0);
  const [newMap, setNewMap] = useState<naver.maps.Map>();
  const [createMarkerList, setCreateMarkerList] = useState<naver.maps.Marker[]>(
    []
  );
  const [clusteredMarkerList, setClusteredMarkerList] = useState<
    naver.maps.Marker[]
  >([]);
  const [overlapList, setOverlapList] = useState<OverlapData[]>([]);
  const [infoWindowList, setInfoWindowList] = useState<naver.maps.InfoWindow[]>(
    []
  );

  const geoApiAuth = useAppSelector((state) => state.location.geoApiAuth);
  const LatLng = useAppSelector((state) => state.location.latLng);
  const mainContentWidth = useAppSelector(
    (state) => state.location.mainContentWidth
  );
  const locationGetter = useAppSelector(
    (state) => state.location.locationGetter
  );
  const markerDatas = useAppSelector((state) => state.location.markerData);

  const isScriptLoaded = useScriptLoaded();

  const getLocation = async () => {
    function success(pos: any) {
      const newLocation: LatLng = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
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
          dispatch(sggByAmount(""));
          dispatch(sidoByAmount("위치정보없음"));
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
        console.log(result);
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
      createMarkerList.forEach((marker) => {
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
    if (createMarkerList[0]) {
      console.log("기존 마커 삭제");
      createMarkerList.forEach((marker) => {
        marker.setMap(null);
      });
    }
  }

  function markerIconRenderer(markerdata: MarkerData) {
    if (markerdata.pinCount == 1) {
      return [
        '<div style="display: flex; flex-direction: column; justify-content: flex-start; align-items: center; width:60px; height:50px;">',
        '<img src="/icons/map_pin.svg" alt="" style="width:40px; height:40px;" >',
        '<b style=" font-size: 12px; font-weight: 500; text-shadow: -1px 0 #fdfdfd, 0 1px #fdfdfd, 1px 0 #fdfdfd, 0 -1px #fdfdfd;">',
        `${markerdata.placeName}`,
        "</b>",
        "</div>",
      ].join("");
    } else if (markerdata.pinCount <= 99) {
      return [
        '<div style="display: flex; flex-direction: column; justify-content: flex-start; align-items: center; width:60px; height:50px; position: relative;">',
        '<img src="/icons/map_pin_filled.svg" alt="" style="width:40px; height:40px;">',
        '<b style="position: absolute; top: 13px; left: 50%; color: #6d56ff; font-size: 11px; font-weight: 500; transform: translate(-50%, -50%);">',
        `${markerdata.pinCount}`,
        '<img src="/icons/marker_pin.svg" alt="" style=" position: absolute; width:16px; height:16px;">',
        "</b>",
        '<b style="font-size: 12px; font-weight: 500; text-shadow: -1px 0 #fdfdfd, 0 1px #fdfdfd, 1px 0 #fdfdfd, 0 -1px #fdfdfd; margin-top: 5px;">',
        `${markerdata.placeName}`,
        "</b>",
        "</div>",
      ].join("");
    } else {
      return [
        '<div style="display: flex; flex-direction: column; justify-content: flex-start; align-items: center; width:60px; height:50px; position: relative;">',
        '<img src="/icons/map_pin_filled.svg" alt="" style="width:40px; height:40px;">',
        '<b style="position: absolute; top: 13px; left: 50%; color: #6d56ff; font-size: 11px; font-weight: 500; transform: translate(-50%, -50%);">',
        `99+`,
        '<img src="/icons/marker_pin.svg" alt="" style=" position: absolute; width:16px; height:16px;">',
        "</b>",
        '<b style="font-size: 12px; font-weight: 500; text-shadow: -1px 0 #fdfdfd, 0 1px #fdfdfd, 1px 0 #fdfdfd, 0 -1px #fdfdfd; margin-top: 5px;">',
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

  function movePage(id: number) {
    console.log(id, "으로 이동");
    router.push(`/place/${id}`);
  }

  //`<a href="/place/${markerDatas[index].id}">${data.getTitle()}</a>`, // 임시
  //`<button onClick={()=>{router.push("/place/${markerDatas[index].id}")}}>test</button>`,

  function updateMarkerOverlapList(markerLists: naver.maps.Marker[]) {
    function getList(index: number) {
      let returnHTML: string = "";
      overlapList[index].overlapMarker.forEach((data, indexNum) => {
        const str = [
          `<div onmouseover="this.style.backgroundColor = '#e4e1ff';" onmouseout="this.style.backgroundColor = '#ffffff'"; style="padding: 3px;">
          <div id="button${overlapList[index].overlapId[indexNum]}" style="text-decoration: underline; text-decoration-color: #d9d9d9; cursor: pointer; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; font-size: 15px; font-weight: 500; padding: 5px; margin:0px">
          ${data.getTitle()}
          </div>
          </div>`,
        ].join("");
        returnHTML += str;
      });
      return returnHTML;
    }

    const overlapList: OverlapData[] = [];
    const infoWindowList: naver.maps.InfoWindow[] = [];
    markerLists.forEach((marker, index) => {
      const markerList: naver.maps.Marker[] = [];
      const markerId: number[] = [];
      markerLists.forEach((data, index2) => {
        if (intersects(marker, data)) {
          markerList.push(data);
          markerId.push(markerDatas[index2].id);
        }
      });
      const overlapData: OverlapData = {
        id: marker,
        overlapMarker: markerList,
        overlapId: markerId,
      };
      overlapList.push(overlapData);
      var infowindow = new naver.maps.InfoWindow({
        content: `<div style="background-color: #ffffff; border-radius: 15px; border: 1px solid #6d56ff; max-height: 400px; padding-top:10px; padding-bottom:10px;">
        ${getList(index)}
        </div>`,
        borderWidth: 0,
        disableAnchor: true,
        backgroundColor: "transparent",
        //backgroundColor: "#ffffff",
        //borderColor: "#6d56ff",
        //disableAnchor: true,
      });
      infoWindowList.push(infowindow);
    });
    setInfoWindowList(infoWindowList);
    setOverlapList(overlapList);
  }

  function makeMarkerList() {
    if (markerDatas[0] && window.naver) {
      console.log("마커 만듬");
      const newMarkerList: naver.maps.Marker[] = [];
      markerDatas.forEach((data) => {
        var marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(data.xPos, data.yPos),
          icon: {
            content: markerIconRenderer(data),
            //마커의 기준위치 지정
            size: new naver.maps.Size(60, 50),
            anchor: new naver.maps.Point(30, 25),
          },
          animation: naver.maps.Animation.DROP,
          title: data.placeName,
          //shape: {
          //  coords: [20, 0, 60, 0, 60, 40, 20, 40],
          //  type: "poly",
          //},
        });
        newMarkerList.push(marker);
      });
      setCreateMarkerList(newMarkerList);
    }
  }

  //마커 리스트가 있을시 화면의 bounds를 구해 적절한 위치, 줌으로 이동 및 화면에 보이는 마커 표시
  useEffect(() => {
    if (window.naver && createMarkerList[0] && newMap) {
      console.log(
        "마커리스트들 화면에 띄우고 적절한 화면으로 이동하거나 주소 불러오기\n"
      );
      var centerBounds = new naver.maps.LatLng(
        createMarkerList[0].getPosition()
      );
      var bounds = new naver.maps.LatLngBounds(centerBounds, centerBounds);
      createMarkerList.forEach((marker) => {
        bounds.extend(marker.getPosition());
      });
      if (newMap.getCenter() != bounds.getCenter() && geoApiAuth != "") {
        //geoApiAuth가 없을때 들어올수 있으므로 발급될때는 bounds이동 없이 주소만 새롭게 불러오도록 함
        newMap.fitBounds(bounds, {
          top: 10,
          right: 10,
          bottom: 10,
          left: sideWidth + 10,
          maxZoom: 18,
        });
        createMarkerList.forEach((marker) => {
          marker.setMap(newMap);
        });
        updateMarkerOverlapList(createMarkerList);
      }
      const center = newMap.getCenter();
      handleGetAddress(center.x, center.y);
    }
  }, [createMarkerList, geoApiAuth]);

  //오버레이의 내 위치로 이동 버튼 눌렀을때
  useEffect(() => {
    if (window.naver && geoApiAuth != "" && newMap && locationGetter) {
      console.log("내 위치 받아오기 버튼 눌러져 내위치 불러오기");
      getLocation();
    }
  }, [locationGetter]);

  //새로운 Lat,Lng 좌표가 등록되었을 때 주소 받아와서 변경 및 지도 이동
  useEffect(() => {
    if (window.naver && geoApiAuth != "") {
      console.log("변경된 좌표 주소 받아오기");
      handleGetAddress(LatLng.lng, LatLng.lat);
      newMap?.panToBounds(
        new naver.maps.LatLngBounds(
          new naver.maps.LatLng(LatLng.lat, LatLng.lng),
          new naver.maps.LatLng(LatLng.lat, LatLng.lng)
        ),
        { easing: "easeOutCubic" }, // 애니메이션
        { top: 4000, right: 4000, bottom: 4000, left: 4000 } // 센터기준 상하좌우에 여유공간 4000px (대충 zoom:16 비슷하게 나옴)
      );
    }
  }, [LatLng]);

  useEffect(() => {
    console.log("내 위치 받아오기");
    if (window.naver && geoApiAuth != "" && newMap) {
      if (!markerDatas[0] && !createMarkerList[0]) {
        dispatch(locationGetterByAmount(true));
      }
    }
  }, [isScriptLoaded, geoApiAuth]);

  //내 위치 받아오기
  useEffect(() => {
    if (window.naver && geoApiAuth != "" && newMap) {
      console.log("이벤트 갱신");
      const eventList: naver.maps.MapEventListener[] = [];
      //드래그시 이벤트 갱신
      const dragevent = naver.maps.Event.addListener(
        newMap,
        "dragend",
        function (e) {
          const center = newMap.getCenter();
          handleGetAddress(center.x, center.y);
          updateMarkers();
          updateMarkerOverlapList(createMarkerList);
        }
      );
      //줌 변경시 이벤트 갱신
      const zoomevent = naver.maps.Event.addListener(
        newMap,
        "zoom_changed",
        function (e) {
          const center = newMap.getCenter();
          handleGetAddress(center.x, center.y);
          updateMarkers();
          updateMarkerOverlapList(createMarkerList);
        }
      );
      const buttonEventList: HTMLElement[] = [];
      createMarkerList.forEach((data, index) => {
        eventList.push(
          naver.maps.Event.addListener(data, "click", function (e) {
            if (overlapList[index].overlapMarker.length != 1) {
              if (infoWindowList[index].getMap()) {
                infoWindowList[index].close();
              } else {
                infoWindowList[index].open(newMap, data);
                createMarkerList.forEach((data, index2) => {
                  const event = document.getElementById(
                    `button${markerDatas[index2].id}`
                  );
                  if (event) {
                    event.addEventListener("click", () =>{
                      movePage(markerDatas[index2].id);
                    }
                    );
                    buttonEventList.push(event);
                  }
                });
              }
            } else {
              // newMap.panTo(data.getPosition(), { duration: 200 });
              // setTimeout(updateMarkers, 210); // 위 duration과 맞추기
              // handleGetAddress(data.getPosition().x, data.getPosition().y);
              router.push(`/place/${markerDatas[index].id}`);
            }
          })
        );
      });
      return () => {
        createMarkerList.forEach((data, index) => {
          if (infoWindowList[index] && infoWindowList[index].getMap()) {
            infoWindowList[index].close();
          }
          data.removeListener(eventList[index]);
          if (buttonEventList[index]) {
            buttonEventList[index].removeEventListener("click", () =>
              movePage(markerDatas[index].id)
            );
          }
        });
        naver.maps.Event.removeListener(dragevent);
        naver.maps.Event.removeListener(zoomevent);
      };
    }
  }, [geoApiAuth, createMarkerList, overlapList]);

  useEffect(() => {
    if (mainContentWidth === "500px") {
      setSideWidth(500);
      //newMap?.panBy({ x: -300, y: 0 });
    } else if (mainContentWidth == "0px") {
      setSideWidth(0);
    }
  }, [mainContentWidth]);

  //geocode api 인증키 받아오기
  useEffect(() => {
    if (window.naver) {
      console.log("geocode 인증키 받아오기");
      handleGetAuth(); // 만료시 다시 받아올 방법도 만들어야함
    }
  }, [isScriptLoaded]);

  //마커 목록 생성
  useEffect(() => {
    deleteMarker();
    if (window.naver && markerDatas[0] && isScriptLoaded) {
      makeMarkerList();
    }
  }, [markerDatas, isScriptLoaded]);

  //지도 생성
  useEffect(() => {
    if (isScriptLoaded) {
      console.log("지도생성");
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
