"use client"

import styles from "@/styles/layout/_searchPage.module.scss"
import { useState } from "react";
import CardSlider from "@/components/CardSlider";
import Topper from "@/components/SubTopper";

export default function Page() {
	const [inputCollectionSearch, setInputCollectionSearch] = useState("");
	const onChangeCollection = (e: any) => {
		setInputCollectionSearch(e.target.value);
	}
	return(
	  <section className={styles.container}>
		<Topper msg={"검색"}/>
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
		<section className={styles.buttonContainer}>
			<button className={styles.buttons}>장소만 보기</button>
			<button className={styles.buttons}>코멘트 같이 보기</button>
			<button className={styles.buttons}>+ 장소 추가</button>
		</section>
		<section className={styles.message}>
			컬렉션에 저장된 핀
		</section>
		<section className={styles.collectionListContainer}>
			<CardSlider width={900} scrollCardNumber={1}>
				<img src="https://picsum.photos/300/100" alt="image" />
				<img src="https://picsum.photos/300/100" alt="image" />
				<img src="https://picsum.photos/300/100" alt="image" />
				<img src="https://picsum.photos/300/100" alt="image" />
				<img src="https://picsum.photos/300/100" alt="image" />
				<img src="https://picsum.photos/300/100" alt="image" />
				<img src="https://picsum.photos/300/100" alt="image" />
				<img src="https://picsum.photos/300/100" alt="image" />
				<img src="https://picsum.photos/300/100" alt="image" />
				<img src="https://picsum.photos/300/100" alt="image" />
				<img src="https://picsum.photos/300/100" alt="image" />
				<img src="https://picsum.photos/300/100" alt="image" />
			</CardSlider>
		</section>
		<section className={styles.searchListContainer}>
			<div className={styles.dummycard1} />
			<div className={styles.dummycard1} />
			<div className={styles.dummycard1} />
			<div className={styles.dummycard1} />
			<div className={styles.dummycard1} />
			<div className={styles.dummycard1} />
			<div className={styles.dummycard1} />
			<div className={styles.dummycard1} />
			<div className={styles.dummycard1} />
			<div className={styles.dummycard1} />
			<div className={styles.dummycard1} />
			<div className={styles.dummycard1} />
		</section>
	  </section>
	);
  }
