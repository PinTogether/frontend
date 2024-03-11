// import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import styles from "@/styles/components/_loading.module.scss";

export default function Loading() {
  // return <LoadingSkeleton />;
  return (
    <div className={styles.container}>
      <div className={styles.loader}></div>
    </div>
  );
}
