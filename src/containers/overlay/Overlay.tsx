"use client"

import styles from '@/styles/layout/_overlay.module.scss'
import CardSlider from '@/components/CardSlider'
import { useState, useEffect } from 'react';
import { GetGeoCodingAuth } from '@/utils/GeoCoding';

export default function Overlay(){
	const [isCardSliderOn, setIsCardSliderOn] = useState(1);
	const [cardSliderBtnMsg, setCardSliderBtnMsg] = useState("지도 목록 숨기기 ∨");
	const [sidoName, setSidoName] = useState("서울특별시");
	const [sggName, setSggName] = useState("강남구");
	const [emdongName, setEmdongName] = useState("개포2동");

	const handleGetAuth = async () => {
		try {
		  const result = await GetGeoCodingAuth({
			consumer_key: 'your_consumer_secret', // 실제 사용할 consumer_key 값으로 변경
			consumer_secret: 'your_consumer_secret', // 실제 사용할 consumer_secret 값으로 변경
		  });
		  console.log("실행"),
		  // 성공적으로 처리했을 때의 로직
		  console.log(result);
		} catch (error) {
		  // 오류가 발생했을 때의 로직
		  console.error(error);
		}
	  };

	useEffect(() => {
		handleGetAuth
	});

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
