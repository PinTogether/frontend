import Image from "next/image";
import styles from "@/styles/components/_skeletonImage.module.scss";

const AvatarImageSkeleton = () => {
  return <div className={styles.skeletonAvatar} />;
};

const CollectionImageSkeleton = () => {
  return <div className={styles.skeletonImage} />;
};

const DefaultCollectionSkeleton = () => {
  return (
    <div className={styles.collectionContainer}>
      <div className={styles.skeletonCollectionImg} />
      <div className={styles.skeletonCollectionTextBox}></div>
    </div>
  );
};

const PinWithReviewSkeleton = () => {
  return (
  <div className={styles.skeletonPinWithReview}>
    <div className={styles.topBox}>
      <div className={styles.skeletonTextBox} style={{width:"100%",height:"1px"}}/>
      <div className={styles.skeletonTextBox} style={{width:"80%",height:"1px"}}/>
      <div className={styles.skeletonTextBox} style={{width:"50%",height:"1px"}}/>
      <div className={styles.skeletonTextBox} style={{width:"70%",height:"1px"}}/>
    </div>
    <div className={styles.bottomBox}>
      <div className={styles.skeletonTextBox} style={{width:"80px",height:"80px"}}/>
      <div className={styles.bottomBoxInner}>
        <div className={styles.skeletonTextBox} style={{width:"80%",height:"1px"}}/>
        <div className={styles.skeletonTextBox} style={{width:"50%",height:"1px"}}/>
        <div className={styles.skeletonTextBox} style={{width:"70%",height:"1px"}}/>
      </div>
    </div>
  </div>
  );
};

export {
  AvatarImageSkeleton,
  DefaultCollectionSkeleton,
  CollectionImageSkeleton,
  PinWithReviewSkeleton,
};
