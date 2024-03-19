import styles from "@/styles/components/_bouncingLoader.module.scss";
import { RefObject } from "react";

const BouncingLoader = ({ className }: { className?: string }) => {
  return (
    <div className={`${styles.loader} ${className}`}>
      <div className={styles.ball} />
      <div className={styles.ball} />
      <div className={styles.ball} />
    </div>
  );
};
export default BouncingLoader;
