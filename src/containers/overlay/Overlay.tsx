import styles from '@/styles/layout/_overlay.module.scss'

export default function Overlay(){
	return(
		<section className={styles.overlay}>
			<div className={styles.top}>
				<button className={styles.topButton}>
					<img src="/icon/location_plain.svg" alt="location button" className={styles.icon}></img>
				</button>
				<div className={styles.topLocation}>
					서울특별시 강남구 개포동
				</div>
			</div>
			<div></div>
			<div className={styles.bottom}>콜렉션 표시 위치</div>
		</section>
	);
}
