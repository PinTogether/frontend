import styles from '@/styles/layout/_overlay.module.scss'

export default function Overlay(){
	return(
		<section className={styles.overlay}>
			<div className={styles.top}>
				<div className={styles.topLocation}>
					<div>
						서울특별시
					</div>
					<div>
						강남구
					</div>
					<div>
						개포2동
					</div>
				</div>
				<button className={styles.topButton}>
					<img src="/icon/location_plain.svg" alt="location button" className={styles.icon}></img>
				</button>
			</div>
			<div></div>
			<div className={styles.bottom}>콜렉션 표시 위치</div>
		</section>
	);
}
