"use client"

import styles from "@/styles/layout/_searchPage.module.scss"
import { useState } from "react";

export default function Page() {
	const [inputText, setInputText] = useState("");
	const onChange = (e: any) => {
		setInputText(e.target.value);
	}
	return(
	  <section className={styles.container}>
		<section className={styles.logoTopper}>
			로고 및 검색창
		</section>
		<section className={styles.topper}>
			<button>
				<img src="/icon/expand_left.svg" alt="backward" className={styles.icon} />
			</button>
			<p>검색</p>
			<div className={styles.inputContainer}>
				<input className={styles.input} onChange={onChange} value={inputText} placeholder="장소 검색"/>
				<button className={styles.inputButton}>
					<img src="/icon/search_plain.svg" alt="search icon" className={styles.icon} />
				</button>
			</div>
		</section>
		<section className={styles.buttonContainer}>
			<button className={styles.buttons}>장소만 보기</button>
			<button className={styles.buttons}>코멘트 같이 보기</button>
			<button className={styles.buttons}>+ 장소 추가</button>
		</section>
		<section className={styles.message}>
			컬렉션에 저장된 핀
		</section>
		<section className={styles.collectionListContainer}>
			<div className={styles.dummycard2} />
			<div className={styles.dummycard2} />
			<div className={styles.dummycard2} />
			<div className={styles.dummycard2} />
			<div className={styles.dummycard2} />
			<div className={styles.dummycard2} />
			<div className={styles.dummycard2} />
			<div className={styles.dummycard2} />
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
		</section>
	  </section>
	);
  }
