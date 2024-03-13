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
    <div className={styles.skeletonCollection}>
      <div className={styles.skeletonTextBox} style={{width:"12rem", height:"12rem"}}/>
      <div className={styles.bottomBox}>
        <div className={styles.skeletonTextBox} style={{width:"40px",height:"40px", borderRadius:"50%"}}/>
        <div className={styles.skeletonTextBox} style={{width:"100%",height:"1px"}}/>
      </div>
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

const DetailCollectionSkeleton = () => {
  return(
    <div className={styles.skeletonDetailCollection}>
      <div className={styles.topBox}>
        <div className={styles.skeletonTextBox} style={{width:"95px",height:"95px"}}/>
        <div className={styles.topBoxInner}>
          <div className={styles.skeletonTextBox} style={{width:"80%",height:"1px"}}/>
          <div className={styles.skeletonTextBox} style={{width:"50%",height:"1px"}}/>
          <div className={styles.skeletonTextBox} style={{width:"70%",height:"1px"}}/>
        </div>
        <div className={styles.skeletonTextBox} style={{width:"30px",height:"30px", borderRadius:"50%"}}/>
      </div>
      <div className={styles.bottomBox}>
      <div className={styles.skeletonTextBox} style={{width:"100%",height:"1px"}}/>
      <div className={styles.skeletonTextBox} style={{width:"80%",height:"1px"}}/>
      </div>
    </div>
  )
}

const SimpleCollectionSkeleton = () => {
  return(
    <div className={styles.skeletonSimpleCollection}>
      <div className={styles.skeletonTextBox} style={{width:"80px",height:"80px"}}/>
      <div className={styles.innerBox}>
        <div className={styles.innerBox2}>
          <div className={styles.innerBox3}>
            <div className={styles.skeletonTextBox} style={{width:"80%",height:"1px"}}/>
            <div className={styles.skeletonTextBox} style={{width:"80%",height:"1px"}}/>
          </div>
          <div className={styles.skeletonTextBox} style={{width:"30px",height:"30px", borderRadius:"50%"}}/>
        </div>
        <div className={styles.skeletonTextBox} style={{width:"100%",height:"1px", placeSelf:"start", alignSelf:"end"}}/>
      </div>
    </div>
  )
}

export {
  AvatarImageSkeleton,
  DefaultCollectionSkeleton,
  CollectionImageSkeleton,
  PinWithReviewSkeleton,
  DetailCollectionSkeleton,
  SimpleCollectionSkeleton,
};
