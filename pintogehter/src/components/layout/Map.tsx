"use client"

import { useEffect, useRef, useState } from "react";

const MapNaverDefault = () => {
	const [newMap, setNewMap] = useState<naver.maps.Map | null>(null);
	const mapElement = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const { naver } = window;
		let map: naver.maps.Map;

		if (!mapElement.current || !naver) return;

		const center = new naver.maps.LatLng(37.488243, 127.064865);

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
		setNewMap(map); // 새 Lat,Lng로 움직일때 사용
	  }, []);

	  return (
		  <div id="map" ref={mapElement} style={{ minHeight: "100vh" }}></div>
	  );
};

export default MapNaverDefault;
