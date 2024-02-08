"use client"

import styles from '@/styles/layout/_overlay.module.scss'
import CardSlider from '@/components/CardSlider'
import { useState, useEffect } from 'react';
//import { GetGeoCodingAuth, ReverseGeoCoding } from '@/utils/GeoCoding';

export default function Overlay(){
	const [isCardSliderOn, setIsCardSliderOn] = useState(1);
	const [cardSliderBtnMsg, setCardSliderBtnMsg] = useState("지도 목록 숨기기 ∨");
	//const [geoApiAuth, setGeoApiAuth] = useState("");
	const [sidoName, setSidoName] = useState("서울특별시");
	const [sggName, setSggName] = useState("강남구");
	const [emdongName, setEmdongName] = useState("개포2동");

	// const handleGetAuth = async () => {
	// 	try {
	// 		if (process.env.NEXT_PUBLIC_SGIS_KEY != undefined && process.env.NEXT_PUBLIC_SGIS_ID != undefined)
	// 		{
	// 			const result = await GetGeoCodingAuth({
	// 				consumer_key: process.env.NEXT_PUBLIC_SGIS_ID,
	// 				consumer_secret: process.env.NEXT_PUBLIC_SGIS_KEY,
	// 			});
	// 			console.log(result);
	// 			setGeoApiAuth(result.result.accessToken);
	// 		}
	// 		else
	// 		{
	// 			console.error("INVALID SGIS KEY")
	// 		}
	// 	} catch (error) {
	// 	  console.error(error);
	// 	}
	//   };

	// useEffect(() => {
	// 	handleGetAuth();
	// },[]);

	const toggleCardSlider = () => {
		setIsCardSliderOn((prevState) => {
		  if (prevState === 1) return 0;
		  return 1;
		});
		if(cardSliderBtnMsg === "지도 목록 숨기기 v"){
			setCardSliderBtnMsg("지도 목록 보이기 ∧");
		}
		else{
			setCardSliderBtnMsg("지도 목록 숨기기 v");
		}
	  };
	return(
		<section className={styles.overlay}>
			<div className={styles.top}>
				<div className={styles.topLocation}>
					<div>
						{sidoName}
					</div>
					<div>
						{sggName}
					</div>
					<div>
						{emdongName}
					</div>
				</div>
				<button className={styles.topButton}>
					<img src="/icon/location_plain.svg" alt="location button" className={styles.icon}></img>
				</button>
			</div>
			<div></div>
			<div className={styles.bottom}>
				<div className={`${styles.bottomContent} ${isCardSliderOn ? styles.visible : ''}`}>
					<CardSlider width={800} scrollCardNumber={3}>
						<img src="https://picsum.photos/150/215" alt="image" />
						<img src="https://picsum.photos/150/215" alt="image" />
						<img src="https://picsum.photos/150/215" alt="image" />
						<img src="https://picsum.photos/150/215" alt="image" />
						<img src="https://picsum.photos/150/215" alt="image" />
						<img src="https://picsum.photos/150/215" alt="image" />
						<img src="https://picsum.photos/150/215" alt="image" />
						<img src="https://picsum.photos/150/215" alt="image" />
						<img src="https://picsum.photos/150/215" alt="image" />
						<img src="https://picsum.photos/150/215" alt="image" />
						<img src="https://picsum.photos/150/215" alt="image" />
						<img src="https://picsum.photos/150/215" alt="image" />
					</CardSlider>
				</div>
				<div className={styles.buttonBox}>
					<button className={styles.bottomButton}>내 지도</button>
					<button className={styles.bottomButton}>좋아요한 지도</button>
					<button className={styles.bottomButton}>새지도 만들기 +</button>
					<button className={styles.bottomButton} onClick={toggleCardSlider}>{cardSliderBtnMsg}</button>
				</div>
			</div>
		</section>
	);
}
