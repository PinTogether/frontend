import styles from "@/styles/layout/_collectionPage.module.scss"
import Image from "next/image";

export default function Page() {

	return(
	  <section className={styles.container}>
		<section className={styles.topper}>
			<img src="/icon/expand_left.svg" alt="expand left" className={styles.icon} />
			<p>컬렉션(장소모음) 조회</p>
		</section>
		<section className={styles.collectionDataContainer}>
			<div className={styles.collectionData}>
				asd
			</div>
		</section>
		<section className={styles.buttonContainer}>
			<button className={styles.buttons}>장소만 보기</button>
			<button className={styles.buttons}>코멘트 같이 보기</button>
			<button className={styles.buttons}>+ 장소 추가</button>
		</section>
		<section className={styles.collectionListContainer}>
			<div className={styles.dummycard} />
			<div className={styles.dummycard} />
			<div className={styles.dummycard} />
			<div className={styles.dummycard} />
			<div className={styles.dummycard} />
			<div className={styles.dummycard} />
			<div className={styles.dummycard} />
			<div className={styles.dummycard} />
			<div className={styles.dummycard} />
			<div className={styles.dummycard} />
		</section>
	  </section>
	);
  }
