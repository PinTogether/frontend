import styles from "@/styles/layout/_sidebar.module.scss"

export default function Sidebar(){
	return(
		<section className={styles.container}>
			<div></div>
			<button className={styles.button}>
				<img src="/images/home_plain.svg" alt="Home Icon"className={styles.icon}></img>
				<img src="/images/like_plain.svg" alt="임시 Home Icon Hovered" className={styles.hoveredIcon} />
			</button>
			<button className={styles.button}>
				<img src="/images/map_plain.svg" className={styles.icon}></img>
			</button>
			<button className={styles.button}>
				<img src="/images/like_plain.svg" className={styles.icon}></img>
			</button>
			<div></div>
			<button className={styles.button}>
				<img src="/images/bell_plain.svg" className={styles.icon}></img>
			</button>
			<div>프로필</div>
			<div></div>
		</section>
	);
}
