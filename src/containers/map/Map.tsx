"use client"

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useEffect, useRef, useState } from "react";
import { GetGeoCodingAuth, ReverseGeoCoding } from "@/utils/GeoCoding";
import { geoApiAuthByAmount, emdongByAmount, sggByAmount, sidoByAmount, latByAmount, lngByAmount } from "@/redux/locationSlice";


const MapNaverDefault = () => {
  const [newMap, setNewMap] = useState<naver.maps.Map | null>(null);
  const mapElement = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();

  const [geoApiAuth, setgeoApiAuth] = useState("");

  const Lat = useAppSelector((state) => state.location.lat);
  const Lng = useAppSelector((state) => state.location.lng);

  const handleGetAuth = async () => {
    try {
      console.log("auth");
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

    const handleGetAddress = async () => {
    try {
      if (geoApiAuth != "")
      {
        const data = await ReverseGeoCoding({
          accessToken: geoApiAuth,
          x_coor: Lng,
          y_coor: Lat,
          addr_type: 20
        });
        dispatch(emdongByAmount(data.result[0].emdong_nm));
        dispatch(sggByAmount(data.result[0].sgg_nm));
        dispatch(sidoByAmount(data.result[0].sido_nm));
        console.log("address success");
      }
      else
      {
        console.error("INVALID geoApiAuth");
      }
    } catch (error) {
      console.error(error);
    }
    };

  const getLocation = () => {
    console.log("location");
    navigator.geolocation.getCurrentPosition(function(pos) {
      dispatch(latByAmount(pos.coords.latitude));
      dispatch(lngByAmount(pos.coords.longitude));
      console.log(`location success: ${Lat} ${Lng}`);
    });
  };

  useEffect(() => {
    handleGetAddress();
  },[Lat, Lng, geoApiAuth])

  useEffect(() => {
    const { naver } = window;
    let map: naver.maps.Map;

    getLocation();
    handleGetAuth();

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
    }, [Lat, Lng]);

    return (
      <div id="map" ref={mapElement} style={{ minHeight: "100vh" }}></div>
    );
};

export default MapNaverDefault;
