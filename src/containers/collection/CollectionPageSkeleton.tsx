import styles from "@/styles/containers/collection/_collectionPage.module.scss";
import {
  CollectionInfoSkeleton,
  SimplePinSkeleton,
} from "@/components/loading/SkeletonImage";

export default function CollectionPageSkeleton() {
  return (
    <>
      <div className={styles.skeletonOuterBox}>
        <CollectionInfoSkeleton />
      </div>
      <section className={styles.buttonContainer}>
        <button className={`${styles.buttons}`}>핀 보기</button>
        <button className={`${styles.buttons}`}>핀 리뷰 같이 보기</button>
        <button className={`${styles.buttons}`}>컬렉션 댓글 보기</button>
        <button className={styles.buttons}>+ 핀 추가</button>
      </section>
      <section className={styles.collectionListContainer}>
        <SimplePinSkeleton />
        <SimplePinSkeleton />
        <SimplePinSkeleton />
        <SimplePinSkeleton />
        <SimplePinSkeleton />
        <SimplePinSkeleton />
      </section>
    </>
  );
}
