"use client"

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useEffect, useRef, useState } from "react";
import { GetGeoCodingAuth, ReverseGeoCoding } from "@/utils/GeoCoding";
import { emdongByAmount, sggByAmount, sidoByAmount } from "@/redux/locationSlice";


const MapNaverDefault = () => {
  const [newMap, setNewMap] = useState<naver.maps.Map | null>(null);
  const mapElement = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();

  const [geoApiAuth, setgeoApiAuth] = useState("");
  const [Lat, setLat] = useState(37.488243);
  const [Lng, setLng] = useState(127.064865);

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
        dispatch(emdongByAmount(data.result[0].emdong_nm));
        dispatch(sggByAmount(data.result[0].sgg_nm));
        dispatch(sidoByAmount(data.result[0].sido_nm));
      }
      else
      {
        console.error("INVALID geoApiAuth");
      }
    } catch (error) {
      console.error(error);
    }
    };

  function getLocation(){
    navigator.geolocation.getCurrentPosition(function(pos) {
      setLat(pos.coords.latitude);
      setLng(pos.coords.longitude);
    });
  };

  useEffect(() => {
    handleGetAddress(Lng, Lat);
  },[Lat, Lng, geoApiAuth])

  useEffect(() => {
    getLocation();
    handleGetAuth();
  },[])

  useEffect(() => {
    const { naver } = window;

    if (!mapElement.current || !naver) return;
    const center = new naver.maps.LatLng(Lat, Lng);

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
    naver.maps.Event.addListener(map, 'dragend', function(e) {
      const center = map.getCenter();
      handleGetAddress(center.x, center.y)
    });
    }, [Lat, Lng]);

    return (
      <div id="map" ref={mapElement} style={{ minHeight: "100vh" }}></div>
    );
};

export default MapNaverDefault;
