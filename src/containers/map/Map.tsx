"use client";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getGeoCodingAuth, reverseGeoCoding } from "@/utils/GeoCoding";
import {
  emdongByAmount,
  sggByAmount,
  sidoByAmount,
  latByAmount,
  lngByAmount,
  markerDataByAmount,
} from "@/redux/locationSlice";
import Script from "next/script";

const MapNaverDefault = () => {
  const mapElement = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [geoApiAuth, setgeoApiAuth] = useState("");
  const [newMap, setNewMap] = useState<naver.maps.Map | null>(null);
  const createMarkerList: naver.maps.Marker[] = [];

  const Lat = useAppSelector((state) => state.location.lat);
  const Lng = useAppSelector((state) => state.location.lng);
  const markerDatas = useAppSelector((state) => state.location.markerData);

  const isScriptLoaded = useScriptLoaded();

  let map: naver.maps.Map;

  const showMarker = (map: naver.maps.Map, marker: naver.maps.Marker) => {
    // 지도에 표시되어있는지 확인
    if (marker.getMap()) return;
    // 표시되어있지 않다면 마커를 지도에 추가
    marker.setMap(map);
  };

  const hideMarker = (marker: naver.maps.Marker) => {
    // 지도에 표시되어있는지 확인
    if (!marker.getMap()) return;
    // 표시되어있다면 마커를 지도에서 삭제
    marker.setMap(null);
  };

  const updateMarkers = (
    map: naver.maps.Map | null,
    markers: naver.maps.Marker[]
  ) => {
    if (!map) return;
    // 현재 지도의 화면 영역을 mapBounds 변수에 저장
    let mapBounds = map.getBounds();
    let marker: naver.maps.Marker;
    let position;

    // 마커 객체 배열을 순회하며 각 마커의 위치를 position 변수에 저장
    for (var i = 0; i < markers.length; i++) {
      marker = markers[i];
      position = marker.getPosition();

      // mapBounds와 비교하며 마커가 현재 화면에 보이는 영역에 있는지 확인
      if (mapBounds.hasPoint(position)) {
        // 보이는 영역에 있다면 마커 표시
        console.log("표시");
        showMarker(map, marker);
      } else {
        // 숨겨진 영역에 있다면 마커 숨김
        console.log("삭제");
        hideMarker(marker);
      }
    }
  };

  const idleHandler = () => {
    updateMarkers(newMap, createMarkerList);
  };

  useEffect(() => {
    if (newMap) {
      console.log("뉴맵")
      const MoveEventListner = naver.maps.Event.addListener(
        newMap,
        'idle',
        idleHandler
      );
      return () => {
        naver.maps.Event.removeListener(MoveEventListner);
      };
    }
  }, [newMap]);

  // geocode 사용을 위한 인증키 받아오기
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
          setgeoApiAuth(result.result.accessToken);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 좌표를 주소로 변환
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

  function success(pos: any) {
    dispatch(latByAmount(pos.coords.latitude));
    dispatch(lngByAmount(pos.coords.longitude));
  }

  function error(err: any) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  // 내 위치 받아온 뒤 저장
  function getLocation() {
    navigator.geolocation.getCurrentPosition(success, error);
  }

  // 클릭하거나 현재위치 불러오기등으로 좌표가 변경될 시, 처음 api키 받아오기 성공할 시 주소 변환받아와서 오버레이에 전달
  useEffect(() => {
    handleGetAddress(Lng, Lat);
  }, [Lat, Lng, geoApiAuth]);

  useEffect(() => {
    if (markerDatas[0]) {
      handleGetAddress(markerDatas[0].xPos, markerDatas[0].yPos);
    }
  }, [markerDatas]); // 그려야할 마커가 있다면 센터핀 기준 주소 찾기

  // 첫 렌더링시 현재 내 위치 불러오고 api키 받아오기
  useEffect(() => {
    if (!markerDatas[0]) {
      getLocation();
    }
    handleGetAuth();
  }, []);

  // 지도 만드는 부분
  useEffect(() => {
    const { naver } = window;

    if (!mapElement.current || !naver) return;
    const center = new naver.maps.LatLng(Lat, Lng);
    // 지도 생성할 옵션
    const mapOptions: naver.maps.MapOptions = {
      center: center,
      zoom: 16,
      zoomControl: true,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.TOP_RIGHT,
      },
    };

    //설정해놓은 옵션을 바탕으로 지도 생성
    map = new naver.maps.Map(mapElement.current, mapOptions);

    //마커 그리기
    for (let i = 0; i < markerDatas.length; i++) {
      var marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(
          markerDatas[i].xPos,
          markerDatas[i].yPos
        ),
        map: map,
        animation: naver.maps.Animation.DROP,
        title: markerDatas[i].placeName,
      });
      //마커 클릭시 해당 Pin 정보조회로 이동
      naver.maps.Event.addListener(marker, "click", () =>
        markerClickHandler(markerDatas[i].id)
      );
      createMarkerList.push(marker);
    }

    const markerClickHandler = (id: number) => {
      router.push(`/pin/${id}`);
    };

    //드래그로 지도 이동시 지도 중앙좌표 받아와서 주소로 변환
    naver.maps.Event.addListener(map, "dragend", function (e) {
      const center = map.getCenter();
      handleGetAddress(center.x, center.y);
      updateMarkers(newMap, createMarkerList);
    });
    naver.maps.Event.addListener(map, "zoom_changed", function (e) {
      const center = map.getCenter();
      handleGetAddress(center.x, center.y);
      updateMarkers(newMap, createMarkerList);
    });
    setNewMap(map);
    return () => {
      map.destroy();
      createMarkerList.splice(0,createMarkerList.length);
    };
  }, [Lat, Lng, markerDatas, isScriptLoaded]); // 외부 입력으로 좌표가 변경될 시 지도 다시 그려줌

  return (
    <>
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_MAP_KEY}`}
        //strategy="beforeInteractive"// 왜 ?
        strategy="afterInteractive"
      />
      <div id="map" ref={mapElement} style={{ minHeight: "100vh" }}></div>
    </>
  );
};

export default MapNaverDefault;

// Utils
function useScriptLoaded() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkNaver = () => {
      console.log("checkNaver");
      if (window.naver) {
        console.log("naver loaded");
        setIsLoaded(true);
      } else {
        console.log("naver not loaded");
        setTimeout(checkNaver, 100); // 100ms 후에 다시 확인
      }
    };
    checkNaver();
  }, []);

  return isLoaded;
}
