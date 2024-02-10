"use client"

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useEffect, useRef, useState } from "react";
import { GetGeoCodingAuth, ReverseGeoCoding } from "@/utils/GeoCoding";
import { emdongByAmount, sggByAmount, sidoByAmount, latByAmount, lngByAmount } from "@/redux/locationSlice";


const MapNaverDefault = () => {
  const [newMap, setNewMap] = useState<naver.maps.Map | null>(null);
  const mapElement = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();

  const [errCount, setErrCount] = useState(0);
  const [geoApiAuth, setgeoApiAuth] = useState("");
  const Lat = useAppSelector((state) => state.location.lat);
  const Lng = useAppSelector((state) => state.location.lng);

  let map: naver.maps.Map;

  const handleGetAuth = async () => {
    try {
      if (process.env.NEXT_PUBLIC_SGIS_KEY != undefined && process.env.NEXT_PUBLIC_SGIS_ID != undefined)
      {
        const result = await GetGeoCodingAuth({
          consumer_key: process.env.NEXT_PUBLIC_SGIS_ID,
          consumer_secret: process.env.NEXT_PUBLIC_SGIS_KEY,
        });
        console.log(result);
        if(result.errMsg == 'Success'){
          setgeoApiAuth(result.result.accessToken);
        }
      }
    } catch (error) {
      console.error(error);
    }
    };

    const handleGetAddress = async (X:number, Y:number) => {
    try {
      if (geoApiAuth != "")
      {
        const data = await ReverseGeoCoding({
          accessToken: geoApiAuth,
          x_coor: X,
          y_coor: Y,
          addr_type: 20
        });
        if(data.errCd === 0){
          dispatch(emdongByAmount(data.result[0].emdong_nm));
          dispatch(sggByAmount(data.result[0].sgg_nm));
          dispatch(sidoByAmount(data.result[0].sido_nm));
        }
        else if(data.errCd === -100){
          dispatch(emdongByAmount(""));
          dispatch(sggByAmount(""));
          dispatch(sidoByAmount("위치정보없음"));
        }
      }
      else
      {
        console.error("INVALID geoApiAuth");
        setErrCount(errCount + 1);
        if (errCount >= 5)
        {
          setErrCount(0);
          handleGetAuth();
        }
      }
    } catch (error) {
      console.error(error);
    }
    };

  function getLocation(){
    navigator.geolocation.getCurrentPosition(function(pos) {
      dispatch(latByAmount(pos.coords.latitude));
      dispatch(lngByAmount(pos.coords.longitude));
    });
  };

  // 클릭하거나 현재위치 불러오기등으로 좌표가 변경될 시, 처음 api키 받아오기 성공할 시 주소 변환받아와서 오버레이에 전달
  useEffect(() => {
    handleGetAddress(Lng, Lat);
  },[Lat, Lng, geoApiAuth])

  // 첫 렌더링시 현재 내 위치 불러오고 api키 받아오기
  useEffect(() => {
    getLocation();
    handleGetAuth();
  },[])

  useEffect(() => {
    const { naver } = window;

    if (!mapElement.current || !naver) return;
    const center = new naver.maps.LatLng(Lat, Lng);
    // 지도 생성할 옵션
    const mapOptions: naver.maps.MapOptions = {
      center: center,
      zoom: 18,
      zoomControl: true,
      zoomControlOptions: {
      style: naver.maps.ZoomControlStyle.SMALL,
      position: naver.maps.Position.TOP_RIGHT,
      },
    };
    //설정해놓은 옵션을 바탕으로 지도 생성
    map = new naver.maps.Map(mapElement.current, mapOptions);
    //드래그로 지도 이동시 지도 중앙좌표 받아와서 주소로 변환
    naver.maps.Event.addListener(map, 'dragend', function(e) {
      const center = map.getCenter();
      handleGetAddress(center.x, center.y)
    });
    naver.maps.Event.addListener(map, 'zoom_changed', function(e) {
      const center = map.getCenter();
      handleGetAddress(center.x, center.y)
    });
    return() => {
      map.destroy();
    }
    }, [Lat, Lng]); // 외부 입력으로 좌표가 변경될 시 지도 다시 그려줌

    return (
      <div id="map" ref={mapElement} style={{ minHeight: "100vh" }}></div>
    );
};

export default MapNaverDefault;
