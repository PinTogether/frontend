"use client"

import { LogoHorizontal } from "./LogoSvg"
import styles from "@/styles/layout/_mainPage.module.scss"
import { useState } from "react";
import CardSlider from "@/components/CardSlider";

export default function MainPage(){
	const [inputCollectionSearch, setInputCollectionSearch] = useState("");
	const onChangeCollection = (e: any) => {
		setInputCollectionSearch(e.target.value);
	}
	return(
		<section className={styles.container}>
			<section className={styles.topper}>
				<LogoHorizontal />
				<div className={styles.inputContainer}>
					<button className={styles.inputButton}>
						<img src="/icon/search_plain.svg" alt="search icon" className={styles.icon} />
					</button>
					<input className={styles.input} onChange={onChangeCollection} value={inputCollectionSearch} placeholder="다른 사람의 컬렉션을 검색해 보세요 !  추천 키워드  :  강릉, 맛집,  디저트 ... !"/>
					<select>
						<option value="1">컬렉션 검색</option>
						<option value="2">핀 검색</option>
						<option value="3">장소 검색</option>
					</select>
				</div>
			</section>
			<section className={styles.gradationBox}>
				asd
			</section>
			<section className={styles.recommendCard}>
			</section>
			<section className={styles.popularTop}>

			</section>
		 </section>
	  );

}
