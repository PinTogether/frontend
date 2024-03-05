"use client";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
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
import LatLng from "@/types/Map";
import Script from "next/script";

const MapNaverDefault = () => {
  const mapElement = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [newMap, setNewMap] = useState<naver.maps.Map>();
  const [myLocationRenderer, setMyLocationRenderer] = useState(false);
  const [createMarkerList, setCreateMarkerList] = useState<naver.maps.Marker[]>(
    []
  );

  const geoApiAuth = useAppSelector((state) => state.location.geoApiAuth);
  const LatLng = useAppSelector((state) => state.location.latLng);
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
  const updateMarkers = (markers: naver.maps.Marker[]) => {
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

    if (newMap) {
      // 현재 지도의 화면 영역을 mapBounds 변수에 저장
      let mapBounds = newMap.getBounds();
      let marker: naver.maps.Marker;
      let position;

      // 마커 객체 배열을 순회하며 각 마커의 위치를 position 변수에 저장
      for (var i = 0; i < markers.length; i++) {
        marker = markers[i];
        position = marker.getPosition();

        // mapBounds와 비교하며 마커가 현재 화면에 보이는 영역에 있는지 확인
        if (mapBounds.hasPoint(position)) {
          // 보이는 영역에 있다면 마커 표시
          showMarker(newMap, marker);
        } else {
          // 숨겨진 영역에 있다면 마커 숨김
          hideMarker(marker);
        }
      }
    }
  };

  function makeMarkerList() {
    if (markerDatas[0] && window.naver) {
      setCreateMarkerList([]);
      const newMarkerList: naver.maps.Marker[] = [];
      for (let i = 0; i < markerDatas.length; i++) {
        var marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(
            markerDatas[i].xPos,
            markerDatas[i].yPos
          ),
          icon: {
            content: [
              '<div style="background:#e4e1ff; display: table-cell; vertical-align: middle; cursor: pointer; height:30px; border:1px solid; border-radius:15px; padding-left:10px; padding-right:10px">',
              `${markerDatas[i].placeName}`,
              "</div>",
            ].join(""),
            //마커의 기준위치 지정
            size: new naver.maps.Size(30, 50),
            anchor: new naver.maps.Point(0, 0),
          },
          animation: naver.maps.Animation.DROP,
          title: markerDatas[i].placeName,
        });
        //마커 클릭시 해당 Pin 정보조회로 이동
        naver.maps.Event.addListener(marker, "click", () =>
          router.push(`/pin/${markerDatas[i].id}`)
        );
        newMarkerList.push(marker);
      }
      setCreateMarkerList(newMarkerList);
      console.log("마커데이터", newMarkerList);
      dispatch(markerDataByAmount([]));
    }
  }

  useEffect(() => {
    if (window.naver && geoApiAuth != "" && newMap && locationGetter) {
      console.log("내 위치 받아오기 버튼 눌러져 내위치 불러오기");
      getLocation();
      dispatch(locationGetterByAmount(false));
    }
  }, [locationGetter]);

  //새로운 Lat,Lng 좌표가 등록되었을 때 주소 받아와서 변경 및 지도 이동
  useEffect(() => {
    if (window.naver && geoApiAuth != "") {
      console.log("변경된 좌표 주소 받아오기");
      handleGetAddress(LatLng.lng, LatLng.lat);
      newMap?.panTo(new naver.maps.LatLng(LatLng));
    }
  }, [LatLng]);

  //내 위치 받아오기
  useEffect(() => {
    if (window.naver && geoApiAuth != "" && newMap) {
      console.log("내 위치 받아오기 및 발급된 api키로 이벤트 등록");
      if (!createMarkerList[0]) {
        getLocation();
      }
      naver.maps.Event.addListener(newMap, "dragend", function (e) {
        const center = newMap.getCenter();
        handleGetAddress(center.x, center.y);
        //updateMarkers(map, createMarkerList); // 마커 위치 확인 후 그릴지 안그릴지 결정
      });
      naver.maps.Event.addListener(newMap, "zoom_changed", function (e) {
        const center = newMap.getCenter();
        handleGetAddress(center.x, center.y);
        //updateMarkers(map, createMarkerList); // 마커 위치 확인 후 그릴지 안그릴지 결정
      });
    }
  }, [geoApiAuth]);

  //geocode api 인증키 받아오기
  useEffect(() => {
    if (window.naver) {
      console.log("geocode 인증키 받아오기");
      handleGetAuth(); // 만료시 다시 받아올 방법도 만들어야함
    }
  }, [isScriptLoaded]);

  //마커 목록 생성
  useEffect(() => {
    if (window.naver) {
      console.log("marker 생성하기");
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
        createMarkerList.splice(0, createMarkerList.length);
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
      <div id="map" ref={mapElement} style={{ minHeight: "100vh" }}></div>
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
