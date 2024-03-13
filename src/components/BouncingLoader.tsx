import styles from "@/styles/components/_bouncingLoader.module.scss";

const BouncingLoader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.ball} />
      <div className={styles.ball} />
      <div className={styles.ball} />
    </div>
  );
};
export default BouncingLoader;
