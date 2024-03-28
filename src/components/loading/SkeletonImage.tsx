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
      <div className={styles.skeletonTextBox} style={{width:"8rem", height:"8rem"}}/>
      <div className={styles.bottomBox}>
        <div />
        <div className={styles.skeletonTextBox} style={{width:"60%",height:"15px", placeSelf:"end", alignSelf:"center"}}/>
        <div className={styles.skeletonTextBox} style={{width:"80%",height:"15px", placeSelf:"end", alignSelf:"center"}}/>
      </div>
    </div>
  );
};

const PinWithReviewSkeleton = () => {
  return (
  <div className={styles.skeletonPinWithReview}>
    <div className={styles.topBox}>
      <div className={styles.skeletonTextBox} style={{width:"100%",height:"15px"}}/>
      <div className={styles.skeletonTextBox} style={{width:"80%",height:"15px"}}/>
      <div className={styles.skeletonTextBox} style={{width:"50%",height:"15px"}}/>
      <div className={styles.skeletonTextBox} style={{width:"70%",height:"15px"}}/>
    </div>
    <div className={styles.bottomBox}>
      <div className={styles.skeletonTextBox} style={{width:"80px",height:"80px"}}/>
      <div className={styles.bottomBoxInner}>
        <div className={styles.skeletonTextBox} style={{width:"80%",height:"15px"}}/>
        <div className={styles.skeletonTextBox} style={{width:"50%",height:"15px"}}/>
        <div className={styles.skeletonTextBox} style={{width:"70%",height:"15px"}}/>
      </div>
    </div>
  </div>
  );
};

const DetailCollectionSkeleton = () => {
  return(
    <div className={styles.skeletonDetailCollection}>
      <div className={styles.topBox}>
        <div className={styles.skeletonTextBox} style={{width:"100%",height:"100%"}}/>
        <div className={styles.topBoxInner}>
          <div className={styles.skeletonTextBox} style={{width:"50%",height:"15px"}}/>
          <div className={styles.skeletonTextBox} style={{width:"90%",height:"15px"}}/>
          <div className={styles.skeletonTextBox} style={{width:"80%",height:"15px"}}/>
        </div>
      </div>
      <div className={styles.bottomBox}>
      <div className={styles.skeletonTextBox} style={{width:"100%",height:"15px"}}/>
      <div className={styles.skeletonTextBox} style={{width:"80%",height:"15px"}}/>
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
            <div className={styles.skeletonTextBox} style={{width:"90%",height:"15px"}}/>
            <div className={styles.skeletonTextBox} style={{width:"70%",height:"15px"}}/>
          </div>
        </div>
        <div className={styles.skeletonTextBox} style={{width:"100%",height:"15px", placeSelf:"start", alignSelf:"end"}}/>
      </div>
    </div>
  )
}

const SimplePinSkeleton = () => {
  return(
    <div className={styles.skeletonSimplePin}>
      <div className={styles.skeletonTextBox} style={{width:"80%",height:"15px"}}/>
      <div className={styles.innerBox}>
        <div className={styles.skeletonTextBox} style={{width:"15%",height:"20px"}}/>
        <div className={styles.skeletonTextBox} style={{width:"15%",height:"20px"}}/>
        <div className={styles.skeletonTextBox} style={{width:"15%",height:"20px"}}/>
      </div>
      <div className={styles.skeletonTextBox} style={{width:"70%",height:"15px"}}/>
    </div>
  );
}
const TextBoxSkeleton = ({widthLen, heightLen}:{widthLen:string, heightLen:string}) => {
  return(
    <div className={styles.skeletonTextBox} style={{width:widthLen,height:heightLen}}/>

  )
}


export {
  AvatarImageSkeleton,
  DefaultCollectionSkeleton,
  CollectionImageSkeleton,
  PinWithReviewSkeleton,
  DetailCollectionSkeleton,
  SimpleCollectionSkeleton,
  SimplePinSkeleton,
  TextBoxSkeleton,
};
