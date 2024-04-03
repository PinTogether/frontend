import styles from "@/styles/containers/profile/_profilePage.module.scss";
import { DefaultCollectionSkeleton } from "@/components/loading/SkeletonImage";
import ProfileSkeleton from "@/components/loading/ProfileSkeleton";

export default function ProfileCollectionSkeleton() {
  return (
    <>
      <ProfileSkeleton />
      <section className={styles.buttonContainer}>
        <button className={`${styles.buttons}`}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </button>
        <button className={styles.buttons}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </button>
        <button className={`${styles.buttons}`}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </button>
        <button className={styles.buttons}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </button>
      </section>
      <section className={styles.skeletonContainer}>
        <DefaultCollectionSkeleton />
        <DefaultCollectionSkeleton />
        <DefaultCollectionSkeleton />
        <DefaultCollectionSkeleton />
        <DefaultCollectionSkeleton />
        <DefaultCollectionSkeleton />
        <DefaultCollectionSkeleton />
        <DefaultCollectionSkeleton />
        <DefaultCollectionSkeleton />
      </section>
    </>
  );
}
