"use client"

import { useEffect, useRef, useState } from "react";
import { GetGeoCodingAuth, ReverseGeoCoding } from "@/utils/GeoCoding";

const MapNaverDefault = () => {
	const [newMap, setNewMap] = useState<naver.maps.Map | null>(null);
	const [geoApiAuth, setGeoApiAuth] = useState("");
	const [Lat, setLat] = useState(37.488243);
	const [Lng, setLng] = useState(127.064865);
	const mapElement = useRef<HTMLDivElement | null>(null);
	const [Si, setSi] = useState("");
	const [Gu, setGu] = useState("");
	const [Dong, setDong] = useState("");

	const handleGetAuth = async () => {
		try {
			if (process.env.NEXT_PUBLIC_SGIS_KEY != undefined && process.env.NEXT_PUBLIC_SGIS_ID != undefined)
			{
				const result = await GetGeoCodingAuth({
					consumer_key: process.env.NEXT_PUBLIC_SGIS_ID,
					consumer_secret: process.env.NEXT_PUBLIC_SGIS_KEY,
				});
				setGeoApiAuth(result.result.accessToken);
				handleGetAddress();
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
				setDong(data.result[0].emdong_nm);
				setGu(data.result[0].sgg_nm);
				setSi(data.result[0].sido_nm);
			}
			else
			{
				console.error("INVALID geoApiAuth")
			}
		} catch (error) {
		  console.error(error);
		}
	  };


	const getLocation = async () => {
		await navigator.geolocation.getCurrentPosition(function(pos) {
			setLat(pos.coords.latitude);
			setLng(pos.coords.longitude);
		});
	};

	useEffect(() => {
		console.log(`${Si} ${Gu} ${Dong}`);
	}, [Dong]);

	useEffect(() => {
		const { naver } = window;
		let map: naver.maps.Map;

		if (!mapElement.current || !naver) return;
		getLocation();
		handleGetAuth();
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
