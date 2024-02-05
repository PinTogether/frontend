import styles from "@/styles/components/_subtopper.module.scss"

const Topper = ({ msg }: { msg?: string }) => {
	return (
		<section className={styles.topper}>
			<button>
				<img src="/icon/expand_left.svg" alt="backward" className={styles.icon} />
			</button>
			<p>{msg}</p>
		</section>
	);
  };

  export default Topper
